import db from "../db/connection.js";

export async function getAllImages() {
  const result = await db.query(`
    SELECT *, (SELECT count(*)::INT FROM stars WHERE stars.imageID = images.id) stars 
    FROM images 
    ORDER BY stars DESC;`);
  return result.rows;
}

export async function postNewImage(url) {
  const sqlString = `INSERT INTO images (url) VALUES ($1) RETURNING *;`;
  const result = await db.query(sqlString, [url]);
  return result.rows;
}