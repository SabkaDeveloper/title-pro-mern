const express = require("express");
const router = express.Router();
const { 
  login, 
  validateLogin, 
  changePassword, 
  validateChangePassword, 
  signup, 
  validateSignup 
} = require("../controller/Auth");
const { auth } = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const contactController = require("../controller/contact");
const contactTypeController = require("../controller/contactType");
const orderController = require("../controller/order");
const orderEntryController = require("../controller/orderEntry");
const orderSummaryController = require("../controller/ordersummary");

// ********************************************************************************************************
//                                      Authentication Routes
// ********************************************************************************************************
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/change-password", auth, validateChangePassword, changePassword);

// ********************************************************************************************************
//                                      Contact Management Routes
// ********************************************************************************************************
router.post("/contacts", contactController.createContact);
router.get("/contacts/deleted", contactController.getAllDeletedContacts);
router.get("/contacts", contactController.getAllContacts);
router.get("/contacts/:id", contactController.getContactById);
router.put("/contacts/:id", contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);

// ********************************************************************************************************
//                                      Contact Type Management Routes
// ********************************************************************************************************
// Admin-only routes (Create, Delete, Restore)
router.post("/contact-types", auth, adminAuth, contactTypeController.createContactType);
router.delete("/contact-types/:id", auth, adminAuth, contactTypeController.deleteContactType);
router.put("/contact-types/:id/restore", auth, adminAuth, contactTypeController.restoreContactType);

// Public routes (Anyone can access)
router.get("/contact-types", contactTypeController.getAllContactTypes);
router.get("/contact-types/:id", contactTypeController.getContactTypeById);

// ********************************************************************************************************
//                                      Order Management Routes
// ********************************************************************************************************
router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/deleted", orderController.getAllDeletedOrders);
router.get("/orders/completed", orderController.getAllCompletedOrders);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

// ********************************************************************************************************
//                                      Order Entry Management Routes
// ********************************************************************************************************
router.post("/order-entries", orderEntryController.createOrderEntry); 
router.get("/order-entries", orderEntryController.getAllOrderEntries);
router.get("/order-entries/:id", orderEntryController.getOrderEntryById); 
router.put("/order-entries/:id", orderEntryController.updateOrderEntry); 
router.delete("/order-entries/:id", orderEntryController.deleteOrderEntry); 

// ********************************************************************************************************
//                                      Order Summary Management Routes
// ********************************************************************************************************
router.get("/order-summaries", orderSummaryController.getAllOrderSummaries);
router.get("/order-summaries/:orderNumber", orderSummaryController.getOrderSummaryByOrderNumber);
// router.get("/order-summaries/:orderNumber/status", orderSummaryController.getOrderSummariesByOrderNumberAndStatus);
// router.get("/order-summaries/date-range", orderSummaryController.getOrderSummariesByDateRange);
router.get("/order-summaries/:orderNumber/order-status", orderSummaryController.getOrderStatusByOrderNumber);

module.exports = router;
