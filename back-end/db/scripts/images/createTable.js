import db from "../../connection.js";

async function createTable() {
  const response = await db.query(
    `CREATE TABLE IF NOT EXISTS images (id SERIAL PRIMARY KEY, url TEXT, votes INT);`
  );
  
  console.log(response);
  
  db.end();
}

createTable();