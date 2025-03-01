import React, { useState } from "react";
import { Table, Pagination, Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaFilter, FaDownload, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import CreateOrder from "./CreateOrder";

const ContactList = () => {
  const navigate = useNavigate(); 
  const [activePage, setActivePage] = useState(1);
  const contactsPerPage = 12; 

  const contacts = [
    { 
      arrival_date: "Jul 12, 2024 09:01 AM", 
      delivery_date: "", 
      order_number: "2024-0181563-NE", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Full", 
      data_source: "Online", 
      state: "NE", 
      county: "Cass", 
      active_workflow: "Abstract Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 17, 2024 10:46 AM", 
      delivery_date: "", 
      order_number: "2024-0181827-NC", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Document Retrieval", 
      data_source: "Ground", 
      state: "NC", 
      county: "Gaston", 
      active_workflow: "Document Review", 
      assigned_to: "" 
    },
  ];

  const totalPages = Math.ceil(contacts.length / contactsPerPage);

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
  const displayedContacts = contacts.slice(startIndex, endIndex);

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
            <CreateOrder/>
          <Button variant="primary"><FaPlus /></Button>
          <Button variant="primary"><FaFilter /></Button>
          <Button variant="primary"><FaDownload /></Button>
        </div>
      </div>

      <div className="table-responsive w-100">
        <Table striped bordered hover className="small w-100">
          <thead>
            <tr>
              <th>Arrival Date</th>
              <th>Delivery Date</th>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Priority</th>
              <th>Transaction Type</th>
              <th>Data Source</th>
              <th>State</th>
              <th>County</th>
              <th>Active Workflow</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.arrival_date}</td>
                <td>{contact.delivery_date}</td>
                <td className="text-primary">{contact.order_number}</td>
                <td>{contact.customer}</td>
                <td>{contact.priority}</td>
                <td>{contact.transaction_type}</td>
                <td>{contact.data_source}</td>
                <td>{contact.state}</td>
                <td>{contact.county}</td>
                <td>{contact.active_workflow}</td>
                <td>{contact.assigned_to}</td>
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
