import db from "../../connection.js";
import stub from '../../../libs/starsData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO stars (userid, imageid) VALUES ($1, $2) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].userid, stub[i].imageid]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
