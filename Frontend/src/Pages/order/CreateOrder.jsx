import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaClipboardList } from 'react-icons/fa';
import axios from 'axios';  
import { toast } from 'react-toastify'; 

const CreateOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No token found, please log in.");
        toast.error("No token found, please log in.", { autoClose: 3000 });
        return false;
      }

      // Send POST request to API using Axios
      const response = await axios.post('http://localhost:4000/api/v1/orders', {
        customer: data.customer,
        state: data.state,
        county: data.county,
        product_type: data.productType,
        transaction_type: data.transactionType,
        data_source: data.dataSource,
        workflow_group: data.workflowGroup,
      } , {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add the token here
        },
      });
  
      // Check if the response indicates success
      if (response.data.success) {
        // Order was successfully created, show success message
        const orderData = response.data.data;
  
        toast.success(`Order created successfully! ID: ${orderData.id} - ${orderData.customer}`, { autoClose: 1500 });
        setModalShow(false); // Close modal after successful submission

          } else {
        // Handle error case from API response
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
        className="d-flex align-items-center bg-info bg-gradient fw-semibold text-white border-0"
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
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='h6'>
          Open New Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{transform: 'translateY(-10px)', height: '490px'}}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label className='mb-0'>Customer</Form.Label>
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
              <Form.Group controlId="formState" className='mt-2'>
                <Form.Label className='mb-0'>State</Form.Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      type="text"
                      placeholder="Enter State"
                      {...field}
                      required
                    />
                  )}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formCounty" className='mt-2'>
                <Form.Label className='mb-0'>County</Form.Label>
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

          <Form.Group controlId="formProductType" className='mt-2'>
            <Form.Label className='mb-0'>Product Type</Form.Label>
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

          <Form.Group controlId="formTransactionType" className='mt-2'>
            <Form.Label className='mb-0'>Transaction Type</Form.Label>
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

          <Form.Group controlId="formDataSource" className='mt-2'>
            <Form.Label className='mb-0'>Data Source</Form.Label>
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

          <Form.Group controlId="formWorkflowGroup" className='mt-2'>
            <Form.Label className='mb-0'>Workflow Group</Form.Label>
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
             
              <Modal.Footer>
          <Button className="bg-info"  type="submit">
            Create Order
          </Button>
              </Modal.Footer>
             
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrder;
