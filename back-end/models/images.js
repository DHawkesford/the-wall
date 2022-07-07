import db from "../db/connection.js";

export async function getAllImages() {
  const result = await db.query(`SELECT * FROM images;`);
  return result.rows;
}

export async function postNewImage(url) {
  const sqlString = `INSERT INTO images (url, votes) VALUES ($1, 1) RETURNING *;`;
  const result = await db.query(sqlString, [url]);
  return result.rows;
}