const { body, param, validationResult } = require('express-validator');
const ContactType = require("../model/contactType");

// Create Contact Type 
exports.createContactType = async (req, res) => {
    try {
      const { contact_type } = req.body;
      const user_id = req.user.id;  // Use the user_id from the authentication token
  
      if (!contact_type) {
        return res.status(400).json({ success: false, message: "Contact type is required" });
      }
  
      // Create the contact type using the user_id from the auth token
      const newContactType = await ContactType.create({ contact_type }, user_id);
      return res.status(201).json({ success: true, data: newContactType });
    } catch (error) {
      console.error("Error creating contact type:", error);
  
      // Handle errors and return appropriate response
      if (error && error.detail) {
        return res.status(500).json({
          success: false,
          message: "Error creating contact type",
          error: error.detail,
        });
      }
  
      return res.status(500).json({
        success: false,
        message: "Error creating contact type",
        error: error.message || "Internal server error",
      });
    }
  };
  

// Soft Delete Contact Type 
exports.deleteContactType = [
  // Validation
  param('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),

  // Controller
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { id } = req.params;

      const deletedContactType = await ContactType.softDelete(id);
      if (!deletedContactType) {
        return res.status(404).json({ success: false, message: "Contact type not found" });
      }

      return res.status(200).json({ success: true, message: "Contact type soft deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact type:", error);
      return res.status(500).json({ success: false, message: "Error deleting contact type", error: error.detail });
    }
  }
];


// Restore Soft Deleted Contact Type 
exports.restoreContactType = [
  // Validation
  param('id').notEmpty().withMessage('ID is required').isInt().withMessage('ID must be an integer'),

  // Controller
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { id } = req.params;

      const restoredContactType = await ContactType.restore(id);
      if (!restoredContactType) {
        return res.status(404).json({ success: false, message: "Contact type not found or already restored" });
      }

      return res.status(200).json({ success: true, message: "Contact type restored successfully" });
    } catch (error) {
      console.error("Error restoring contact type:", error);
      return res.status(500).json({ success: false, message: "Error restoring contact type", error: error.detail });
    }
  }
];

// Get All Contact Types 
exports.getAllContactTypes = async (req, res) => {
    try {
        const contactTypes = await ContactType.findAll();
        return res.status(200).json({ success: true, data: contactTypes });
    } catch (error) {
        console.error("Error fetching contact types:", error);
        return res.status(500).json({ success: false, message: "Error fetching contact types" });
    }
};

exports.getContactTypeById = [
  // Validation
  param('id').isInt().withMessage('Contact type ID must be a valid integer'),

  // Controller
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const contactType = await ContactType.findById(req.params.id);
      if (!contactType) {
        return res.status(404).json({ success: false, message: "Contact type not found" });
      }

      return res.status(200).json({ success: true, data: contactType });
    } catch (error) {
      console.error("Error fetching contact type by ID:", error);
      return res.status(500).json({ success: false, message: "Error fetching contact type" });
    }
  }
];

