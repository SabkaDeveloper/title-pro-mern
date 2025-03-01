const pool = require("../config/database");

// Function to create the Orders table
const createOrdersTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer VARCHAR(255) NOT NULL,
        state VARCHAR(50) NOT NULL,
        county VARCHAR(50) NOT NULL,
        product_type VARCHAR(100) NOT NULL,
        transaction_type VARCHAR(100) NOT NULL,
        data_source VARCHAR(100),
        workflow_group VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending', -- Ensure this exists for completed orders
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      );
    `;
    await pool.query(query);
    console.log("✅ Orders table created successfully");
};

// Run the function to create the table
createOrdersTable();

const Order = {
  // Create a new order
  create: async ({ customer, state, county, product_type, transaction_type, data_source, workflow_group }) => {
    const query = `
      INSERT INTO orders (customer, state, county, product_type, transaction_type, data_source, workflow_group)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [customer, state, county, product_type, transaction_type, data_source, workflow_group];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all active orders
  findAll: async () => {
    const query = `SELECT * FROM orders WHERE deleted_at IS NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get all deleted (soft deleted) orders
  findAllDeleted: async () => {
    const query = `SELECT * FROM orders WHERE deleted_at IS NOT NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get all completed orders
  findAllCompleted: async () => {
    const query = `SELECT * FROM orders WHERE status = 'completed' AND deleted_at IS NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get a single order by ID
  findById: async (id) => {
    const query = `SELECT * FROM orders WHERE id = $1 AND deleted_at IS NULL;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update an order
  update: async (id, { customer, state, county, product_type, transaction_type, data_source, workflow_group }) => {
    const query = `
      UPDATE orders 
      SET customer = $1, state = $2, county = $3, product_type = $4, transaction_type = $5, 
          data_source = $6, workflow_group = $7, updated_at = NOW()
      WHERE id = $8 AND deleted_at IS NULL RETURNING *;
    `;
    const values = [customer, state, county, product_type, transaction_type, data_source, workflow_group, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Soft delete an order
  softDelete: async (id) => {
    const query = `UPDATE orders SET deleted_at = NOW() WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = Order;
