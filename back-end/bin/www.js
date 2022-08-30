#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debugLib from "debug";
import http from "http";
import { server as webSocketServer } from "websocket";
import db from "../db/connection.js";
import cron from 'node-cron';

import app from "../app.js";

const debug = debugLib("back-end:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

export const wsServer = new webSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

const clients = {};

const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

function originIsAllowed(origin) {
  const allowedOrigins = ['http://localhost:3000', 'https://the-wall-app-dev.netlify.app', 'https://the-wall-app.netlify.app']
  console.log(allowedOrigins)
  if (allowedOrigins.includes(origin)) {
    return true;
  }
  return false;
}

wsServer.on('connect', function(connection) {
  const themes = [[], [], []]
  const minutes = [...Array(60).keys()]
  for (let i = 0; i < minutes.length; i++) {
    themes[minutes[i]%3].push(minutes[i]);
  }

  cron.schedule(`${themes[0].join()} * * * *`, () => {
    sendCurrentImages(0);
  });
  cron.schedule(`${themes[1].join()} * * * *`, () => {
    sendCurrentImages(1);
  });
  cron.schedule(`${themes[2].join()} * * * *`, () => {
    sendCurrentImages(2);
  });

  async function sendCurrentImages(themeNumber) {
    const result = await db.query(`
      WITH tab AS (SELECT *, 
        EXTRACT(MINUTES FROM created)::int AS cr, 
        EXTRACT(MINUTES FROM NOW())::int AS mins,
        (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) AS stars
      FROM images)
      
      SELECT *
        FROM tab
        WHERE
            cr IN ${themeNumber[0].join()}
        ORDER BY stars DESC, id DESC;
    `);
    const data = result.rows;
    connection.sendUTF(JSON.stringify({success: true, payload: data, star: 'test'}))
  }

    // const sqlString = `
    // WITH tab AS (SELECT *, EXTRACT(MINUTES FROM NOW())::int AS mins FROM themes)
      
  //   SELECT * 
  //     FROM tab
  //       WHERE id =
  //         CASE
  //           WHEN mins BETWEEN 0 AND 4 OR mins BETWEEN 15 AND 19 OR mins BETWEEN 30 AND 34 OR mins BETWEEN 45 AND 49 THEN 1
  //           WHEN mins BETWEEN 5 AND 9 OR mins BETWEEN 20 AND 24 OR mins BETWEEN 35 AND 39 OR mins BETWEEN 50 AND 54 THEN 2
  //           WHEN mins BETWEEN 10 AND 14 OR mins BETWEEN 25 AND 29 OR mins BETWEEN 40 AND 44 OR mins BETWEEN 55 AND 59 THEN 3
  //         END;
  //   `;
  //   const themeResponse = await db.query(sqlString);

})

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  console.log(request.origin);
  var userID = getUniqueID();
  var connection = request.accept('broadcast-protocol', request.origin);
  clients[userID] = connection;

  console.log((new Date()) + ' Connection accepted.');

  connection.on('message', function(message) {
    Object.values(clients).forEach(function (client) {
      if (client !== connection) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            client.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            client.sendBytes(message.binaryData);
        }
      }
  })})

  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
