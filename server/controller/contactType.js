const ContactType = require("../model/contactType");

// Create a new contact type
exports.createContactType = async (req, res) => {
    try {
        const { contact_type } = req.body;

        if (!contact_type) {
            return res.status(400).json({ success: false, message: "Contact type is required" });
        }

        const newContactType = await ContactType.create({ contact_type });

        return res.status(201).json({ success: true, data: newContactType });
    } catch (error) {
        console.error("Error creating contact type:", error);
        return res.status(500).json({ success: false, message: "Error creating contact type" });
    }
};

// Get all contact types
exports.getAllContactTypes = async (req, res) => {
    try {
        const contactTypes = await ContactType.findAll();
        return res.status(200).json({ success: true, data: contactTypes });
    } catch (error) {
        console.error("Error fetching contact types:", error);
        return res.status(500).json({ success: false, message: "Error fetching contact types" });
    }
};

// Get a specific contact type by ID
exports.getContactTypeById = async (req, res) => {
    try {
        const contactType = await ContactType.findById(req.params.id);
        if (!contactType) return res.status(404).json({ success: false, message: "Contact type not found" });

        return res.status(200).json({ success: true, data: contactType });
    } catch (error) {
        console.error("Error fetching contact type:", error);
        return res.status(500).json({ success: false, message: "Error fetching contact type" });
    }
};

// Soft delete a contact type
exports.deleteContactType = async (req, res) => {
    try {
        const deletedContactType = await ContactType.softDelete(req.params.id);
        if (!deletedContactType) return res.status(404).json({ success: false, message: "Contact type not found" });

        return res.status(200).json({ success: true, message: "Contact type deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact type:", error);
        return res.status(500).json({ success: false, message: "Error deleting contact type" });
    }
};

// Get all deleted contact types
exports.getDeletedContactTypes = async (req, res) => {
    try {
        const deletedContactTypes = await ContactType.findDeleted();
        return res.status(200).json({ success: true, data: deletedContactTypes });
    } catch (error) {
        console.error("Error fetching deleted contact types:", error);
        return res.status(500).json({ success: false, message: "Error fetching deleted contact types" });
    }
};
