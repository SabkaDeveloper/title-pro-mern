const pool = require("../config/database");

// Create User Table
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      role VARCHAR(20) CHECK (role IN ('admin', 'user', 'moderator')) NOT NULL,
      password TEXT NOT NULL,
      status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'banned')) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    );
  `;
  await pool.query(query);
  console.log("✅ Users table created successfully");
};

createUserTable();

const User = {
  // Create a new user
  create: async (name, email, phone, role, password) => {
    const query = `
      INSERT INTO users (name, email, phone, role, password)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [name, email, phone, role, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Find user by email or phone
  findByEmailOrPhone: async (emailOrPhone) => {
    const query = `SELECT * FROM users WHERE email = $1 OR phone = $1`;
    const result = await pool.query(query, [emailOrPhone]);
    return result.rows[0];
  },

  // Update password
  updatePassword: async (userId, hashedPassword) => {
    const query = `
      UPDATE users SET password = $1, updated_at = NOW()
      WHERE id = $2 RETURNING *;
    `;
    const result = await pool.query(query, [hashedPassword, userId]);
    return result.rows[0];
  },
};

module.exports = User;
