import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaFilter, FaDownload } from "react-icons/fa";
import axios from "axios";
import CreateOrder from "./CreateOrder";

const ContactList = () => {
  const [activePage, setActivePage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  const contactsPerPage = 12;

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/orders');
      if (response.data && response.data.data) {
        setOrders(response.data.data);
      } else {
        console.error("No orders found in the response.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const totalPages = Math.ceil(orders.length / contactsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const startIndex = (activePage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const displayedOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex flex-wrap align-items-center justify-content-between my-3 gap-2">
        <h3 className="flex-grow-1">Orders</h3>
        <Form.Control type="text" placeholder="Order Number" className="search-bar" style={{ maxWidth: "200px" }} />
        <InputGroup className="search-bar" style={{ maxWidth: "250px" }}>
          <Form.Control type="text" placeholder="Search Orders" />
          <InputGroup.Text><FaSearch /></InputGroup.Text>
        </InputGroup>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Button variant="success" onClick={() => setShowCreateOrderModal(true)}>
            <FaPlus /> Create Order
          </Button>
          <Button variant="primary"><FaFilter /></Button>
          <Button variant="primary"><FaDownload /></Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-responsive w-100">
        <Table striped bordered hover className="small w-100">
          <thead>
            <tr>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Arrival Date</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Delivery Date</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Order Number</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Customer</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Priority</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Transaction Type</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Data Source</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>State</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>County</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Active Workflow</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center' }}>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.created_at}</td>
                <td></td>
                <td className="text-primary">{order.id}</td>
                <td>{order.customer}</td>
                <td></td>
                <td>{order.transaction_type}</td>
                <td>{order.data_source}</td>
                <td>{order.state}</td>
                <td>{order.county}</td>
                <td>{order.workflow_group}</td>
                <td>{order.assigned_to}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="justify-content-center flex-wrap">
        <Pagination.Prev disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} />
        {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
          <Pagination.Item key={page} active={page + 1 === activePage} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
        {totalPages > 5 && <Pagination.Ellipsis />}
        <Pagination.Next disabled={activePage === totalPages} onClick={() => handlePageChange(activePage + 1)} />
      </Pagination>

      {/* Create Order Modal */}
      <Modal show={showCreateOrderModal} onHide={() => setShowCreateOrderModal(false)} size="lg">
        <Modal.Body>
          <CreateOrder onClose={() => setShowCreateOrderModal(false)} setOrders={setOrders} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactList;
