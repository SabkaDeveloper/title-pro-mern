const ContactType = require("../model/contactType");

// Create Contact Type (Admin Only)
exports.createContactType = async (req, res) => {
    try {
        const { contact_type } = req.body;
        const user_id = req.user.id; 

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

// Soft Delete Contact Type (Admin Only)
exports.deleteContactType = async (req, res) => {
    try {
        const { contact_type } = req.params;

        const deletedContactType = await ContactType.softDelete(contact_type);
        if (!deletedContactType) {
            return res.status(404).json({ success: false, message: "Contact type not found" });
        }

        return res.status(200).json({ success: true, message: "Contact type deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact type:", error);
        return res.status(500).json({ success: false, message: "Error deleting contact type" });
    }
};

// Restore Soft Deleted Contact Type (Admin Only)
exports.restoreContactType = async (req, res) => {
    try {
        const { contact_type } = req.params;

        const restoredContactType = await ContactType.restore(contact_type);
        if (!restoredContactType) {
            return res.status(404).json({ success: false, message: "Contact type not found" });
        }

        return res.status(200).json({ success: true, message: "Contact type restored successfully" });
    } catch (error) {
        console.error("Error restoring contact type:", error);
        return res.status(500).json({ success: false, message: "Error restoring contact type" });
    }
};

// Get All Contact Types (Public)
exports.getAllContactTypes = async (req, res) => {
    try {
        const contactTypes = await ContactType.findAll();
        return res.status(200).json({ success: true, data: contactTypes });
    } catch (error) {
        console.error("Error fetching contact types:", error);
        return res.status(500).json({ success: false, message: "Error fetching contact types" });
    }
};

// Get Contact Type By ID (Public)
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

// Get Contact Type By Name (Public)
exports.getContactTypeByName = async (req, res) => {
    try {
        const contactType = await ContactType.findByName(req.params.contact_type);
        if (!contactType) {
            return res.status(404).json({ success: false, message: "Contact type not found" });
        }

        return res.status(200).json({ success: true, data: contactType });
    } catch (error) {
        console.error("Error fetching contact type:", error);
        return res.status(500).json({ success: false, message: "Error fetching contact type" });
    }
};