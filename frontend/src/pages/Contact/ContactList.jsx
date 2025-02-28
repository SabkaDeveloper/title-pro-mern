import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal"; 
import { FaSearch } from "react-icons/fa";
import FilterBtn from "./FilterBtn";
import UpdateBtn from "./UpdateBtn";

const ContactList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactsPerPage = 10;

  // Fetch all contacts
  const fetchAllContacts = async () => {
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

  // Fetch contacts by search term
  const fetchContactsBySearch = async (searchTerm) => {
    try {
      if (!searchTerm) {
        fetchAllContacts();
        return;
      }

      const url = isNaN(searchTerm)
        ? `http://localhost:4000/api/v1/contacts/${encodeURIComponent(searchTerm)}`
        : `http://localhost:4000/api/v1/contacts/${searchTerm}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setContacts(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching searched contacts:", error);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const handleSearch = () => {
    fetchContactsBySearch(searchTerm);
  };

  const totalPages = Math.max(1, Math.ceil(contacts.length / contactsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const startIndex = (activePage - 1) * contactsPerPage;
  const displayedContacts = contacts.slice(startIndex, startIndex + contactsPerPage);

  return (
    <Container fluid>
      <h3 className="mt-1">Contact List</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
        <button className="nav-link active" onClick={() => navigate("/contacts")}>
        Active
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-muted" onClick={() => navigate("/deleted-contacts")}>
            Deleted
          </button>
        </li>
      </ul>

      {/* Search & Filters */}
      <Row className="align-items-center my-3 g-2">
        <Col xs={12} sm={6} md={3}>
          <Form.Control type="text" placeholder="Contact Name" />
        </Col>

        <Col xs={12} sm={6} md={5}>
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Search Active Contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </div>
        </Col>

        <Col xs={6} sm={3} md="auto">
          <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </Col>

        <Col xs={6} sm={3} md="auto">
          <FilterBtn />
        </Col>
        <Col xs={6} sm={3} md="auto">
          <UpdateBtn />
        </Col>
      </Row>

      {/* Contacts Table */}
      <div className="table-responsive">
        <Table striped bordered hover className="small w-200">
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
                <td>{contact.name}</td>
                <td>{contact.created_at}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="justify-content-center flex-wrap">
        <Pagination.Prev disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} />
        {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
          <Pagination.Item key={page} active={page + 1 === activePage} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
        {totalPages > 5 && <Pagination.Ellipsis />}
        <Pagination.Next disabled={activePage === totalPages} onClick={() => handlePageChange(activePage + 1)} />
      </Pagination>
    </Container>
  );
};

export default ContactList;
