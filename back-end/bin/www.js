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
  // for (let i = 0; i < 3; i++) {
  //   cron.schedule(`${i}-59/6, ${i+1}-59/6 * * * *`, () => {
  //     sendCurrentImagesAndTheme(i);
  //   });
  // }
  cron.schedule(`0,1,6,7,12,13,18,19,24,25,30,31,36,37,42,43,48,49,54,55 * * * *`, () => {
    sendCurrentImagesAndTheme(0);
  });
  cron.schedule(`2,3,8,9,14,15,20,21,26,27,32,33,38,39,44,45,50,51,56,57 * * * *`, () => {
    sendCurrentImagesAndTheme(1);
  });
  cron.schedule(`4,5,10,11,16,17,22,23,28,29,34,35,40,41,46,47,52,53,58,59 * * * *`, () => {
    sendCurrentImagesAndTheme(2);
  });

  async function sendCurrentImagesAndTheme(themeNumber) {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      if (i % 6 === themeNumber * 2 || i % 6 === themeNumber * 2 + 1) {
        minutes.push(i)
      }
    }
    const sqlStringForImages =(`
      WITH T1 AS (SELECT *, 
        EXTRACT(MINUTES FROM created)::int AS createdMinute, 
        (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) AS stars
      FROM images)
      
      SELECT *
        FROM T1
        WHERE
            createdMinute IN (${minutes.join()})
        ORDER BY stars DESC, id DESC;
    `);
    const imageResult = await db.query(sqlStringForImages);
    const imageData = imageResult.rows;

    const sqlStringForThemes = `SELECT * FROM themes WHERE id = ${themeNumber} + 1`;
    const themeResult = await db.query(sqlStringForThemes);
    const themeData = themeResult.rows;

    connection.sendUTF(JSON.stringify({ success: true, type: 'themeChange', payload: { imageData, themeData } }))
  }
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
