const OrderEntry = require("../model/orderEntry");

// Create a new order entry
const createOrderEntry = async (req, res) => {
    try {
        const newOrderEntry = await OrderEntry.create(req.body);
        return res.status(201).json({ success: true, data: newOrderEntry });
    } catch (error) {
        console.error("Error creating order entry:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all order entries
const getAllOrderEntries = async (req, res) => {
    try {
        const orderEntries = await OrderEntry.findAll();
        return res.status(200).json({ success: true, data: orderEntries });
    } catch (error) {
        console.error("Error fetching order entries:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get a single order entry by ID
const getOrderEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderEntry = await OrderEntry.findById(id);

        if (!orderEntry) {
            return res.status(404).json({ success: false, message: "Order entry not found" });
        }

        return res.status(200).json({ success: true, data: orderEntry });
    } catch (error) {
        console.error("Error fetching order entry:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update an order entry
const updateOrderEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrderEntry = await OrderEntry.update(id, req.body);

        if (!updatedOrderEntry) {
            return res.status(404).json({ success: false, message: "Order entry not found" });
        }

        return res.status(200).json({ success: true, data: updatedOrderEntry });
    } catch (error) {
        console.error("Error updating order entry:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete an order entry (Hard Delete)
const deleteOrderEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrderEntry = await OrderEntry.delete(id);

        if (!deletedOrderEntry) {
            return res.status(404).json({ success: false, message: "Order entry not found" });
        }

        return res.status(200).json({ success: true, message: "Order entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting order entry:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    createOrderEntry,
    getAllOrderEntries,
    getOrderEntryById,
    updateOrderEntry,
    deleteOrderEntry
};
