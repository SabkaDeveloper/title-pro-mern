import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container, Offcanvas, Button, Badge } from "react-bootstrap";
import { RiPieChartFill } from "react-icons/ri";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import { TbAbacus } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa6";
import { FaBars, FaChartBar, FaBell, FaCommentDots } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setOrder] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <BootstrapNavbar expand="lg" style={{ backgroundColor: "#03233d" }} variant="dark">
        <Container fluid>
          {/* Sidebar Toggle Button for Small Screens */}
          <Button
            variant="outline-light"
            className="d-lg-none"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </Button>

          <BootstrapNavbar.Brand href="/" style={{ fontWeight: "bold", color: "white", marginLeft: "10px" }}>
            Title Pro
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            {/* Left-side links (Visible only on large screens) */}
            <Nav className="me-auto d-none d-lg-flex ms-auto">
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
  className="nav-link"
  style={{
    color: "white",
    fontSize: "16px",
    padding: "10px 15px",
    position: "relative",
    display: "inline-block",
  }}
  onClick={() => {
    setSelectedItem(item.label);
    setOrder(true);
  }}
  >
  <span style={{ display: "inline-flex", alignItems: "center", position: "relative" }}>
    {item.icon}
    <span className="ms-1">{item.label}</span>
    {selectedItem === item.label && (
      <span
        style={{
          position: "absolute",
          bottom: "-15px",
          width: "100%",
          height: "3px",
          backgroundColor: "white",
          borderRadius: "2px",
        }}
      ></span>
    )}
  </span>
</NavLink>


              ))}
            </Nav>

            {/* Right-side icons */}
            <Nav className="d-flex align-items-center">
              <Nav.Link className="position-relative">
                <FaBell style={{ fontSize: "20px", color: "white", cursor: "pointer" }} />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "12px", padding: "4px 6px" }}
                >
                  99+
                </Badge>
              </Nav.Link>
              <Nav.Link className="mx-3">
                <FaCommentDots style={{ fontSize: "20px", color: "white", cursor: "pointer" }} />
              </Nav.Link>
              <Nav.Link
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "50%",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                DK
              </Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      {
        location.pathname !=="/orders" && 
        location.pathname !=="/contacts" && 
      <Sidebar order={order}/>
}
    </>
  );
};

export default Navbar;
