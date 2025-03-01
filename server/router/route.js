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
const contactController = require("../controller/contact");
const contactTypeController = require("../controller/contactType");
const orderController = require("../controller/order");
const orderEntryController = require("../controller/orderEntry"); // ✅ Added Order Entry Controller

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
router.get("/contacts", contactController.getAllContacts);
router.get("/contacts/:id", contactController.getContactById);
router.put("/contacts/:id", contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);
router.get("/contacts/deleted", contactController.getDeletedContacts);

// ********************************************************************************************************
//                                      Contact Type Management Routes
// ********************************************************************************************************
router.post("/contact-types", contactTypeController.createContactType);
router.get("/contact-types", contactTypeController.getAllContactTypes);
router.get("/contact-types/:id", contactTypeController.getContactTypeById);
router.delete("/contact-types/:id", contactTypeController.deleteContactType);
router.get("/contact-types/deleted", contactTypeController.getDeletedContactTypes);

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
router.post("/order-entries", orderEntryController.createOrderEntry);  // ✅ Create Order Entry
router.get("/order-entries", orderEntryController.getAllOrderEntries); // ✅ Get All Order Entries
router.get("/order-entries/:id", orderEntryController.getOrderEntryById); // ✅ Get Order Entry by ID
router.put("/order-entries/:id", orderEntryController.updateOrderEntry); // ✅ Update Order Entry
router.delete("/order-entries/:id", orderEntryController.deleteOrderEntry); // ✅ Delete Order Entry

module.exports = router;
