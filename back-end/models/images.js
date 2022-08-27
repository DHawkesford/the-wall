import db from "../db/connection.js";

export async function getAllImages() {
  const result = await db.query(`
    SELECT *, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
    FROM images 
    ORDER BY stars DESC;`);
  return result.rows;
}

export async function postNewImage({ url, altText, userid }) {
  const sqlString = `INSERT INTO images (url, alt, userid) VALUES ($1, $2, $3) RETURNING *;`;
  const result = await db.query(sqlString, [url, altText, userid]);
  return result.rows;
}

export async function updateAltText({ id, altText }) {
  const sqlString = `UPDATE images SET alt = $1 WHERE id = $2 RETURNING *;`;
  const result = await db.query(sqlString, [altText, id]);
  return result.rows;
}