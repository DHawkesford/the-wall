import db from "../db/connection.js";

export async function getAllImages() {
  const result = await db.query(`
    SELECT *, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
    FROM images 
    ORDER BY stars DESC, id DESC;`);
  return result.rows;
}

export async function getTodaysImages() {
  const result = await db.query(`
  WITH T3 AS (SELECT * FROM (
    WITH currentTheme AS (SELECT * FROM (
        (WITH T1 AS (SELECT *, EXTRACT(MINUTES FROM NOW())::int AS currentMinute FROM themes)
        
        SELECT *
          FROM T1
          WHERE currentMinute % 6 = id * 2 - 2 OR currentMinute % 6 = id * 2 - 1)
      ) AS T2)
  
    SELECT *, 
      (SELECT theme FROM currentTheme) AS theme,
      (SELECT id FROM currentTheme) AS themeId,
      EXTRACT(MINUTES FROM created)::int AS createdMinute,
      (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) AS stars
      FROM images 
  ) AS T4)
  
  SELECT * FROM T3
    WHERE createdMinute % 6 = themeid * 2 - 2 OR createdMinute % 6 = themeid * 2 - 1
  ORDER BY stars DESC, id DESC;
  `);
  return result.rows;
}

export async function postNewImage({ url, altText, userid }) {
  const sqlString = `INSERT INTO images (url, alt, userid, created) VALUES ($1, $2, $3, NOW()) RETURNING *;`;
  const result = await db.query(sqlString, [url, altText, userid]);
  return result.rows;
}

export async function updateAltText(id, altText) {
  const sqlString = `UPDATE images SET alt = $1 WHERE id = $2 RETURNING *;`;
  const result = await db.query(sqlString, [altText, id]);
  return result.rows;
}

export async function deleteImage(id) {
  const sqlString = `DELETE FROM images WHERE id = $1 RETURNING *;`;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}