import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Function for sending POST request to create contact
const createContact = async (contactData) => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    if (response.ok) {
        toast.success(" Contact added successfully!", { autoClose: 1500 });
        setTimeout(() => {
            window.location.reload();
          }, 1600);
        return true;
      } else {
        toast.error(` Error: ${data.message}`, { autoClose: 3000 });
        return false;
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      toast.error(" An error occurred while creating the contact", {
        autoClose: 3000,
      });
      return false;
    }
  };

function ContactModal() {
  const [modalShow, setModalShow] = useState(false);
  
  // Initialize react-hook-form
  const { handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      type: 'business',
      address: '',
      city: '',
      county: '',
      status: 'active',
      user_id: 5, // Example user_id
    },
  });


  // Handle form submission
  const onSubmit = (data) => {
    createContact(data); // Call the API with form data
    setModalShow(false); // Close modal after submission
    reset(); // Optionally reset form fields after submission
  };

  const MyVerticallyCenteredModal = ({ show, onHide }) => {
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

            <Button style={{marginTop: "10px"}} variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <div className='fw-bold'> 
      <MdAddCircleOutline /> Add
        </div>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default ContactModal;
