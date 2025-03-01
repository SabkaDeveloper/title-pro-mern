const OrderEntry = require("../model/orderEntry");

// ✅ Create a new OrderEntry
exports.createOrderEntry = async (req, res) => {
  try {
    const newOrderEntry = await OrderEntry.create(req.body);
    res.status(201).json({ success: true, data: newOrderEntry });
  } catch (error) {
    console.error("❌ Error creating OrderEntry:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create OrderEntry" });
  }
};

// ✅ Get all OrderEntries
exports.getAllOrderEntries = async (req, res) => {
  try {
    const orderEntries = await OrderEntry.findAll();
    res.status(200).json({ success: true, data: orderEntries });
  } catch (error) {
    console.error("❌ Error fetching OrderEntries:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch OrderEntries" });
  }
};

// ✅ Get OrderEntry by ID
exports.getOrderEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderEntry = await OrderEntry.findOne({ where: { id } });

    if (!orderEntry) {
      return res.status(404).json({ success: false, message: "OrderEntry not found" });
    }

    res.status(200).json({ success: true, data: orderEntry });
  } catch (error) {
    console.error("❌ Error fetching OrderEntry:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch OrderEntry" });
  }
};

// ✅ Update OrderEntry by ID
exports.updateOrderEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await OrderEntry.update(req.body, { where: { id } });

    if (!updatedRows) {
      return res.status(404).json({ success: false, message: "OrderEntry not found or update failed" });
    }

    // Fetch updated entry
    const updatedOrderEntry = await OrderEntry.findOne({ where: { id } });

    res.status(200).json({ success: true, data: updatedOrderEntry });
  } catch (error) {
    console.error("❌ Error updating OrderEntry:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to update OrderEntry" });
  }
};

// ✅ Soft Delete OrderEntry
exports.softDeleteOrderEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await OrderEntry.update({ deletedAt: new Date() }, { where: { id } });

    if (!updatedRows) {
      return res.status(404).json({ success: false, message: "OrderEntry not found or already deleted" });
    }

    res.status(200).json({ success: true, message: "OrderEntry deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting OrderEntry:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to delete OrderEntry" });
  }
};
