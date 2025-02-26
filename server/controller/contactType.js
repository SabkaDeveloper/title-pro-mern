const ContactType = require("../model/contactType");

// Create a new contact type
exports.createContactType = async (req, res) => {
  try {
    const { name, slug, user_id } = req.body;
    const contactType = await ContactType.create(name, slug, user_id);
    return res.status(201).json({ success: true, contactType, message: "Contact type created successfully" });
  } catch (error) {
    console.error("Error creating contact type:", error);
    return res.status(500).json({ success: false, message: "Failed to create contact type" });
  }
};

// Get all contact types
exports.getAllContactTypes = async (req, res) => {
  try {
    const contactTypes = await ContactType.findAll();
    return res.status(200).json({ success: true, contactTypes });
  } catch (error) {
    console.error("Error fetching contact types:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch contact types" });
  }
};

// Get contact type by ID
exports.getContactTypeById = async (req, res) => {
  try {
    const contactType = await ContactType.findById(req.params.id);
    if (!contactType) {
      return res.status(404).json({ success: false, message: "Contact type not found" });
    }
    return res.status(200).json({ success: true, contactType });
  } catch (error) {
    console.error("Error fetching contact type:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch contact type" });
  }
};

// Soft delete a contact type
exports.deleteContactType = async (req, res) => {
  try {
    await ContactType.softDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Contact type deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact type:", error);
    return res.status(500).json({ success: false, message: "Failed to delete contact type" });
  }
};
