import db from "../db/connection.js";
import { wsServer } from "../bin/www.js";

export async function getAllImages() {
  const result = await db.query(`
    SELECT *, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
    FROM images 
    ORDER BY stars DESC;`);
  return result.rows;
}

wsServer.on('connect', function(connection) {
  setInterval(() => {
    console.log('Connection accepted');
    // const data = await getAllImages();
    // connection.sendUTF(JSON.stringify({success: true, payload: data, star: 'test'}))
  }, 5000);
})

export async function getTodaysImages(minute) {
//   const result = await db.query(`
//     SELECT *, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
//     FROM images 
//   WHERE day part of created = day part of now
//     ORDER BY stars DESC;`);
//   return result.rows;
}

export async function postNewImage({ url, altText, userid }) {
  const sqlString = `INSERT INTO images (url, alt, userid) VALUES ($1, $2, $3) RETURNING *;`;
  const result = await db.query(sqlString, [url, altText, userid]);
  return result.rows;
}

export async function updateAltText(id, altText) {
  const sqlString = `UPDATE images SET alt = $1 WHERE id = $2 RETURNING *;`;
  const result = await db.query(sqlString, [altText, id]);
  return result.rows;
}

export async function deleteImage(id) {
  const sqlString = `DELETE FROM images WHERE id = $1 RETURNING *;`;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}