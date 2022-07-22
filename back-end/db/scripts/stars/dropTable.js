import db from "../../connection.js";

async function dropTable() {
  const response = await db.query(
    `DROP TABLE IF EXISTS stars;`
  );
  
  console.log(response);
  
  db.end();
}

dropTable();