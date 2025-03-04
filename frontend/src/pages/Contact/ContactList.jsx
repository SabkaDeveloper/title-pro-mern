import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import ContactModal from "./ContactModal"; 
import FilterBtn from "./FilterBtn";
import { toast } from "react-hot-toast";
import './ContactList.css'
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

const ContactList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const contactsPerPage = 10;
  
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      type: "business",
      address: "",
      city: "",
      county: "",
      status: "active"
    }
  });

  const onSubmit = async (data) => {
    // Handle form submission
    console.log("Form data:", data);
    
    // Close modal after submission
    setShowModal(false);
    
    // Reset form
    reset();
  };
  
  // Fetch all contacts
  const fetchAllContacts = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        console.log('No token found');
        navigate('/login');
        return;
      }

      console.log('Fetching contacts with token:', token); // Debug log

      const response = await fetch("http://localhost:4000/api/v1/contacts", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status); // Debug log

      if (response.status === 401) {
        console.log('Unauthorized access');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await response.json();
      console.log('Fetched data:', data); // Debug log

      // Don't clear contacts if the response is empty or invalid
      if (!data) {
        console.error('Empty response from server');
        return;
      }

      // Check for different possible data structures
      let contactsArray = [];
      if (data.contacts) {
        contactsArray = data.contacts;
      } else if (data.data) {
        contactsArray = Array.isArray(data.data) ? data.data : [data.data];
      } else if (Array.isArray(data)) {
        contactsArray = data;
      }

      // Only update state if we have contacts
      if (contactsArray.length > 0) {
        setContacts(contactsArray);
        setFilteredContacts(contactsArray);
        console.log('Contacts set:', contactsArray); // Debug log
      } else {
        console.log('No contacts found in response');
        // Don't clear existing contacts if the response is empty
        // Only clear if explicitly told by the API that there are no contacts
        if (response.ok && data.success === false) {
          setContacts([]);
          setFilteredContacts([]);
        }
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      // Don't clear contacts on error, just show error message
      toast.error("Error fetching contacts. Please try again later.");
    }
  };

  const handleDeleteSuccess = (deletedContact) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter((contact) => contact.name !== deletedContact);
      setFilteredContacts(updatedContacts); // Update filtered contacts as well
      return updatedContacts;
    });
  };

  // Fetch contacts by search term
  const fetchContactsBySearch = async (searchTerm) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      if (!searchTerm.trim()) {
        // Don't fetch all contacts, just reset filters
        setFilteredContacts(contacts);
        return;
      }

      const url = isNaN(searchTerm)
        ? `http://localhost:4000/api/v1/contacts/${encodeURIComponent(searchTerm)}`
        : `http://localhost:4000/api/v1/contacts/${searchTerm}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        const searchResults = Array.isArray(data.contacts) ? data.contacts : 
                            Array.isArray(data.data) ? data.data : 
                            [data.data].filter(Boolean);
        
        // Only update filtered contacts, keep original contacts intact
        setFilteredContacts(searchResults);
      } else {
        // Show no results but keep original contacts
        setFilteredContacts([]);
        toast.info("No contacts found matching your search.");
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
      toast.error("Error searching contacts. Please try again.");
      // Don't clear contacts on error
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Only fetch if contacts array is empty
    if (contacts.length === 0) {
      console.log('Component mounted, fetching contacts...'); // Debug log
      fetchAllContacts();
    }
  }, [navigate]); // Remove contacts from dependency array

  // Add this debug useEffect
  useEffect(() => {
    console.log('Current contacts state:', contacts);
    console.log('Current filtered contacts:', filteredContacts);
  }, [contacts, filteredContacts]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredContacts(filtered);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / contactsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const startIndex = (activePage - 1) * contactsPerPage;
  const displayedContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage);

  // Handle contact update
  const handleContactUpdate = (updatedContact) => {
    // Update contact in the local state
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setFilteredContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  return (
    <Container fluid className="w-full" >
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
            <Button variant="outline-secondary" onClick={() => fetchContactsBySearch(searchTerm)}>
              <FaSearch />
            </Button>
          </div>
        </Col>

        <Col xs={6} sm={3} md="auto">
          <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onContactAdded={newContact => setContacts(prev => [...prev, newContact])} />
        </Col>

        <Col xs={6} sm={3} md="auto">
          <FilterBtn 
            contact={selectedContact}
            onDeleteSuccess={handleDeleteSuccess}
            onSearch={handleSearch}
          />
        </Col>
        {/* <Col xs={6} sm={3} md="auto">
          <UpdateBtn />
        </Col> */}
      </Row>

      {/* Contacts Table */}
      <div className="table-responsive" style={{ overflowX: 'auto' }}>
        <Table 
          striped 
          bordered 
          hover 
          className="small" 
          style={{ minWidth: '1200px' }}
        >
          <thead>
                <tr>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Name</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Type</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Address</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Phone Number</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Email Address</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Invoice Terms</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Created By</th>
        <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Created On</th>
      </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact, index) => (
              <tr key={index}>
                <td 
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleContactClick(contact)}
                >
                  {contact.name}
                </td>
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

      {/* Bootstrap Modal */}
      <MyVerticallyCenteredModal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        contact={selectedContact}
        onContactUpdated={handleContactUpdate}
        size="lg"
      />

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

// Bootstrap Modal Component
const MyVerticallyCenteredModal = ({ show, onHide, contact, onContactUpdated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      type: "business",
      address: "",
      county: "",
      city: "",
      status: "active"
    }
  });

  // Update form values when contact changes
  useEffect(() => {
    if (contact) {
      setValue("name", contact.name || "");
      setValue("phone", contact.phone || "");
      setValue("email", contact.email || "");
      setValue("type", contact.type || "business");
      setValue("address", contact.address || "");
      setValue("county", contact.county || "");
      setValue("city", contact.city || "");
      setValue("status", contact.status || "active");
    }
  }, [contact, setValue]);

  const onSubmit = async (data) => {
    // Clear any previous error
    setErrorMessage('');
    setIsSubmitting(true);
    
    try {
      // Use the contact name as the inputValue for the API endpoint
      const inputValue = contact.email;
      
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${inputValue}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to update contact");
      }
      
      console.log("Update successful:", result);
      
      // If successful, update the contact in the parent component
      if (onContactUpdated && result.data) {
        onContactUpdated(result.data);
      }
      
      // Close modal after successful submission
      onHide();
      reset();
    } catch (error) {
      console.error("Error updating contact:", error);
      setErrorMessage(error.message || "An error occurred while updating the contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {contact ? `Edit Contact: ${contact.name}` : "Add Contact"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Form.Control as="select" {...field}>
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                </Form.Control>
              )}
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Controller
                  name="county"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      {...field}
                      required
                    />
                  )}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formCounty">
                <Form.Label>County</Form.Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Enter county"
                      {...field}
                      required
                    />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Form.Control as="select" {...field}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Control>
              )}
            />
          </Form.Group>

          <Button 
            style={{marginTop: "10px"}} 
            variant="success" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Contact"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Add this CSS either in your component or in a separate CSS file
const styles = `
  .modal-90w {
    min-width: 100%;
    max-width: 1200px;
  }

  .table-responsive {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .form-group {
    margin-bottom: 1rem;
  }
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ContactList;