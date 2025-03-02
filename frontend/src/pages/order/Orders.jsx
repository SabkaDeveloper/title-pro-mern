import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaFilter, FaDownload, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import CreateOrder from "./CreateOrder";
import axios from "axios"; // Import Axios for API requests

const ContactList = () => {
  const navigate = useNavigate(); 
  const [activePage, setActivePage] = useState(1);
  const [orders, setOrders] = useState([]); // State to hold the fetched orders
  const contactsPerPage = 12;

  // Fetch orders from the API when the component mounts
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/orders');
      if (response.data && response.data.data) {
        setOrders(response.data.data); // Update the state with fetched orders
      } else {
        console.error("No orders found in the response.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts

    // Set up polling to fetch new orders every 10 seconds
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 10000); // Poll every 10 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once

  const totalPages = Math.ceil(orders.length / contactsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const handleAddClick = () => {
    navigate("/add-contact"); 
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
          <CreateOrder setOrders={setOrders} />
          <Button variant="primary"><FaPlus /></Button>
          <Button variant="primary"><FaFilter /></Button>
          <Button variant="primary"><FaDownload /></Button>
        </div>
      </div>

      <div className="table-responsive w-100">
        <Table striped bordered hover className="small w-100">
          <thead>
            <tr>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Arrival Date</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Delivery Date</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Order Number</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Customer</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Priority</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Transaction Type</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Data Source</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>State</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>County</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Active Workflow</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Assigned To</th>
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
    </div>
  );
};

export default ContactList;
