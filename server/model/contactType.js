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

      const query = `
        INSERT INTO contact_type (contact_type, slug, user_id)
        VALUES ($1, $2, $3) 
        RETURNING contact_type, slug, user_id;
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
      const query = `SELECT * FROM contact_type WHERE deleted_at IS NULL;`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching contact types:", error.message);
      throw error;
    }
  },

  // Get a single contact type by name
  findByName: async (contact_type) => {
    try {
      const query = `SELECT * FROM contact_type WHERE contact_type = $1 AND deleted_at IS NULL;`;
      const result = await pool.query(query, [contact_type]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching contact type by name:", error.message);
      throw error;
    }
  },

  // Soft delete a contact type
  softDelete: async (contact_type) => {
    try {
      const query = `
        UPDATE contact_type 
        SET deleted_at = NOW()
        WHERE contact_type = $1 AND deleted_at IS NULL 
        RETURNING *;
      `;
      const result = await pool.query(query, [contact_type]);
      return result.rows[0];
    } catch (error) {
      console.error("Error soft deleting contact type:", error.message);
      throw error;
    }
  },

  // Restore a soft deleted contact type
  restore: async (contact_type) => {
    try {
      const query = `
        UPDATE contact_type 
        SET deleted_at = NULL
        WHERE contact_type = $1 
        RETURNING *;
      `;
      const result = await pool.query(query, [contact_type]);
      return result.rows[0];
    } catch (error) {
      console.error("Error restoring contact type:", error.message);
      throw error;
    }
  }
};

module.exports = ContactType;