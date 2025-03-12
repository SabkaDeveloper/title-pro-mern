import React, { useState, useEffect } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeleteContact = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const contactsPerPage = 10;

  useEffect(() => {
    const fetchDeletedContacts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage (or any other method you use to store it)
  
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
  
        const response = await fetch("http://localhost:4000/api/v1/contacts/deleted", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request header
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
  
        // Ensure that data.contacts is an array, and update state
        setContacts(Array.isArray(data.contacts) ? data.contacts : []);
      } catch (error) {
        console.error("Error fetching deleted contacts:", error);
        setContacts([]); // Set an empty array on error
      }
    };
  
    fetchDeletedContacts();
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  
  

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
      <h4 className="mt-1" style={{transform:'translateX(-105px)'}}>Deleted Contact</h4>

      {/* Tabs */}
      <ul className="nav nav-tabs flex-grow-1" style={{transform:'translateX(-120px)', width:"119%"}}>
        <li className="nav-item">
          <button className="nav-link text-muted" onClick={() => navigate("/contacts")}>
            Active
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => navigate("/deleted-contacts")}>
            Deleted
          </button>
        </li>
      </ul>

      {/* Contacts Table */}
      <div className="table-responsive w-200 mt-2" style={{ width: "1516px", transform : 'translate(-120px)' }}>
      <Table striped bordered hover className="small w-200 mb-3">
          <thead>
          <tr>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Name</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Type</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Address</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Phone Number</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Email Address</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Invoice Terms</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Created By</th>
          <th className="bg-info bg-gradient fw-semibold text-white text-center fst-normal">Created On</th>
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
                <td></td>
                <td>{contact.created_by}</td>
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
