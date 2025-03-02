const Contact = require("../model/contact"); 

const contactController = {
  // Create a new contact
  createContact: async (req, res) => {
    try {
      const {
        name, phone, email, type, address, city, county, status, user_id
      } = req.body;

      if (!name || !phone || !email || !type || !user_id) {
        return res.status(400).json({ message: "Required fields are missing." });
      }

      const newContact = await Contact.create({
        name, phone, email, type, address, city, county, status, user_id
      });

      res.status(201).json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
      console.error("Error creating contact:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Get all active contacts
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.findAll();
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

// Get all soft-deleted contacts
getAllDeletedContacts: async (req, res) => {
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
},

  // Get a single contact by ID
  getContactById: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findById(id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(200).json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Update a contact by ID
  updateContact: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name, phone, email, type, address, city, county, status
      } = req.body;

      const updatedContact = await Contact.update(id, {
        name, phone, email, type, address, city, county, status
      });

      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found or already deleted" });
      }

      res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
    } catch (error) {
      console.error("Error updating contact:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },


// Soft delete a contact by ID
deleteContact: async (req, res) => {
  try {
      const { id } = req.params;

      
      if (isNaN(Number(id))) {
          return res.status(400).json({ message: "Invalid contact ID. It must be an integer." });
      }

      const deletedContact = await Contact.softDelete(id);

      if (!deletedContact) {
          return res.status(404).json({ message: "Contact not found or already deleted" });
      }

      res.status(200).json({ message: "Contact soft-deleted successfully", contact: deletedContact });
  } catch (error) {
      console.error("Error soft-deleting contact:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
},
};

module.exports = contactController;
