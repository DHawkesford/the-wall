import db from "../db/connection.js";

export async function getAllImages() {
  const result = await db.query(`SELECT * FROM images ORDER BY stars DESC;`);
  return result.rows;
}

export async function postNewImage(url) {
  const sqlString = `INSERT INTO images (url, stars) VALUES ($1, 1) RETURNING *;`;
  const result = await db.query(sqlString, [url]);
  return result.rows;
}

export async function incrementStarsByImageID(id) {
  const sqlString = `UPDATE images SET stars = stars + 1 WHERE id = $1 RETURNING *;`;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}