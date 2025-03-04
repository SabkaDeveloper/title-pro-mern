import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiPieChartFill } from "react-icons/ri";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import { TbAbacus } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { FaUserShield, FaBars, FaChartBar, FaBell, FaCommentDots } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setOrder] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        {/* Sidebar Toggle Button for Small Screens */}
        <button className="lg:hidden " onClick={() => setShowSidebar(true)}>
          <FaBars size={24} />
        </button>        
        {/* Navbar Links (Hidden on Small Screens) */}
        <div className="hidden lg:flex space-x-6">
          {[
            { to: "/dashboard", icon: <RiPieChartFill />, label: "Dashboard" },
            { to: "/orders", icon: <GiCardboardBoxClosed />, label: "Orders" },
            { to: "/tasks", icon: <SiTicktick />, label: "Tasks" },
            { to: "/reports", icon: <FaChartBar />, label: "Reports" },
            { to: "/accounting", icon: <TbAbacus />, label: "Accounting" },
            { to: "/contacts", icon: <RiContactsLine />, label: "Contacts" },
            { to: "/admin", icon: <FaUserShield />, label: "Admin" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={`nav-link ${selectedItem === item.label ? 'selected' : ''}`}
              onClick={() => {
                setSelectedItem(item.label);
                setOrder(true);
              }}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right-side icons */}
        <div className="flex flex-row justify-between items-center space-x-4 right-icons ">
          <div className="relative cursor-pointer">
            <FaBell size={20} className="text-white" />
            {/* <span className="badge">99+</span> */}
          </div>
          <FaCommentDots size={20} className="text-white cursor-pointer" />
          <div className="user-icon">DK</div>
        </div>
      </nav>

      {/* Sidebar Component */}
      {!["/orders", "/contacts", "/deleted-contacts", "/contact-type"].includes(location.pathname) && (
        <Sidebar order={order} isAdmin={location.pathname === "/admin"} />
      )}
    </>
  );
};

export default Navbar;
