import db from "../../connection.js";

async function createTable() {
  const response = await db.query(
    `CREATE TABLE IF NOT EXISTS stars (userid TEXT, imageid INT, PRIMARY KEY(userid, imageid));`
  );
  
  console.log(response);
  
  db.end();
}

createTable();