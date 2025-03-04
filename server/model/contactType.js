const pool = require("../config/database");
const slugify = require("slugify");

const ContactType = {
  // Create a new contact type with Admin user_id from frontend token
  create: async ({ contact_type }, user_id) => {
    try {
      const slug = slugify(contact_type, { lower: true, strict: true });

      // Instead of fetching admin id from database, we use the user_id passed from the token
      if (!user_id) {
        throw new Error("User ID is required");
      }

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

  // Find contact type by ID 
  findById: async (id) => {
    try {
      const query = `SELECT * FROM contact_type WHERE id = $1 AND deleted_at IS NULL;`;
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Return the first row as it's expected to be unique
    } catch (error) {
      console.error("Error fetching contact type by ID:", error.message);
      throw error;
    }
  },

  // Soft delete a contact type
  softDelete: async (id) => {
    try {
      const query = `
        UPDATE contact_type 
        SET deleted_at = NOW()
        WHERE id = $1 AND deleted_at IS NULL
        RETURNING *;
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error soft deleting contact type:", error.message);
      throw error;
    }
  },
  

  // Restore a soft deleted contact type
  restore: async (id) => {
    try {
      const query = `
        UPDATE contact_type 
        SET deleted_at = NULL
        WHERE id = $1 
        RETURNING *;
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error restoring contact type:", error.message);
      throw error;
    }
  }
  
};

module.exports = ContactType;