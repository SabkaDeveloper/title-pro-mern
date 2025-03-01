const pool = require("../config/database");

// Function to create the Order Entries table
const createOrderEntryTable = async () => {
    const query = `
      DROP TABLE IF EXISTS order_entries;
      CREATE TABLE order_entries (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        open_date TIMESTAMP NOT NULL,
        closed_date TIMESTAMP NULL,
        due_date TIMESTAMP NOT NULL,
        arrival_date TIMESTAMP NOT NULL,
        delivery_date TIMESTAMP NULL,
        active_workflow VARCHAR(100),
        assigned_to VARCHAR(255),
        
        -- Address Information
        street_address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        county VARCHAR(50) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        
        -- Property Details
        parcel_id VARCHAR(100) NOT NULL,  -- Ensure parcel_id exists
        sub_division VARCHAR(100),
        block VARCHAR(100),
        lot VARCHAR(100),
        section VARCHAR(100),
        land_value DECIMAL(10,2) DEFAULT 0.00,
        improvement_value DECIMAL(10,2) DEFAULT 0.00,
        total_assessed_value DECIMAL(10,2) DEFAULT 0.00,
        
        -- Order Setup
        product_type VARCHAR(100) NOT NULL,
        transaction_type VARCHAR(100) NOT NULL,
        workflow_group VARCHAR(100) NOT NULL,
        property_type VARCHAR(100),
        data_source VARCHAR(100) NOT NULL,
        add_in_product_service TEXT,
        
        -- Partners Information
        abstractor VARCHAR(255),
        business_source VARCHAR(255),
        other_partner VARCHAR(255),
        other_source VARCHAR(255),
        recording_partner VARCHAR(255),
        tax_office VARCHAR(255),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log("✅ Order Entries table created successfully");
};

// Run the function to create the table
createOrderEntryTable();

const OrderEntry = {
  // Create a new order entry
  create: async (orderData) => {
    try {
      // Ensure all required fields exist
      if (!orderData.parcel_id) {
        throw new Error("parcel_id is required");
      }

      const query = `
        INSERT INTO order_entries (
          order_number, open_date, closed_date, due_date, arrival_date, delivery_date, active_workflow, assigned_to,
          street_address, city, state, county, zip_code,
          parcel_id, sub_division, block, lot, section, land_value, improvement_value, total_assessed_value,
          product_type, transaction_type, workflow_group, property_type, data_source, add_in_product_service,
          abstractor, business_source, other_partner, other_source, recording_partner, tax_office
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 
                $9, $10, $11, $12, $13, 
                $14, $15, $16, $17, $18, $19, $20, $21, 
                $22, $23, $24, $25, $26, $27, 
                $28, $29, $30, $31, $32, $33)
        RETURNING *;
      `;
      const values = [
        orderData.order_number, orderData.open_date, orderData.closed_date, orderData.due_date, orderData.arrival_date, orderData.delivery_date,
        orderData.active_workflow, orderData.assigned_to,
        orderData.street_address, orderData.city, orderData.state, orderData.county, orderData.zip_code,
        orderData.parcel_id, orderData.sub_division, orderData.block, orderData.lot, orderData.section,
        orderData.land_value, orderData.improvement_value, orderData.total_assessed_value,
        orderData.product_type, orderData.transaction_type, orderData.workflow_group, orderData.property_type,
        orderData.data_source, orderData.add_in_product_service,
        orderData.abstractor, orderData.business_source, orderData.other_partner, orderData.other_source,
        orderData.recording_partner, orderData.tax_office
      ];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating order entry:", error.message);
      throw error;
    }
  },

  // Get all order entries
  findAll: async () => {
    const query = `SELECT * FROM order_entries;`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Get order entry by ID
  findById: async (id) => {
    const query = `SELECT * FROM order_entries WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Update an order entry
  update: async (id, updates) => {
    try {
      const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(", ");
      const values = Object.values(updates);
      values.push(id);

      const query = `UPDATE order_entries SET ${fields}, updated_at = NOW() WHERE id = $${values.length} RETURNING *;`;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating order entry:", error.message);
      throw error;
    }
  },

  // Delete an order entry (Hard delete)
  delete: async (id) => {
    try {
      const query = `DELETE FROM order_entries WHERE id = $1 RETURNING *;`;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting order entry:", error.message);
      throw error;
    }
  }
};

module.exports = OrderEntry;
