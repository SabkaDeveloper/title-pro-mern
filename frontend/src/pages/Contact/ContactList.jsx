import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import ContactModal from "./ContactModal"; 
import FilterBtn from "./FilterBtn";

const ContactList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
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

  const handleDeleteSuccess = (deletedContact) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.name !== deletedContact));
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

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const totalPages = Math.max(1, Math.ceil(contacts.length / contactsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const startIndex = (activePage - 1) * contactsPerPage;
  const displayedContacts = contacts.slice(startIndex, startIndex + contactsPerPage);

  // Handle contact update
  const handleContactUpdate = (updatedContact) => {
    // Update contact in the local state
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

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
          <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onContactAdded={newContact => setContacts(prev => [...prev, newContact])} />
        </Col>

        <Col xs={6} sm={3} md="auto">
        <FilterBtn onDeleteSuccess={handleDeleteSuccess} />
        </Col>
        {/* <Col xs={6} sm={3} md="auto">
          <UpdateBtn />
        </Col> */}
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
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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

export default ContactList;