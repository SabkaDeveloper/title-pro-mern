import React, { useState } from "react";
import { Table, Pagination, Form, Button,InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaFilter, FaDownload, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

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
    { 
      arrival_date: "Jul 19, 2024 09:52 AM", 
      delivery_date: "", 
      order_number: "2024-0182099-NC", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Ground", 
      state: "NC", 
      county: "Mecklenburg", 
      active_workflow: "Abstract Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 19, 2024 03:38 PM", 
      delivery_date: "", 
      order_number: "2024-0182132-VA", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Legal and Vesting", 
      data_source: "Online", 
      state: "VA", 
      county: "Gloucester", 
      active_workflow: "Search Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 19, 2024 08:12 PM", 
      delivery_date: "Jul 22, 2024 04:12 PM", 
      order_number: "2024-0182162-VA", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Full", 
      data_source: "Online", 
      state: "VA", 
      county: "Bedford", 
      active_workflow: "Prioritize Search", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 09:55 AM", 
      delivery_date: "", 
      order_number: "2024-0182190-MO", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "MO", 
      county: "Jefferson", 
      active_workflow: "Search Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 10:43 AM", 
      delivery_date: "", 
      order_number: "2024-0182201-TN", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "TN", 
      county: "Shelby", 
      active_workflow: "Search Review", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 10:56 AM", 
      delivery_date: "", 
      order_number: "2024-0182203-TN", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "TN", 
      county: "Campbell", 
      active_workflow: "Search Processing", 
      assigned_to: "Document Processing" 
    },
    { 
      arrival_date: "Jul 22, 2024 12:15 PM", 
      delivery_date: "", 
      order_number: "2024-0182214-VA", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Full", 
      data_source: "Online", 
      state: "VA", 
      county: "Lynchburg", 
      active_workflow: "Document Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 01:24 PM", 
      delivery_date: "", 
      order_number: "2024-0182224-NJ", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "NJ", 
      county: "Monmouth", 
      active_workflow: "Document Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 02:19 PM", 
      delivery_date: "", 
      order_number: "2024-0182229-VA", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "VA", 
      county: "Hampton City", 
      active_workflow: "Search Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 04:12 PM", 
      delivery_date: "Jul 22, 2024 04:12 PM", 
      order_number: "2024-0182250-WV", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "WV", 
      county: "Jefferson", 
      active_workflow: "Search Processing", 
      assigned_to: "" 
    },
    { 
      arrival_date: "Jul 22, 2024 04:53 PM", 
      delivery_date: "", 
      order_number: "2024-0182256-MD", 
      customer: "[REDACTED]", 
      priority: "N", 
      transaction_type: "Current Owner", 
      data_source: "Online", 
      state: "MD", 
      county: "Queen Anne's", 
      active_workflow: "Document Processing", 
      assigned_to: "" 
    }
  ];

  const totalPages = Math.ceil(contacts.length / contactsPerPage); // ✅ Calculate total pages

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const handleAddClick = () => {
    navigate("/add-contact"); // ✅ Navigate to add contact page
  };

  // ✅ Slice contacts to display only 10 per page
  const startIndex = (activePage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const displayedContacts = contacts.slice(startIndex, endIndex);

  return (
    <div className="container-fluid p-0">

      {/* ✅ Search and Add Button */}
      <div className="d-flex align-items-center justify-content-between my-3">
      <h3 style={{ marginLeft: "-80px" }}>Orders</h3>
      <div style={{marginLeft: "620px"}}>
  <Form.Control type="text" placeholder="Order Number" style={{ maxWidth: "200px"  }} />
      </div>

  {/* Search Orders with Icon */}
  <InputGroup style={{ maxWidth: "250px"}}>
    <Form.Control type="text" placeholder="Search Orders" />
    <InputGroup.Text>
      <FaSearch />
    </InputGroup.Text>
  </InputGroup>

  {/* Buttons Section */}
  <div className="d-flex gap-2">
    {/* Create Order Button */}
    <Button variant="primary" className="d-flex align-items-center">
      <FaClipboardList className="me-2" />
      Create Order
    </Button>

    {/* Additional Buttons */}
    <Button variant="primary"><FaPlus /></Button>
    <Button variant="primary"><FaFilter /></Button>
    <Button style={{marginRight : "-100px"}} variant="primary"><FaDownload /></Button>
  </div>
</div>

      {/* ✅ Table with 10 contacts per page */}
      <div style={{ marginLeft: "-100px", marginRight: "-100px" }} className="table-responsive w-300">
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

      {/* ✅ Pagination */}
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

export default ContactList;
