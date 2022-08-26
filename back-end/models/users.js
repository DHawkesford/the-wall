import db from "../db/connection.js";

export async function getUsersStarredImages(id) {
  const sqlString = `SELECT images.id, images.url, images.alt, (SELECT count(*)::INT FROM stars WHERE stars.imageID = images.id) stars 
    FROM images 
    INNER JOIN stars
    ON images.id = stars.imageID
    WHERE UPPER(stars.userid) = UPPER($1)
    ORDER BY stars.imageID ASC;
  `;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}

export async function getUsersPosts(id) { // TODO: Update SQL string
  const sqlString = `SELECT images.id, images.url, images.alt, images.userID, (SELECT count(*)::INT FROM stars WHERE stars.imageID = images.id) stars 
    FROM images 
    INNER JOIN stars
    ON images.id = stars.imageID
    WHERE UPPER(images.userID) = UPPER($1)
    ORDER BY images.ID ASC;
  `;
  const result = await db.query(sqlString, [id]);
  return result.rows;
}