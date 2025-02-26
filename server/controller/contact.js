const Contact = require("../model/contact");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, type, address, city, county, status, user_id } = req.body;
    const contact = await Contact.create(name, phone, email, type, address, city, county, status, user_id);
    return res.status(201).json({ success: true, contact, message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ success: false, message: "Failed to create contact" });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
};

// Get contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    return res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch contact" });
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  try {
    const { name, phone, email, type, address, city, county, status } = req.body;
    const contact = await Contact.update(req.params.id, name, phone, email, type, address, city, county, status);
    return res.status(200).json({ success: true, contact, message: "Contact updated successfully" });
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ success: false, message: "Failed to update contact" });
  }
};

// Soft delete a contact
exports.deleteContact = async (req, res) => {
  try {
    await Contact.softDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ success: false, message: "Failed to delete contact" });
  }
};
