const { body, validationResult } = require('express-validator');
const Order = require("../model/orders");

// Create a new order
exports.createOrder = [
  // Validate and sanitize input data
  body('customer').notEmpty().withMessage('Customer is required').trim(),
  body('state').notEmpty().withMessage('State is required').trim(),
  body('county').notEmpty().withMessage('County is required').trim(),
  body('product_type').notEmpty().withMessage('Product type is required').trim(),
  body('transaction_type').notEmpty().withMessage('Transaction type is required').trim(),
  body('workflow_group').notEmpty().withMessage('Workflow group is required').trim(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { customer, state, county, product_type, transaction_type, data_source, workflow_group } = req.body;
      const newOrder = await Order.create({ customer, state, county, product_type, transaction_type, data_source, workflow_group });

      return res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
      console.error("❌ Error creating order:", error);
      return res.status(500).json({ success: false, message: error.message || "Error creating order" });
    }
  }
];

// Get all active orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return res.status(500).json({ success: false, message: error.message || "Error fetching orders" });
  }
};

// Get all deleted (soft deleted) orders
exports.getAllDeletedOrders = async (req, res) => {
  try {
    const deletedOrders = await Order.findAllDeleted();
    return res.status(200).json({ success: true, data: deletedOrders });
  } catch (error) {
    console.error("❌ Error fetching deleted orders:", error);
    return res.status(500).json({ success: false, message: error.message || "Error fetching deleted orders" });
  }
};

// Get all completed orders
exports.getAllCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await Order.findAllCompleted();
    return res.status(200).json({ success: true, data: completedOrders });
  } catch (error) {
    console.error("❌ Error fetching completed orders:", error);
    return res.status(500).json({ success: false, message: error.message || "Error fetching completed orders" });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("❌ Error fetching order:", error);
    return res.status(500).json({ success: false, message: error.message || "Error fetching order" });
  }
};

// Update an order
exports.updateOrder = [
  // Validate input fields
  body('customer').notEmpty().withMessage('Customer is required').trim(),
  body('state').notEmpty().withMessage('State is required').trim(),
  body('county').notEmpty().withMessage('County is required').trim(),
  body('product_type').notEmpty().withMessage('Product type is required').trim(),
  body('transaction_type').notEmpty().withMessage('Transaction type is required').trim(),
  body('workflow_group').notEmpty().withMessage('Workflow group is required').trim(),

  async (req, res) => {
    const orderId = req.params.id;
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { customer, state, county, product_type, transaction_type, data_source, workflow_group } = req.body;
      const updatedOrder = await Order.update(orderId, { customer, state, county, product_type, transaction_type, data_source, workflow_group });

      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      return res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
      console.error("❌ Error updating order:", error);
      return res.status(500).json({ success: false, message: error.message || "Error updating order" });
    }
  }
];

// Soft delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    const deletedOrder = await Order.softDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: deletedOrder, message: "Order deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    return res.status(500).json({ success: false, message: error.message || "Error deleting order" });
  }
};
