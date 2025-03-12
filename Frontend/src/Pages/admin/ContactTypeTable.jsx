import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import ContactTypeModel from "./Contact-TypeModel";
import DeleteContactType from "./DeleteContactType";
import "../../utils/Margin.css"
const ContactTypeList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contactsPerPage = 10;

  const { reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      user_id: "",
    },
  });

  // Fetch all contacts
  const fetchAllContacts = async () => {
    try {

       const token = localStorage.getItem('token');
      
          if (!token) {
            console.error("No token found, please log in.");
            toast.error("No token found, please log in.", { autoClose: 3000 });
            return false;
          }

      const response = await fetch("http://localhost:4000/api/v1/contact-types" , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the Authorization header with the token
  
        },
      });
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

  const handleDeleteSuccess = (deletedContactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deletedContactId));
  };

  // Fetch contacts by search term
  const fetchContactsBySearch = async (searchTerm) => {
    try {
      if (!searchTerm) {
        fetchAllContacts();
        return;
      }

      const url = isNaN(searchTerm)
        ? `http://localhost:4000/api/v1/contact-type/${encodeURIComponent(searchTerm)}`
        : `http://localhost:4000/api/v1/contact-type/${searchTerm}`;

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
      <h4 className="mt-1" style={{transform:'translateX(-90px)'}}>Contact Type</h4>

      {/* Search & Filters */}
      <Row className=" my-3 g-2" style={{transform:'translate(1230px, -55px)'}}>
       
        <Col xs={6} sm={3} md="auto">
          <ContactTypeModel
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onContactAdded={(newContact) => setContacts((prev) => [...prev, newContact])}
          />
        </Col>

        <Col xs={6} sm={3} md="auto">
          <DeleteContactType onDeleteSuccess={handleDeleteSuccess} />
        </Col>
      </Row>

      {/* Contacts Table */}
      <div className="table-responsive w-200" style={{ width: "1516px", transform : 'translate(-120px, -60px)' }}>
        <Table striped bordered hover className="small w-200 mb-3" >
          <thead>
          <tr>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Name</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Slug</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">User_ID</th>
        </tr>

          </thead>
          <tbody>
            {displayedContacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.contact_type}</td>
                <td>{contact.slug}</td>
                <td>{contact.user_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
      </div>

      {/* Pagination */}
    </Container>
  );
};

export default ContactTypeList;
