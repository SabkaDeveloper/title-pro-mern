import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ContactTypeModel from "./Contact-TypeModel";
import AdminSidebar from "../AdminSidebar";
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(token)?.token || token;
  } catch {
    return token;
  }
};

const ContactTypeList = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactsPerPage = 10;

  useEffect(() => {
    fetchContactTypes();
  }, [activeTab]);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.contact_type.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredContacts(filtered);
    setActivePage(1);
  }, [search, contacts]);

  const fetchContactTypes = async () => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const url = activeTab === "Active"
        ? "http://localhost:4000/api/v1/contact-types"
        : "http://localhost:4000/api/v1/contact-types/deleted";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setContacts(data.data);
        setFilteredContacts(data.data);
      } else {
        toast.error(data.message || "Failed to fetch contact types");
        setContacts([]);
        setFilteredContacts([]);
      }
    } catch (error) {
      toast.error("Error fetching contact types");
      setContacts([]);
      setFilteredContacts([]);
    }
  };

  const handleSessionExpired = () => {
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
    navigate("/login");
  };

  const deleteContactType = async (id)=> {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/contact-types/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Contact type deleted successfully");
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      } else {
        toast.error(data.message || "Failed to delete contact type");
      }
    } catch (error) {
      toast.error("Error deleting contact type");
    }
  };

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / contactsPerPage));
  const displayedContacts = filteredContacts.slice(
    (activePage - 1) * contactsPerPage,
    activePage * contactsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setActivePage(page);
  };

  return (
    <div className=" min-h-screen bg-gray-100 ">
      <div>
    {/* Sidebar */}
    <AdminSidebar />
        
      </div>
      <div className="flex justify-center mx-auto ml-40">
    <div className="container mx-auto p-4 bg-white text-black min-h-screen w-[1300px] shadow-md shadow-gray-500 ">
    <h3 className="text-xl font-bold mb-4">Contact Type</h3>
  
    {/* Tabs */}
    <div className="flex space-x-4 mb-4">
      {["Active"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 border font-semibold shadow-md shadow-gray-500 ${
            
          
            activeTab === tab
              ? "bg-[#87CEEB] text-black border-black rounded-md"
              : "bg-white text-black border-gray-300 rounded-md"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  
    {/* Search Bar */}
    <div className="mb-4 shadow-md shadow-gray-500">
      <input
        type="text"
        placeholder="Search contact types..."
        className="w-full p-2 border rounded border-gray-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  
    {/* Action Buttons */}
    <div className="mb-4">
      <ContactTypeModel
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onContactAdded={(newContact) => setContacts((prev) => [...prev, newContact])}
      />
    </div>
  
    {/* Contacts Table */}
    <div className="overflow-x-auto shadow-md shadow-gray-500">
      <table className="table-auto w-full border border-gray-300">
        <thead className="text-center font-semibold bg-[#87CEEB]">
          <tr>
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Slug</th>
            <th className="p-2 border border-gray-300">User ID</th>
            {activeTab === "Deleted" && (
              <th className="p-2 border border-gray-300">Deleted At</th>
            )}
            {activeTab === "Active" && (
              <th className="p-2 border border-gray-300">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedContacts.length === 0 ? (
            <tr>
              <td
                colSpan={activeTab === "Deleted" ? 5 : 5}
                className="text-center p-4 bg-white"
              >
                No {activeTab.toLowerCase()} contact types found
              </td>
            </tr>
          ) : (
            displayedContacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={`text-center border-b border-gray-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                }`}
              >
                <td className="p-2 border border-gray-300">{contact.id}</td>
                <td className="p-2 border border-gray-300">{contact.contact_type}</td>
                <td className="p-2 border border-gray-300">{contact.slug}</td>
                <td className="p-2 border border-gray-300">{contact.user_id}</td>
                {activeTab === "Deleted" && (
                  <td className="p-2 border border-gray-300">
                    {contact.deletedAt || "N/A"}
                  </td>
                )}
                {activeTab === "Active" && (
                  <td className="p-2 border border-gray-300">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteContactType(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  
    {/* Pagination */}
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className={`px-3 py-1 border rounded ${
          activePage === 1
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "hover:bg-gray-300 bg-white"
        }`}
        disabled={activePage === 1}
        onClick={() => handlePageChange(activePage - 1)}
      >
        Prev
      </button>
  
      {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${
            activePage === page + 1
              ? "bg-[#87CEEB] text-black border-black"
              : "hover:bg-gray-300 bg-white"
          }`}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
  
      <button
        className={`px-3 py-1 border rounded ${
          activePage === totalPages
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "hover:bg-gray-300 bg-white"
        }`}
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(activePage + 1)}
      >
        Next
      </button>
    </div>
  </div>
  </div>
  </div>
  
  );
};

export default ContactTypeList;
