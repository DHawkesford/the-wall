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

export async function postNewVote(userID, imageID) {
  try {
    const sqlString = `INSERT INTO stars (userID, imageID) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;`;
    const result = await db.query(sqlString, [userID, imageID]);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

// export async function voteForImage(id) {
//   const sqlString = `UPDATE images SET votes = votes + 1 WHERE id = $1 RETURNING *;`;
//   const result = await db.query(sqlString, [id]);
//   return result.rows;
// }