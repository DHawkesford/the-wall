import db from "../../connection.js";
import stub from '../../../libs/imagesData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO images (url, stars) VALUES ($1, $2) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].url, stub[i].stars]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
