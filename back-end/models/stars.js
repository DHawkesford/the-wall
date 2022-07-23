import db from "../db/connection.js";

export async function getAllStars() {
  const result = await db.query(`SELECT * FROM stars ORDER BY UserID ASC;`);
  return result.rows;
}

export async function getUsersStars(id) {
  const sqlString = `SELECT * FROM stars WHERE userID = $1 ORDER BY ImageID ASC;`;
  console.log(sqlString);
  const result = await db.query(sqlString, [id]);
  console.log(result);
  return result.rows;
}

export async function addStarToUserID(userID, imageID) {
  try {
    const sqlString = `INSERT INTO stars (userID, imageID) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;`;
    const result = await db.query(sqlString, [userID, imageID]);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}