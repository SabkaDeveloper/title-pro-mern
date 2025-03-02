const pool = require("../config/database");

// Create User Table
const createUserTable = async () => {
  try {
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
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};

// Initialize table creation
createUserTable();

const User = {
  // Create a new user
  create: async (name, email, phone, role, password) => {
    try {
      const query = `
        INSERT INTO users (name, email, phone, role, password)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
      `;
      const values = [name, email, phone, role, password];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw error;
    }
  },

  // Find user by email or phone
  findByEmailOrPhone: async (emailOrPhone) => {
    try {
      const query = `SELECT * FROM users WHERE email = $1 OR phone = $1`;
      const result = await pool.query(query, [emailOrPhone]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("❌ Error finding user by email or phone:", error);
      throw error;
    }
  },

  // Find user by ID
  findById: async (userId) => {
    try {
      const query = `SELECT * FROM users WHERE id = $1`;
      const result = await pool.query(query, [userId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("❌ Error finding user by ID:", error);
      throw error;
    }
  },

  // Update password
  updatePassword: async (userId, hashedPassword) => {
    try {
      const query = `
        UPDATE users SET password = $1, updated_at = NOW()
        WHERE id = $2 RETURNING *;
      `;
      const result = await pool.query(query, [hashedPassword, userId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error("❌ Error updating password:", error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const query = `SELECT id, name, email, phone, role, status, created_at FROM users WHERE deleted_at IS NULL`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      throw error;
    }
  },
};

module.exports = User;
