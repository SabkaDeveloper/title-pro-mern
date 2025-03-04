import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateOrder.css'; // Custom CSS file for styling

const CreateOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/orders', data);
      if (response.data.success) {
        toast.success(`Order created successfully!`, { autoClose: 1500 });
        setModalShow(false);
      } else {
        toast.error(`Error: ${response.data.message}`, { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('An error occurred while creating the order.', { autoClose: 3000 });
    }
  };

  return (
    <>
      <Button onClick={() => setModalShow(true)} variant="primary" className="create-order-btn">
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
    <Modal show={show} onHide={onHide} size="md" centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Open New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="orderForm">
          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Controller name="customer" control={control} render={({ field }) => (
              <Form.Control type="text" placeholder="Customer" {...field} required />
            )} />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Controller name="state" control={control} render={({ field }) => (
                  <Form.Control type="text" placeholder="Enter State" {...field} required />
                )} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>County</Form.Label>
                <Controller name="county" control={control} render={({ field }) => (
                  <Form.Control type="text" placeholder="Enter county" {...field} required />
                )} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Product Type</Form.Label>
            <Controller name="productType" control={control} render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Product Type" {...field} required />
            )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Transaction Type</Form.Label>
            <Controller name="transactionType" control={control} render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Transaction Type" {...field} required />
            )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data Source</Form.Label>
            <Controller name="dataSource" control={control} render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Data Source" {...field} required />
            )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Workflow Group</Form.Label>
            <Controller name="workflowGroup" control={control} render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Workflow Group" {...field} required />
            )} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button type="submit" form="orderForm" className="custom-submit-btn">
          Create Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOrder;
