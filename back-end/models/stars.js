import db from "../db/connection.js";

export async function getAllStars() {
  const result = await db.query(`SELECT * FROM stars ORDER BY UserID ASC;`);
  return result.rows;
}

export async function getUsersStars(id) {
  const sqlString = `SELECT * FROM stars WHERE UserID = $1 ORDER BY ImageID ASC;`;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}

// export async function postNewImage(url) {
//   const sqlString = `INSERT INTO images (url, votes) VALUES ($1, 1) RETURNING *;`;
//   const result = await db.query(sqlString, [url]);
//   return result.rows;
// }

// export async function voteForImage(id) {
//   const sqlString = `UPDATE images SET votes = votes + 1 WHERE id = $1 RETURNING *;`;
//   const result = await db.query(sqlString, [id]);
//   return result.rows;
// }