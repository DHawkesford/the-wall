import db from "../../connection.js";

async function createTable() {
  const response = await db.query(
    `CREATE TABLE IF NOT EXISTS themes (id SERIAL PRIMARY KEY, theme TEXT);`
  );
  
  console.log(response);
  
  db.end(); 
}

createTable();