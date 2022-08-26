import db from "../../connection.js";
import stub from '../../../libs/imagesData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO images (url, alt, userid) VALUES ($1, $2, $3) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].url, stub[i].alt, stub[i].userid]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
