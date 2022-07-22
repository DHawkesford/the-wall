import db from "../../connection.js";
import stub from '../../../libs/starsData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO stars (userID, imageID) VALUES ($1, $2) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].userID, stub[i].imageID]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
