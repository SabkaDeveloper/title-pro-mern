import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

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

const ContactTypeModel = ({ isOpen, setIsOpen, onContactAdded }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      contact_type: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        toast.error("Please login first!");
        navigate('/login');
        return;
      }

      console.log('Submitting with token:', token); // Debug log

      const response = await fetch("http://localhost:4000/api/v1/contact-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status); // Debug log

      if (response.status === 401) {
        localStorage.removeItem('token');
        toast.error("Session expired. Please login again.");
        navigate('/login');
        return;
      }

      const result = await response.json();
      console.log('Response data:', result); // Debug log

      if (result.success) {
        // Add the new contact to the list
        if (onContactAdded) {
          onContactAdded(result.data);
        }
        // Close modal and reset form
        setIsOpen(false);
        toast.success("Contact Type added successfully!");
        reset();
      } else {
        console.error("Error adding contact type:", result.message);
        toast.error(result.message || "Failed to add contact type");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error("Session expired. Please login again.");
        navigate('/login');
      } else {
        toast.error("An error occurred while creating the contact type");
      }
    }
  };

  // Check authentication when opening modal
  const handleOpen = () => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Please login first!");
      navigate('/login');
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        <MdAddCircleOutline /> Add
      </Button>

      <Modal 
        show={isOpen} 
        onHide={() => setIsOpen(false)} 
        size="sm" 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Contact Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formContactType" className="mb-3">
              <Form.Label>Contact Type</Form.Label>
              <Controller
                name="contact_type"
                control={control}
                rules={{ 
                  required: "Contact Type is required",
                  minLength: {
                    value: 2,
                    message: "Contact Type must be at least 2 characters"
                  }
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Form.Control
                      type="text"
                      placeholder="Enter Contact Type"
                      isInvalid={!!error}
                      {...field}
                    />
                    {error && (
                      <Form.Control.Feedback type="invalid">
                        {error.message}
                      </Form.Control.Feedback>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <div className="d-grid">
              <Button 
                variant="success" 
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactTypeModel;
