import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContactModal from "../Components/Core/Contact/ContactModal";
import { getToken, getUserId } from "../utils/auth";

export default function ContactList() {
  const [activeTab, setActiveTab] = useState("Active");
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "Active") {
      fetchAllContacts();
    } else {
      fetchDeletedContacts();
    }
  }, [activeTab]);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredContacts(filtered);
    setActivePage(1); // Reset to first page on new search
  }, [search, contacts]);

  const fetchAllContacts = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("No token found, redirecting to login.");
        navigate("/login");
        return;
      }
      const response = await fetch("http://localhost:4000/api/v1/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        toast.error("Unauthorized access. Redirecting to login.");
        navigate("/login");
        return;
      }
      const data = await response.json();
      setContacts(data.data || []);
      setFilteredContacts(data.data || []);
    } catch (error) {
      toast.error("Error fetching contacts.");
    }
  };

  const fetchDeletedContacts = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }
      const response = await fetch("http://localhost:4000/api/v1/contacts/deleted", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        toast.error("Session expired. Redirecting to login.");
        navigate("/login");
        return;
      }
      const data = await response.json();
      setContacts(data.contacts || []);
      setFilteredContacts(data.contacts || []);
    } catch (error) {
      toast.error("Error fetching deleted contacts.");
    }
  };

  const handleDeleteContact = async (contactName) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }
      if (!window.confirm(`Are you sure you want to delete contact: ${contactName}?`)) {
        return;
      }
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${encodeURIComponent(contactName)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        toast.error("Unauthorized access. Redirecting to login.");
        navigate("/login");
        return;
      }
      const data = await response.json();
      if (response.ok) {
        toast.success("Contact deleted successfully!");
        setContacts(contacts.filter((contact) => contact.name !== contactName));
        setFilteredContacts(filteredContacts.filter((contact) => contact.name !== contactName));
      } else {
        toast.error(data.message || "Failed to delete contact");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the contact");
    }
  };

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  return (
    <div className="bg-white h-[100vh] p-4 rounded shadow-sm font-sans">
      <h2 className="text-xl font-bold mb-2">Contact List</h2>
      <div className="flex border-b">
        {["Active", "Deleted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center my-3">
        <input
          type="text"
          placeholder="Search Contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        {activeTab === "Active" && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
            + Add
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-blue-100">
            <tr>
              {["Name", "Type", "Address", "Phone", "Email", "Invoice Terms", "Created By", "Created On", "Actions"].map((header) => (
                <th key={header} className="p-2 border border-gray-300 text-left font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-2 border border-gray-300">{contact.name || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.type || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.address || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.phone || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.email || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.invoice_terms || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.created_by || "-"}</td>
                  <td className="p-2 border border-gray-300">{contact.created_at || "-"}</td>
                  <td className="p-2 border border-gray-300">
                    {activeTab === "Active" && (
                      <button onClick={() => handleDeleteContact(contact.name)} className="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button disabled={activePage === 1} onClick={() => setActivePage((prev) => prev - 1)} className="px-3 py-1 border rounded">Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setActivePage(i + 1)} className={`px-3 py-1 border rounded ${activePage === i + 1 ? "bg-blue-500 text-white" : ""}`}>
            {i + 1}
          </button>
        ))}
        <button disabled={activePage === totalPages} onClick={() => setActivePage((prev) => prev + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>

      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
