const pool = require("../config/database");
const slugify = require("slugify");

const ContactType = {
  // Create a new contact type with Admin user_id
  create: async ({ contact_type }) => {
    try {
      const slug = slugify(contact_type, { lower: true, strict: true });

    
      const adminQuery = `SELECT id FROM users WHERE LOWER(role) = 'admin' ORDER BY id ASC LIMIT 1;`;

      const adminResult = await pool.query(adminQuery);

      if (adminResult.rows.length === 0) {
        throw new Error("No Admin user found");
      }

      const user_id = adminResult.rows[0].id; 

      // Insert new contact type
      const query = `
        INSERT INTO contact_type (contact_type, slug, user_id)
        VALUES ($1, $2, $3) 
        RETURNING id, contact_type, slug, user_id;
      `;

      const result = await pool.query(query, [contact_type, slug, user_id]);
      return result.rows[0]; 

    } catch (error) {
      console.error("Error creating contact type:", error.message);
      throw error;
    }
  },

  // Fetch all contact types
  findAll: async () => {
    try {
      const query = `SELECT * FROM contact_type;`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching contact types:", error.message);
      throw error;
    }
  },

  // Get a single contact type by ID
  findById: async (id) => {
    try {
      const query = `SELECT * FROM contact_type WHERE id = $1;`;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching contact type by ID:", error.message);
      throw error;
    }
  },

  // Delete a contact type by ID
  delete: async (id) => {
    try {
      const query = `DELETE FROM contact_type WHERE id = $1 RETURNING *;`;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting contact type:", error.message);
      throw error;
    }
  }
};

module.exports = ContactType;
