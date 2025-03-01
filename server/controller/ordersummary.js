const OrderSummary = require("../model/orderSummary");

// Controller to get all order summaries
const getAllOrderSummaries = async (req, res) => {
    try {
        const summaries = await OrderSummary.findAll();
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get an order summary by order number
const getOrderSummaryByOrderNumber = async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const summary = await OrderSummary.findByOrderNumber(orderNumber);
        if (!summary) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Controller to get order summaries by status for a specific order number
// const getOrderSummariesByOrderNumberAndStatus = async (req, res) => {
//     const { orderNumber } = req.params;
//     const { status } = req.query;

//     try {
//         const validStatuses = ['Open', 'Closed', 'Pending'];
//         if (!validStatuses.includes(status)) {
//             return res.status(400).json({ message: "Invalid status. Use 'Open', 'Closed', or 'Pending'." });
//         }

//         const orders = await OrderSummary.findByOrderNumberAndStatus(orderNumber, status);
//         if (orders.length === 0) {
//             return res.status(404).json({ message: `No orders found with number ${orderNumber} and status ${status}` });
//         }

//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch order summaries by order number and status", error: error.message });
//     }
// };

// Controller to get order summaries within a date range
// const getOrderSummariesByDateRange = async (req, res) => {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ message: "Please provide both startDate and endDate" });
//     }

//     try {
//         const orders = await OrderSummary.findByDateRange(startDate, endDate);
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch order summaries by date range", error: error.message });
//     }
// };

// Controller to get the status of a specific order by order number
const getOrderStatusByOrderNumber = async (req, res) => {
    const { orderNumber } = req.params;

    try {
        const status = await OrderSummary.getOrderStatusByOrderNumber(orderNumber);
        if (!status) {
            return res.status(404).json({ message: `Order with number ${orderNumber} not found` });
        }

        res.status(200).json({ orderNumber, status });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch order status", error: error.message });
    }
};

// Ensure all functions are exported
module.exports = {
    getOrderSummaryByOrderNumber,
    getAllOrderSummaries,
    // getOrderSummariesByOrderNumberAndStatus,
    // getOrderSummariesByDateRange,
    getOrderStatusByOrderNumber,
};
