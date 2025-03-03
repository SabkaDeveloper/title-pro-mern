const { validationResult } = require('express-validator');
const Contact = require("../model/contact");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const newContact = await Contact.create(req.body);
    return res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ success: false, message: "Error creating contact" });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();  
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ success: false, message: "Error fetching contacts" });
  }
};

// Get all soft-deleted contacts
exports.getAllDeletedContacts = async (req, res) => {
  try {
    const deletedContacts = await Contact.findDeleted();  
    res.status(200).json({
      message: "Soft-deleted contacts fetched successfully",
      contacts: deletedContacts,
    });
  } catch (error) {
    console.error("Error fetching deleted contacts:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get contact by name
exports.getContactByName = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const contact = await Contact.findByName(req.params.name);  
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ success: false, message: "Error fetching contact" });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const updatedContact = await Contact.update(req.params.email, req.body);
    if (!updatedContact) return res.status(404).json({ success: false, message: "Contact not found" });
    return res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ success: false, message: "Error updating contact" });
  }
};

// Soft delete a contact
exports.deleteContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const deletedContact = await Contact.softDelete(req.params.name);
    if (!deletedContact) return res.status(404).json({ success: false, message: "Contact not found" });
    return res.status(200).json({ success: true, data: deletedContact, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ success: false, message: "Error deleting contact" });
  }
};
