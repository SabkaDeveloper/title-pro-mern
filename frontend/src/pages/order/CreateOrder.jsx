import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaClipboardList } from 'react-icons/fa';
import axios from 'axios';  
import { toast } from 'react-toastify'; 
import './CreateOrder.css'
const CreateOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/orders', {
        customer: data.customer,
        state: data.state,
        county: data.county,
        product_type: data.productType,
        transaction_type: data.transactionType,
        data_source: data.dataSource,
        workflow_group: data.workflowGroup,
      });
  
      if (response.data.success) {
        const orderData = response.data.data;
        toast.success(`Order created successfully! ID: ${orderData.id} - ${orderData.customer}`, { autoClose: 1500 });
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
      <Button 
        onClick={() => setModalShow(true)} 
        variant="primary" 
        className="create-order-btn"
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
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Open New Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formCustomer">
            <Form.Label className='mb-0'>Customer</Form.Label>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <Form.Control type="text" placeholder="Customer" {...field} required />
              )}
            />
          </Form.Group>
          
          <Row className='mt-2'>
            <Col md={6}>
              <Form.Group controlId="formState">
                <Form.Label className='mb-0'>State</Form.Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="text" placeholder="Enter State" {...field} required />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCounty">
                <Form.Label className='mb-0'>County</Form.Label>
                <Controller
                  name="county"
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="text" placeholder="Enter County" {...field} required />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group controlId="formProductType" className='mt-2'>
            <Form.Label className='mb-0'>Product Type</Form.Label>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <Form.Control type="text" placeholder="Enter Product Type" {...field} required />
              )}
            />
          </Form.Group>
          
          <Form.Group controlId="formTransactionType" className='mt-2'>
            <Form.Label className='mb-0'>Transaction Type</Form.Label>
            <Controller
              name="transactionType"
              control={control}
              render={({ field }) => (
                <Form.Control type="text" placeholder="Enter Transaction Type" {...field} required />
              )}
            />
          </Form.Group>
          
          <Form.Group controlId="formDataSource" className='mt-2'>
            <Form.Label className='mb-0'>Data Source</Form.Label>
            <Controller
              name="dataSource"
              control={control}
              render={({ field }) => (
                <Form.Control type="text" placeholder="Enter Data Source" {...field} required />
              )}
            />
          </Form.Group>
          
          <Form.Group controlId="formWorkflowGroup" className='mt-2'>
            <Form.Label className='mb-0'>Workflow Group</Form.Label>
            <Controller
              name="workflowGroup"
              control={control}
              render={({ field }) => (
                <Form.Control type="text" placeholder="Enter Workflow Group" {...field} required />
              )}
            />
          </Form.Group>
          
          <Button style={{ marginTop: '10px' }} variant="success" type="submit" className="custom-submit-btn">
            Create Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrder;
