import db from "../../connection.js";

async function dropTable() {
  const response = await db.query(
    `DROP TABLE IF EXISTS images;`
  );
  
  console.log(response);
  
  db.end();
}

dropTable();