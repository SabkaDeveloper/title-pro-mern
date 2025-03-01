const express = require("express");
const router = express.Router();
const { login, validateLogin, changePassword, validateChangePassword } = require("../controller/Auth");
const { auth } = require("../middleware/auth");
const contactController = require("../controller/contact");
const contactTypeController = require("../controller/contactType"); 

// ********************************************************************************************************
//                                      Authentication Routes
// ********************************************************************************************************

// Login route
router.post("/login", validateLogin, login);

// Change Password route (protected)
router.post("/change-password", auth, validateChangePassword, changePassword);

// ********************************************************************************************************
//                                      Contact Management Routes (Public)
// ********************************************************************************************************

// Create a new contact
router.post("/contacts", contactController.createContact);

// Get all contacts
router.get("/contacts", contactController.getAllContacts);

// Get a specific contact by ID
// router.get("/contacts/:id", contactController.getContactById);

router.get("/contacts/:name", contactController.getContactByName);

// Update a contact
router.put("/contacts/:email", contactController.updateContact);

// Soft delete a contact
router.delete("/contacts/:name", contactController.deleteContact);

// ********************************************************************************************************
//                                      Contact Type Management Routes
// ********************************************************************************************************

// Create a new contact type
router.post("/contact-types", contactTypeController.createContactType);

// Get all contact types
router.get("/contact-types", contactTypeController.getAllContactTypes);

// Get a specific contact type by ID
router.get("/contact-types/:id", contactTypeController.getContactTypeById);

// Soft delete a contact type
router.delete("/contact-types/:id", contactTypeController.deleteContactType);

module.exports = router;
