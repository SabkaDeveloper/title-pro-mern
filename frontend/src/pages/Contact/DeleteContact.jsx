import React, { useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeleteContact = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const contactsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(contacts.length / contactsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const startIndex = (activePage - 1) * contactsPerPage;
  const displayedContacts = contacts.slice(startIndex, startIndex + contactsPerPage);

  return (
    <Container fluid>
      <h3 className="mt-1">Contact List</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link active" onClick={() => navigate("/contacts")}>
            Active
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-muted" onClick={() => navigate("/deleted-contacts")}>
            Deleted
          </button>
        </li>
      </ul>


      {/* Contacts Table */}
      <div className="table-responsive mt-2">
        <Table striped bordered hover className="small w-200">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Invoice Terms</th>
              <th>Created By</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact, index) => (
              <tr key={index}>
                <td className="text-primary">{contact.name}</td>
                <td>{contact.type}</td>
                <td>{contact.address}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>Net 30</td>
                <td>{contact.name}</td>
                <td>{contact.created_at}</td>
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
    </Container>
  );
};

export default DeleteContact;
