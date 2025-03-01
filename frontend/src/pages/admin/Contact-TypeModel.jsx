import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";

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
        toast.success(" Contact Type added successfully!", { autoClose: 1500 });
        reset();
      } else {
        console.error("Error adding contact type:", result.message);
        toast.error(` Error: ${data.message}`, { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(" An error occurred while creating the contact", {
        autoClose: 3000,
      });
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
        <Form.Label>Contact Type</Form.Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Contact Type is required' }} // validation rules
          render={({ field }) => (
            <Form.Control
              type="text"
              placeholder="Enter Contact Type"
              {...field}
            />
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