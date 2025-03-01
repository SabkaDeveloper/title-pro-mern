const pool = require("../config/database");

// Function to create the Contacts table
const createContactsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      type VARCHAR(50) NOT NULL,
      address TEXT,
      city VARCHAR(50),
      county VARCHAR(50),
      status VARCHAR(20) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    );
  `;
  await pool.query(query);
  console.log("✅ Contacts table created successfully");
};

// Run the function to create the table
createContactsTable();

const Contact = {
  // Create a new contact
  create: async ({ name, phone, email, type, address, city, county, status, user_id }) => {
    const query = `
      INSERT INTO contacts (name, phone, email, type, address, city, county, status, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `;
    const values = [name, phone, email, type, address, city, county, status, user_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all contacts
  findAll: async () => {
    const query = `SELECT * FROM contacts WHERE deleted_at IS NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get all deleted contacts
  findDeleted: async () => {
    const query = `SELECT * FROM contacts WHERE deleted_at IS NOT NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get a single contact by ID
  // findById: async (id) => {
  //   const query = `SELECT * FROM contacts WHERE id = $1 AND deleted_at IS NULL;`;
  //   const result = await pool.query(query, [id]);
  //   return result.rows[0];
  // },

  findByName: async (name) => {
    const query = `SELECT * FROM contacts WHERE name = $1 AND deleted_at IS NULL;`;
    const result = await pool.query(query, [name]);
    return result.rows[0];
  },

  // Update contact details
  update: async (email, { name, email: newEmail, phone, type, address, city, county, status }) => {
    const query = `
      UPDATE contacts 
      SET name = $1, email = $2, phone = $3, type = $4, address = $5, city = $6, county = $7, status = $8, updated_at = NOW()
      WHERE email = $9 AND deleted_at IS NULL 
      RETURNING *;
    `;
    const values = [name, newEmail, phone, type, address, city, county, status, email];
    const result = await pool.query(query, values);
    return result.rows[0];
},


  // Soft delete a contact
  softDelete: async (name) => {
    const query = `UPDATE contacts SET deleted_at = NOW() WHERE name = $1 RETURNING *;`;
    const result = await pool.query(query, [name]);
    return result.rows[0];
  },
};

module.exports = Contact;
