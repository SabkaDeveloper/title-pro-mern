import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './Contact.css';

// Function to get auth token from localStorage
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

// Function to create a new contact
const createContact = async (contactData, onContactAdded) => {
  try {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please login first!", { autoClose: 3000 });
      window.location.href = '/login';
      return;
    }

    const response = await fetch('http://localhost:4000/api/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...contactData, user_id: localStorage.getItem('userId') || 5 }),
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      toast.error("Session expired. Please login again.", { autoClose: 3000 });
      window.location.href = '/login';
      return;
    }

    const data = await response.json();
    if (response.ok) {
      console.log("Created Contact:", data.data); // ✅ Logs created contact
      toast.success("Contact added successfully!", { autoClose: 1500 });
      onContactAdded && onContactAdded(data.data);
    } else {
      toast.error(data.errors ? `Validation Error: ${data.errors[0].msg}` : `Error: ${data.message}`, { autoClose: 3000 });
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    toast.error("An error occurred while creating the contact", { autoClose: 3000 });
  }
};


// Contact Modal Component
const ContactModal = ({ onContactAdded }) => {
  const [modalShow, setModalShow] = useState(false);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '', 
      phone: '', 
      email: '', 
      address: '', 
      city: '', 
      county: '', 
      type: 'business', 
      status: 'active'
    },
  });

  const onSubmit = (data) => {
    createContact(data, onContactAdded);
    setModalShow(false);
    reset();
  };

  return (
    <div>
      <Button className="create-contact-btn" onClick={() => setModalShow(true)}>
        <MdAddCircleOutline /> Add Contact
      </Button>

      <Modal show={modalShow} onHide={() => setModalShow(false)} size="md" centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {['name', 'phone', 'email', 'address'].map((field, index) => (
              <Form.Group key={index} controlId={`form${field}`} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)} </Form.Label>
                <Controller 
                  name={field} 
                  control={control} 
                  render={({ field: controllerField }) => (
                    <Form.Control 
                      type="text" 
                      placeholder={`Enter ${field}`} 
                      {...controllerField} 
                      required 
                    />
                  )} 
                />
              </Form.Group>
            ))}

            <Row>
              <Col md={6}>
                <Form.Group controlId="formCity" className="mb-3">
                  <Form.Label>City </Form.Label>
                  <Controller 
                    name="city" 
                    control={control} 
                    render={({ field }) => (
                      <Form.Control type="text" placeholder="Enter city" {...field} required />
                    )} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCounty" className="mb-3">
                  <Form.Label>County </Form.Label>
                  <Controller 
                    name="county" 
                    control={control} 
                    render={({ field }) => (
                      <Form.Control type="text" placeholder="Enter county" {...field} required />
                    )} 
                  />
                </Form.Group>
              </Col>
            </Row>

            {['type', 'status'].map((field, index) => (
              <Form.Group key={index} controlId={`form${field}`} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)} </Form.Label>
                <Controller 
                  name={field} 
                  control={control} 
                  render={({ field: controllerField }) => (
                    <Form.Control as="select" {...controllerField} required>
                      {field === 'type' ? (
                        <>
                          <option value="business">Business</option>
                          <option value="personal">Personal</option>
                        </>
                      ) : (
                        <>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </>
                      )}
                    </Form.Control>
                  )} 
                />
              </Form.Group>
            ))}

            <Button type="submit" className="custom-submit-btn w-100">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactModal;
