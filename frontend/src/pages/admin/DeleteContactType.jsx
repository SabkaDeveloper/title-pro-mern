import React, { useState } from "react";
import { Button, OverlayTrigger, Popover, Form, InputGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";

const DeleteContactType = ({ onDeleteSuccess }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <FlyoutLink onDeleteSuccess={onDeleteSuccess}>
        <MdDeleteForever /> Delete
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, onDeleteSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const handleDelete = async () => {
    if (!inputValue) {
      toast.warning("Please enter a contact name to delete!", { position: "top-right" });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/contact-types/${inputValue}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Contact Type ${inputValue} deleted successfully!`, { position: "top-right" });

        // Call onDeleteSuccess to update the UI dynamically
        if (typeof onDeleteSuccess === "function") {
          onDeleteSuccess(inputValue);
        }

        setInputValue(""); // Clear input
        setShowPopover(false); // Close popover
      } else {
        toast.error(`Error: ${data.message || "Failed to delete contact"}`, { position: "top-right" });
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact. Please try again.", { position: "top-right" });
    }
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
          placeholder="Enter Contact Type ID"
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

export default DeleteContactType;
