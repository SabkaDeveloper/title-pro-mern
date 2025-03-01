import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { MdAddCircleOutline } from "react-icons/md";

const ContactTypeModel = ({ isOpen, setIsOpen, onContactAdded }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      user_id: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/contact-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success) {
        // Add the new contact to the list
        onContactAdded(result.data);
        // Close modal and reset form
        setIsOpen(false);
        reset();
      } else {
        console.error("Error adding contact type:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
      <MdAddCircleOutline /> Add
      </Button>

      <Modal show={isOpen} onHide={() => setIsOpen(false)} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Controller 
                name="name" 
                control={control} 
                render={({ field }) => (
                  <Form.Control type="text" placeholder="Enter name" {...field} required />
                )} 
              />
            </Form.Group>

            <Form.Group controlId="formSlug" className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Controller 
                name="slug" 
                control={control} 
                render={({ field }) => (
                  <Form.Control type="text" placeholder="Enter slug" {...field} required />
                )} 
              />
            </Form.Group>

            <Form.Group controlId="formUserId" className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Controller 
                name="user_id" 
                control={control} 
                render={({ field }) => (
                  <Form.Control type="text" placeholder="Enter user ID" {...field} required />
                )} 
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="success" type="submit">
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