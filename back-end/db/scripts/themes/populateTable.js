import db from "../../connection.js";
import stub from '../../../libs/themesData.js';

async function populateTable() {
  for (let i = 0; i < stub.length; i++) {
    let sqlString = `INSERT INTO themes (theme) VALUES ($1) RETURNING *;`;

    const response = await db.query(sqlString, [stub[i].theme]);
  
    console.log(response.rows);
  
  }
  db.end();
}

populateTable();
