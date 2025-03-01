const Order = require("../model/orders");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// Get all active orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Get all deleted orders
exports.getAllDeletedOrders = async (req, res) => {
  try {
    const deletedOrders = await Order.findAllDeleted();
    return res.status(200).json({ success: true, data: deletedOrders });
  } catch (error) {
    console.error("Error fetching deleted orders:", error);
    return res.status(500).json({ success: false, message: "Error fetching deleted orders" });
  }
};

// Get all completed orders
exports.getAllCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await Order.findAllCompleted();
    return res.status(200).json({ success: true, data: completedOrders });
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    return res.status(500).json({ success: false, message: "Error fetching completed orders" });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ success: false, message: "Error fetching order" });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.update(req.params.id, req.body);
    if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ success: false, message: "Error updating order" });
  }
};

// Soft delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.softDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, data: deletedOrder, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ success: false, message: "Error deleting order" });
  }
};
