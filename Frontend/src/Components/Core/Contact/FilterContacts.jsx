// ContactFilter.js
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const ContactFilter = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = () => {
    onFilterChange(filterType, filterValue);
  };

  return (
    <div className="flex items-center space-x-2 border p-2 rounded">
      <select
        className="border p-1 rounded"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="city">City</option>
      </select>
      <input
        type="text"
        placeholder="Filter value..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="border p-1 rounded"
      />
      <button
        onClick={handleFilterChange}
        className="bg-blue-500 text-white p-2 rounded"
      >
        <FaFilter />
      </button>
    </div>
  );
};

export default ContactFilter;
