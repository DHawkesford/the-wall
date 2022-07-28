import db from "../../connection.js";
import stub from '../../../libs/imagesData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO images (url) VALUES ($1) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].url]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
