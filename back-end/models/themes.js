import db from "../db/connection.js";

export async function getAllThemes() {
  const result = await db.query(`SELECT * FROM themes ORDER BY id ASC;`);
  return result.rows;
}

export async function getTodaysTheme() {
  const sqlString = `
  WITH tab AS (SELECT *, EXTRACT(MINUTES FROM NOW())::int AS mins FROM themes)
    
  SELECT * 
    FROM tab
      WHERE id =
        CASE
          WHEN mins BETWEEN 0 AND 4 OR mins BETWEEN 15 AND 19 OR mins BETWEEN 30 AND 34 OR mins BETWEEN 45 AND 49 THEN 1
          WHEN mins BETWEEN 5 AND 9 OR mins BETWEEN 20 AND 24 OR mins BETWEEN 35 AND 39 OR mins BETWEEN 50 AND 54 THEN 2
          WHEN mins BETWEEN 10 AND 14 OR mins BETWEEN 25 AND 29 OR mins BETWEEN 40 AND 44 OR mins BETWEEN 55 AND 59 THEN 3
        END;
  `;
  const result = await db.query(sqlString);
  return result.rows;
}