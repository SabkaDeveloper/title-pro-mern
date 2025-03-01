import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaClipboardList } from 'react-icons/fa';

const CreateOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setModalShow(false);
  };

  return (
    <>
      <Button 
        onClick={() => setModalShow(true)} 
        variant="primary" 
        className="d-flex align-items-center"
      >
        <FaClipboardList className="me-2" /> Create Order
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </>
  );
};

const MyVerticallyCenteredModal = ({ show, onHide, control, handleSubmit, onSubmit }) => {
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
          Open New Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Customer</Form.Label>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Customer"
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
                  name="city"
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
                  name="county"
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

          <Form.Group controlId="formProductType">
            <Form.Label>Product Type</Form.Label>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter Product Type"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="formTransactionType">
            <Form.Label>Transaction Type</Form.Label>
            <Controller
              name="transactionType"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter Transaction Type"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="formDataSource">
            <Form.Label>Data Source</Form.Label>
            <Controller
              name="dataSource"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter Data Source"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="formWorkflowGroup">
            <Form.Label>Workflow Group</Form.Label>
            <Controller
              name="workflowGroup"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  placeholder="Enter Workflow Group"
                  {...field}
                  required
                />
              )}
            />
          </Form.Group>

          <Button style={{marginTop: "10px"}} variant="success" type="submit">
            Create Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrder;