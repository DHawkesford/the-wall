import db from "../../connection.js";

async function createTable() {
  const response = await db.query(
    `CREATE TABLE IF NOT EXISTS stars (userID TEXT, imageID INT, PRIMARY KEY(userID, imageID));`
  );
  
  console.log(response);
  
  db.end();
}

createTable();