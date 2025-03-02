const Order = require("../model/orders");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { customer, state, county, product_type, transaction_type, data_source, workflow_group } = req.body;
    const newOrder = await Order.create({ customer, state, county, product_type, transaction_type, data_source, workflow_group });

    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return res.status(500).json({ success: false, message: error.message || "Error creating order" });
  }
};

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
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) return res.status(400).json({ success: false, message: "Invalid order ID" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("❌ Error fetching order:", error);
    return res.status(500).json({ success: false, message: error.message || "Error fetching order" });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) return res.status(400).json({ success: false, message: "Invalid order ID" });

    const { customer, state, county, product_type, transaction_type, data_source, workflow_group } = req.body;
    const updatedOrder = await Order.update(orderId, { customer, state, county, product_type, transaction_type, data_source, workflow_group });

    if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    return res.status(500).json({ success: false, message: error.message || "Error updating order" });
  }
};

// Soft delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) return res.status(400).json({ success: false, message: "Invalid order ID" });

    const deletedOrder = await Order.softDelete(orderId);
    if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    return res.status(200).json({ success: true, data: deletedOrder, message: "Order deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    return res.status(500).json({ success: false, message: error.message || "Error deleting order" });
  }
};
