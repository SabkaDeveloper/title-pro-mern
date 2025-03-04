import React, { useState, useEffect } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getToken } from '../../utils/auth'; // Update the import path as needed

const DeleteContact = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const contactsPerPage = 10;

  useEffect(() => {
    const fetchDeletedContacts = async () => {
      try {
        const token = getToken();
        
        if (!token) {
          toast.error("Please login first!");
          navigate('/login');
          return;
        }

        console.log('Fetching deleted contacts with token:', token); // Debug log

        const response = await fetch("http://localhost:4000/api/v1/contacts/deleted", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status); // Debug log

        if (response.status === 401) {
          localStorage.removeItem('token');
          toast.error("Session expired. Please login again.");
          navigate('/login');
          return;
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log

        if (response.ok) {
          setContacts(Array.isArray(data.contacts) ? data.contacts : []);
        } else {
          toast.error(data.message || "Failed to fetch deleted contacts");
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching deleted contacts:", error);
        toast.error("An error occurred while fetching contacts");
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setContacts([]);
      }
    };
  
    fetchDeletedContacts();
  }, [navigate]); 

  // Check authentication before component renders
  useEffect(() => {
    const token = getToken(); // Use the imported getToken function
    if (!token) {
      toast.error("Please login to view deleted contacts");
      navigate('/login');
    }
  }, [navigate]);

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
      <h3 className="mt-1">Deleted Contacts</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs">
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
      <div className="table-responsive mt-2">
        <Table striped bordered hover className="small w-200">
          <thead>
            <tr>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Name</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Type</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Address</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Phone Number</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Email Address</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Invoice Terms</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Created By</th>
              <th style={{ backgroundColor: 'skyblue', fontWeight: '600', textAlign: 'center', fontStyle: 'inherit' }}>Created On</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No deleted contacts found</td>
              </tr>
            ) : (
              displayedContacts.map((contact, index) => (
                <tr key={index}>
                  <td className="text-primary">{contact.name}</td>
                  <td>{contact.type}</td>
                  <td>{contact.address}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td></td>
                  <td>{contact.created_by}</td>
                  <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {contacts.length > 0 && (
        <Pagination className="justify-content-center flex-wrap">
          <Pagination.Prev 
            disabled={activePage === 1} 
            onClick={() => handlePageChange(activePage - 1)} 
          />
          {[...Array(totalPages).keys()].slice(0, 5).map((page) => (
            <Pagination.Item 
              key={page} 
              active={page + 1 === activePage} 
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          {totalPages > 5 && <Pagination.Ellipsis />}
          <Pagination.Next 
            disabled={activePage === totalPages} 
            onClick={() => handlePageChange(activePage + 1)} 
          />
        </Pagination>
      )}
    </Container>
  );
};

export default DeleteContact;
