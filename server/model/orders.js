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
const orderEntryController = require("../controller/orderEntry");
const orderController = require("../controller/order");

// ********************************************************************************************************
//                                      Authentication Routes
// ********************************************************************************************************

// Signup route
router.post("/signup", validateSignup, signup);

// Login route
router.post("/login", validateLogin, login);

// Change Password route (protected)
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
//                                      Order Entry Management Routes
// ********************************************************************************************************

router.post("/order-entries", orderEntryController.createOrderEntry);
router.get("/order-entries", orderEntryController.getAllOrderEntries);
router.get("/order-entries/:id", orderEntryController.getOrderEntryById);
router.put("/order-entries/:id", orderEntryController.updateOrderEntry);
router.delete("/order-entries/:id", orderEntryController.softDeleteOrderEntry);

// ********************************************************************************************************
//                                      Order Management Routes
// ********************************************************************************************************

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/deleted", orderController.getAllDeletedOrders);
router.get("/orders/completed", orderController.getAllCompletedOrders);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.softDeleteOrder);

module.exports = router;
