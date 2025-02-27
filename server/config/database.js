const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "intern",
  password: process.env.DB_PASSWORD || "your_password",
  port: process.env.DB_PORT || 5432, 
});


pool.connect()
  .then(() => console.log("PostgreSQL Connected Successfully"))
  .catch((err) => {
    console.error("Database Connection Failed:", err.message);
    process.exit(1);
  });

module.exports = pool;
