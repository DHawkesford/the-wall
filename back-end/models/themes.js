import db from "../db/connection.js";

export async function getAllThemes() {
  const result = await db.query(`SELECT * FROM themes ORDER BY id ASC;`);
  return result.rows;
}

export async function getTodaysTheme() {
  const sqlString = `SELECT id, theme 
    FROM (
      SELECT *, EXTRACT(DAY FROM NOW()) daypart, (
        SELECT MAX(id) maxid 
          FROM themes AS max) 
        FROM themes) AS dateswithmax
    WHERE id = (daypart::int % maxid::int) + 1`
  const result = await db.query(sqlString);
  return result.rows;
}