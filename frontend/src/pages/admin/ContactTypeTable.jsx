import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import ContactTypeModel from "./Contact-TypeModel";
import DeleteContactType from "./DeleteContactType";
import { toast } from 'react-hot-toast';

// Add token utility function
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const tokenData = JSON.parse(token);
    return tokenData.token || token;
  } catch {
    return token;
  }
};

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

  // Fetch all contacts with authentication
  const fetchAllContacts = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        console.log('No token found');
        navigate('/login');
        return;
      }

      const response = await fetch("http://localhost:4000/api/v1/contact-types", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        toast.error("Session expired. Please login again.");
        navigate('/login');
        return;
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setContacts(data.data);
      } else {
        setContacts([]);
        if (data.message) {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Error fetching contact types. Please try again.");
      setContacts([]);
    }
  };

  const handleDeleteSuccess = (deletedContactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== deletedContactId));
  };

  // Fetch contacts by search term with authentication
  const fetchContactsBySearch = async (searchTerm) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      if (!searchTerm) {
        fetchAllContacts();
        return;
      }

      const url = isNaN(searchTerm)
        ? `http://localhost:4000/api/v1/contact-type/${encodeURIComponent(searchTerm)}`
        : `http://localhost:4000/api/v1/contact-type/${searchTerm}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        toast.error("Session expired. Please login again.");
        navigate('/login');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setContacts(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setContacts([]);
        if (data.message) {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
      toast.error("Error searching contact types. Please try again.");
      setContacts([]);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }
    fetchAllContacts();
  }, [navigate]);

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
      <h3 className="mt-1">Contact Type</h3>

      {/* Search & Filters */}
      <Row className="align-items-center my-3 g-2">
       
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
      <div className="table-responsive">
        <Table striped bordered hover className="small w-200">
          <thead>
          <tr>
          <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Name</th>
          <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Slug</th>
          <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>User_ID</th>
          </tr>

          </thead>
          <tbody>
            {displayedContacts.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No contact types found</td>
              </tr>
            ) : (
              displayedContacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.contact_type}</td>
                  <td>{contact.slug}</td>
                  <td>{contact.user_id}</td>
                </tr>
              ))
            )}
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

export default ContactTypeList;
