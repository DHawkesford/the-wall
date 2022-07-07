import pg from "pg";

const pool = new pg.Pool({
    connectionString: process.env.PGURI,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
