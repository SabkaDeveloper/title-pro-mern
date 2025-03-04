import React, { useState } from "react";
import { Button, OverlayTrigger, Popover, Form, InputGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const FilterBtn = ({ contact, onDeleteSuccess }) => {
  const navigate = useNavigate();

  // Add token utility function
  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const tokenData = JSON.parse(token);
      return tokenData.token || token;
    } catch {
      return token;
    }
  };

  const handleDelete = async (name) => {
    if (!name) {
      toast.error("Contact name is required!");
      return;
    }

    try {
      const token = getAuthToken();
      
      if (!token) {
        toast.error("Please login first!");
        navigate('/login');
        return;
      }

      // Confirm before deletion
      if (!window.confirm(`Are you sure you want to delete contact: ${name}?`)) {
        return;
      }

      console.log('Deleting contact with token:', token); // Debug log

      const response = await fetch(`http://localhost:4000/api/v1/contacts/${encodeURIComponent(name)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response status:', response.status); // Debug log

      if (response.status === 401) {
        localStorage.removeItem('token');
        toast.error("Session expired. Please login again.");
        navigate('/login');
        return;
      }

      const data = await response.json();
      console.log('Delete response data:', data); // Debug log

      if (response.ok) {
        toast.success("Contact deleted successfully!");
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } else {
        toast.error(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      toast.error("An error occurred while deleting the contact");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <FlyoutLink 
        onDeleteSuccess={handleDelete}
        contactName={contact?.name}
      >
        <MdDeleteForever /> Delete
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, onDeleteSuccess, contactName }) => {
  const [inputValue, setInputValue] = useState(contactName || "");
  const [showPopover, setShowPopover] = useState(false);

  const handleDelete = async () => {
    if (!inputValue) {
      toast.warning("Please enter a contact name to delete!", { position: "top-right" });
      return;
    }

    // Call the parent's delete handler
    if (typeof onDeleteSuccess === "function") {
      await onDeleteSuccess(inputValue);
    }
    
    setShowPopover(false); // Close popover
  };

  const popover = (
    <Popover id="flyout-popover">
      <Popover.Body>
        <FlyoutContent inputValue={inputValue} setInputValue={setInputValue} handleDelete={handleDelete} />
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      show={showPopover}
      onToggle={(isOpen) => setShowPopover(isOpen)}
    >
      <Button variant="primary" className="fw-bold">
        {children}
      </Button>
    </OverlayTrigger>
  );
};

const FlyoutContent = ({ inputValue, setInputValue, handleDelete }) => {
  return (
    <Form>
      <InputGroup className="mb-2">
        <Form.Control
          type="text"
          placeholder="Enter Contact Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="outline-danger" onClick={handleDelete}>
          <FaTrash />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FilterBtn;
