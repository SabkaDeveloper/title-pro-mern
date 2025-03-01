const pool = require("../config/database");
const slugify = require("slugify"); 

// Function to create the Contact Type table
const createContactTypeTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS contact_type (
      id SERIAL PRIMARY KEY,
      contact_type VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      user_id INT NOT NULL DEFAULT 1,  -- Default user_id = 1
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
  create: async ({ contact_type }) => {
    const slug = slugify(contact_type, { lower: true, strict: true });
    const user_id = 1; 

    const query = `
      INSERT INTO contact_type (contact_type, slug, user_id)
      VALUES ($1, $2, $3) RETURNING id, contact_type, slug;
    `;

    const result = await pool.query(query, [contact_type, slug, user_id]);
    return result.rows[0]; 
  },

  // Get all contact types
  findAll: async () => {
    const query = `SELECT id, contact_type, slug FROM contact_type WHERE deleted_at IS NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get a contact type by ID
  findById: async (id) => {
    const query = `SELECT id, contact_type, slug FROM contact_type WHERE id = $1 AND deleted_at IS NULL;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Soft delete a contact type
  softDelete: async (id) => {
    const query = `UPDATE contact_type SET deleted_at = NOW() WHERE id = $1 RETURNING id, contact_type, slug;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = ContactType;
