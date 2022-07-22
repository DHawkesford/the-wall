import db from "../../connection.js";
import stub from '../../../libs/imagesData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO images (url, votes) VALUES ($1, $2) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].url, stub[i].votes]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
