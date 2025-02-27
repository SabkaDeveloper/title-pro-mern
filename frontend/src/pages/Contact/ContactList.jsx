import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal"; // Make sure ContactModal is correctly imported

const ContactList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const contactsPerPage = 10;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/contacts");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setContacts(data.data);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]); 
      }
    };

    fetchContacts();
  }, []);


  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const startIndex = (activePage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const displayedContacts = contacts.slice(startIndex, endIndex);

  return (
    <div className="container-fluid p-0">
      <h3 style={{ marginTop: "-20px", marginLeft: "-80px" }}>Contact List</h3>

      <ul className="nav nav-tabs" style={{ marginLeft: "-80px", width: "110%", borderBottom: "3px solid #dee2e6" }}>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => navigate("/active-contacts")}>
            Active
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-muted" onClick={() => navigate("/deleted-contacts")}>
            Deleted
          </button>
        </li>
      </ul>

      <div className="d-flex justify-content-between my-3">
        <Form.Control type="text" placeholder="Contact Name" style={{ maxWidth: "250px", marginLeft: "610px" }} />
        <Form.Control type="text" placeholder="Search Active Contacts..." style={{ maxWidth: "350px" }} />
        <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>

      <div style={{ marginLeft: "-100px", marginRight: "-100px" }} className="table-responsive w-300">
        <Table striped bordered hover className="small w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Invoice Terms</th>
              <th>Created By</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact, index) => (
              <tr key={index}>
                <td className="text-primary">{contact.name}</td>
                <td>{contact.type}</td>
                <td>{contact.address}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>Net 30</td>
                <td>{contact.createdBy}</td>
                <td>{contact.created_at}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination className="justify-content-center">
        <Pagination.Prev disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} />
        {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
          <Pagination.Item key={page} active={page + 1 === activePage} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
        {totalPages > 5 && <Pagination.Ellipsis />}
        <Pagination.Next disabled={activePage === totalPages} onClick={() => handlePageChange(activePage + 1)} />
      </Pagination>

    </div>
  );
};

export default ContactList;
