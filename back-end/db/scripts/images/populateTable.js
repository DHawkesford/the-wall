import db from "../../connection.js";
import stub from '../../../libs/imagesData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO images (url, alt, userid, created) VALUES ($1, $2, $3, NOW()) RETURNING *;`; // TODO: Change NOW() to stub[i].created

    const response = await db.query(sqlString, [stub[i].url, stub[i].alt, stub[i].userid]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
