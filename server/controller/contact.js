const Contact = require("../model/contact");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
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

// Get a specific contact by ID
// exports.getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);  
//     if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
//     return res.status(200).json({ success: true, data: contact });
//   } catch (error) {
//     console.error("Error fetching contact:", error);
//     return res.status(500).json({ success: false, message: "Error fetching contact" });
//   }
// };

exports.getContactByName = async (req, res) => {
  try {
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
    const deletedContact = await Contact.softDelete(req.params.name);
    if (!deletedContact) return res.status(404).json({ success: false, message: "Contact not found" });
    return res.status(200).json({ success: true, data: deletedContact, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ success: false, message: "Error deleting contact" });
  }
};
