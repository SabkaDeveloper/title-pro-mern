import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./OrderEntry.css";

const OrderEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    id: id || '',
    openDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    arrivalDate: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:mm
    dueDate: new Date().toISOString().slice(0, 16),
    address: '47 Bog Road, Apt G1',
    state: 'New Hampshire',
    county: 'Merrimack',
    city: 'Concord',
    zipCode: '0000',
    productType: 'Property Search',
    transactionType: 'Two Owner',
    workflowGroup: 'Online_TO_Plus',
    propertyType: '',
    dataSource: 'Online',
    abstractor: '',
    businessSource: '',
    otherPartner: '',
    otherSource: '',
    taxOffice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const response = await axios.post('http://localhost:4000/api/v1/order-entries', 
        order,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Save Response:', response.data);

      if (response.data.success) {
        toast.success("Order saved successfully!");
        navigate('/orders');
      } else {
        toast.error(response.data.message || "Failed to save order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error(error.response?.data?.message || "An error occurred while saving the order");
    }
  };

  return (
    <Container fluid className="order-entry-container">
      <h3 className="order-entry-title">Order Entry - {order.id}</h3>

      <Row className="order-entry-content">
        {/* Order Details - Left Section */}
        <Col md={6}>
          <Card className="order-section-card">
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Order Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="id" 
                    value={order.id} 
                    readOnly 
                  />
                </Col>
                <Col>
                  <Form.Label>Open Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="openDate"
                    value={order.openDate}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Arrival Date</Form.Label>
                  <Form.Control 
                    type="datetime-local" 
                    name="arrivalDate"
                    value={order.arrivalDate}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control 
                    type="datetime-local" 
                    name="dueDate"
                    value={order.dueDate}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="address"
                    value={order.address}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>State *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="state"
                    value={order.state}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter state"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>County *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="county"
                    value={order.county}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter county"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>City</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="city"
                    value={order.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="zipCode"
                    value={order.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter zip code"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Setup - Middle Section */}
        <Col md={3}>
          <Card className="order-section-card">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Product Type *</Form.Label>
                <Form.Select 
                  name="productType"
                  value={order.productType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Product Type</option>
                  <option value="Property Search">Property Search</option>
                  <option value="Title Search">Title Search</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Transaction Type *</Form.Label>
                <Form.Control type="text" value="Two Owner" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Workflow Group *</Form.Label>
                <Form.Control type="text" value="Online_TO_Plus" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Property Type</Form.Label>
                <Form.Control type="text" value="" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data Source *</Form.Label>
                <Form.Control type="text" value="Online" readOnly />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Partners - Right Section */}
        <Col md={3}>
          <Card className="order-section-card">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Abstractor</Form.Label>
                <Form.Control 
                  type="text" 
                  name="abstractor"
                  value={order.abstractor}
                  onChange={handleInputChange}
                  placeholder="Enter abstractor"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Business Source</Form.Label>
                <Form.Control type="text" value="" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Other Partner</Form.Label>
                <Form.Control type="text" value="" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Other Source</Form.Label>
                <Form.Control type="text" value="" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tax Office</Form.Label>
                <Form.Control type="text" value="" readOnly />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom Buttons */}
      <div className="order-entry-actions">
        <Button 
          variant="primary" 
          className="me-2" 
          onClick={handleSave}
        >
          Save
        </Button>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default OrderEntry;
