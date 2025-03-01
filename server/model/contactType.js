const pool = require("../config/database");

// Function to create the Contact Type table
const createContactTypeTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS contact_type (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    );
  `;
  await pool.query(query);
  console.log("✅ Contact Type table created successfully");
};

// Run the function to create the table
createContactTypeTable();

const ContactType = {
  // Create a new contact type
  create: async ({ name, slug, user_id }) => {
    const query = `
      INSERT INTO contact_type (name, slug, user_id)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const result = await pool.query(query, [name, slug, user_id]);
    return result.rows[0];
  },

  // Get all contact types
  findAll: async () => {
    const query = `SELECT * FROM contact_type WHERE deleted_at IS NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get all deleted contact types
  findDeleted: async () => {
    const query = `SELECT * FROM contact_type WHERE deleted_at IS NOT NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get a contact type by ID
  findById: async (id) => {
    const query = `SELECT * FROM contact_type WHERE id = $1 AND deleted_at IS NULL;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update a contact type
  update: async (id, { name, slug }) => {
    const query = `
      UPDATE contact_type 
      SET name = $1, slug = $2, updated_at = NOW() 
      WHERE id = $3 AND deleted_at IS NULL 
      RETURNING *;
    `;
    const result = await pool.query(query, [name, slug, id]);
    return result.rows[0];
  },

  // Soft delete a contact type
  softDelete: async (id) => {
    const query = `UPDATE contact_type SET deleted_at = NOW() WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = ContactType;