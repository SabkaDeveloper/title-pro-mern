import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaFilter, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateOrder from "./CreateOrder";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Order.css";

const OrdersList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [orders, setOrders] = useState([]);
  const contactsPerPage = 12;

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/orders");
      if (response.data && response.data.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const totalPages = Math.ceil(orders.length / contactsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setActivePage(page);
  };

  const displayedOrders = orders.slice(
    (activePage - 1) * contactsPerPage,
    activePage * contactsPerPage
  );

  return (
    <div className="container-fluid p-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between my-3">
        <h3>Orders</h3>
        <Form.Control type="text" placeholder="Order Number" className="search-bar" />
        <InputGroup className="search-bar">
          <Form.Control type="text" placeholder="Search Orders" />
          <InputGroup.Text><FaSearch /></InputGroup.Text>
        </InputGroup>
        <div className="d-flex gap-2">
          <CreateOrder setOrders={setOrders} />
          <Button variant="primary"><FaPlus /></Button>
          <Button variant="primary"><FaFilter /></Button>
          <Button variant="primary"><FaDownload /></Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              {[
                "Arrival Date", "Delivery Date", "Order Number", "Customer", "Priority", 
                "Transaction Type", "Data Source", "State", "County", "Active Workflow", "Assigned To"
              ].map((header, index) => (
                <th key={index} className="table-header">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.created_at}</td>
                <td></td>
                <td className="text-primary clickable" onClick={() => navigate(`/order-entry/${order.id}`)}>
                  {order.id}
                </td>
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

      <Pagination className="justify-content-center">
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

export default OrdersList;
