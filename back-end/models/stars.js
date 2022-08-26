import db from "../db/connection.js";

export async function getAllStars() {
  const result = await db.query(`SELECT * FROM stars ORDER BY userid ASC;`);
  return result.rows;
}

export async function getUsersStars(id) {
  const sqlString = `SELECT * FROM stars WHERE userid = $1 ORDER BY imageid ASC;`;
  console.log(sqlString);
  const result = await db.query(sqlString, [id]);
  console.log(result);
  return result.rows;
}

export async function addStarTouserid(userid, imageid) {
  try {
    const sqlString = `INSERT INTO stars (userid, imageid) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;`;
    const result = await db.query(sqlString, [userid, imageid]);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteStarFromuserid(userid, imageid) {
  try {
    const sqlString = `DELETE FROM stars WHERE userid = $1 AND imageid = $2 RETURNING *;`;
    const result = await db.query(sqlString, [userid, imageid]);
    console.log(result);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}