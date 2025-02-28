import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup, Spinner, Row, Col } from "react-bootstrap";
import { GrDocumentUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

const UpdateBtn = () => {
  const [inputValue, setInputValue] = useState("");
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      type: "business",
      address: "",
      city: "",
      county: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (contactData) {
      reset(contactData); // Ensure all fields get updated properly
    }
  }, [contactData, reset]);

  const fetchContactData = async () => {
    if (!inputValue) {
      toast.warning("Please enter a contact ID!", { position: "top-right" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${inputValue}`);
      const data = await response.json();

      if (response.ok) {
        setContactData(data.data);
        reset(data.data); // ✅ Ensure form fields are populated correctly
        setModalShow(true); // Open modal AFTER setting values
      } else {
        toast.error(`Error: ${data.message || "Contact not found"}`, { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to fetch contact. Please try again.", { position: "top-right" });
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  const handleUpdate = async (data) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/contacts/${inputValue}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (response.ok) {
        toast.success("Contact updated successfully!", { position: "top-right", autoClose: 1000 });
        setModalShow(false);
        setTimeout(() => {
          window.location.reload();
        }, 1002);
      } else {
        toast.error(`Error: ${resData.message || "Update failed"}`, { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to update contact. Please try again.", { position: "top-right" });
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <InputGroup className="mb-1">
        <Form.Control
          type="text"
          placeholder="Enter Contact ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ maxWidth: "150px" }}
        />
        <Button variant="primary" onClick={fetchContactData}>
          {loading ? <Spinner size="sm" animation="border" /> : "Update"}
        </Button>
      </InputGroup>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleUpdate)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Controller name="name" control={control} render={({ field }) => <Form.Control type="text" {...field} />} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Controller name="phone" control={control} render={({ field }) => <Form.Control type="text" {...field} />} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Controller name="email" control={control} render={({ field }) => <Form.Control type="email" {...field} />} />
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
          
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Controller name="address" control={control} render={({ field }) => <Form.Control type="text" {...field} />} />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Controller
                    name="city" // ✅ Correct field name
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
                    name="county" // ✅ Correct field name
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

            <Button type="submit" variant="success" className="mt-3">
              <GrDocumentUpdate /> Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateBtn;
