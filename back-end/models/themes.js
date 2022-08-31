import db from "../db/connection.js";

export async function getAllThemes() {
  const result = await db.query(`SELECT * FROM themes ORDER BY id ASC;`);
  return result.rows;
}

export async function getTodaysTheme() {
  const sqlString = `
  WITH T1 AS (SELECT *, EXTRACT(MINUTES FROM NOW())::int AS currentMinute FROM themes)
    
  SELECT * 
    FROM T1
    WHERE currentMinute % 6 = id * 2 - 2 OR currentMinute % 6 = id * 2 - 1
  `;
  const result = await db.query(sqlString);
  return result.rows;
}