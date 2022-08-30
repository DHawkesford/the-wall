import db from "../../connection.js";

async function dropTable() {
  const response = await db.query(
    `DROP TABLE IF EXISTS themes;`
  );
  
  console.log(response);
  
  db.end();
}

dropTable();