import db from "../db/connection.js";

export async function getUsersStarredImages(id) {
  const sqlString = `SELECT images.id, images.url, images.alt, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
    FROM images 
    INNER JOIN stars
    ON images.id = stars.imageid
    WHERE UPPER(stars.userid) = UPPER($1)
    ORDER BY stars DESC, id DESC;
  `;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}

export async function getUsersPosts(id) { 
  const sqlString = `SELECT images.id, images.url, images.alt, images.userid, (SELECT count(*)::INT FROM stars WHERE stars.imageid = images.id) stars 
    FROM images 
    WHERE UPPER(images.userid) = UPPER($1)
    ORDER BY stars DESC, id DESC;
  `;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}