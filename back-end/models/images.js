import db from "../db/connection.js";

export async function getAllImages() {
  const result = await db.query(`
    SELECT *, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
    FROM images 
    ORDER BY stars, id DESC;`);
  return result.rows;
}

export async function getTodaysImages() {
  const result = await db.query(`
    WITH tab AS (SELECT *, 
      EXTRACT(MINUTES FROM created)::int AS cr, 
      EXTRACT(MINUTES FROM NOW())::int AS mins,
      (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) AS stars
    FROM images)
    
    SELECT *
      FROM tab
	    WHERE
    	    cr BETWEEN (mins - mins % 5) AND (mins- mins % 5 + 4)
        OR 
          cr BETWEEN ((mins - mins % 5) + 15) % 60 AND ((mins - mins % 5 + 4) + 15) % 60
        OR 
          cr BETWEEN ((mins - mins % 5) + 30) % 60 AND ((mins - mins % 5 + 4) + 30) % 60
        OR 
          cr BETWEEN ((mins - mins % 5) + 45) % 60 AND ((mins - mins % 5 + 4) + 45) % 60
      ORDER BY stars, id DESC;
  `);
  return result.rows;
}

export async function postNewImage({ url, altText, userid }) {
  const sqlString = `INSERT INTO images (url, alt, userid) VALUES ($1, $2, $3) RETURNING *;`;
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