const pool = require("../config/database");

const OrderSummary = {
  // Get an order summary by order_number from order_entries
  findByOrderNumber: async (orderNumber) => {
    try {
      const query = `SELECT * FROM order_entries WHERE order_number = $1;`;
      const result = await pool.query(query, [orderNumber]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching order summary:", error.message);
      throw error;
    }
  },

  // Get all order summaries (essentially all order entries)
  findAll: async () => {
    try {
      const query = `SELECT * FROM order_entries;`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching all order summaries:", error.message);
      throw error;
    }
  },

  // // Get order summaries by status (Open, Closed, Pending)
  // findByStatus: async (status) => {
  //   try {
  //     const query = `SELECT * FROM order_entries WHERE status = $1;`;
  //     const result = await pool.query(query, [status]);
  //     return result.rows;
  //   } catch (error) {
  //     console.error("Error fetching order summaries by status:", error.message);
  //     throw error;
  //   }
  // },

  // // Get order summaries within a specific date range
  // findByDateRange: async (startDate, endDate) => {
  //   try {
  //     const query = `
  //       SELECT * FROM order_entries 
  //       WHERE open_date BETWEEN $1 AND $2;
  //     `;
  //     const result = await pool.query(query, [startDate, endDate]);
  //     return result.rows;
  //   } catch (error) {
  //     console.error("Error fetching order summaries by date range:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = OrderSummary;
