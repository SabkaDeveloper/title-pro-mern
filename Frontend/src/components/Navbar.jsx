"use client"

import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Navbar as BootstrapNavbar, Nav, Container, Offcanvas, Button, Badge } from "react-bootstrap"
import { RiPieChartFill } from "react-icons/ri"
import { GiCardboardBoxClosed } from "react-icons/gi"
import { SiTicktick } from "react-icons/si"
import { TbAbacus } from "react-icons/tb"
import { RiContactsLine } from "react-icons/ri"
import { FaUserShield } from "react-icons/fa6"
import { FaBars, FaChartBar, FaBell, FaCommentDots } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from "./Sidebar"

const Navbar = () => {
  const location = useLocation()
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [order, setOrder] = useState(false)

  // Handle mobile menu
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const handleCloseOffcanvas = () => setShowOffcanvas(false)
  const handleShowOffcanvas = () => setShowOffcanvas(true)

  return (
    <>
      {/* Top Navbar */}
      <BootstrapNavbar
        expand="lg"
        style={{ backgroundColor: "#03233d", position: "sticky", top: 0, zIndex: 1030 }}
        variant="dark"
        className="py-2"
      >
        <Container fluid className="px-2 px-sm-3">
          {/* Sidebar Toggle Button for Small Screens */}
          <Button
            variant="outline-light"
            className="d-lg-none me-2"
            onClick={handleShowOffcanvas}
            style={{ padding: "0.4rem 0.6rem" }}
          >
            <FaBars />
          </Button>

          <BootstrapNavbar.Brand
            href="/"
            style={{ fontWeight: "bold", color: "white", marginLeft: "10px" }}
            className="me-auto me-lg-0"
          >
            Title Pro
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto d-lg-none" />
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
                  className={`nav-link ${selectedItem === item.label || location.pathname.startsWith(item.to) ? "active-link" : ""}`}
                  style={{
                    color: location.pathname === item.to ? "#1C96D3" : "white", // Dark blue when active
                    fontSize: "16px",
                    padding: "10px 15px",
                    position: "relative",
                    display: "inline-block",
                  }}
                  onClick={() => {
                    setSelectedItem(item.label)
                    setOrder(true)
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", position: "relative" }}>
                    {item.icon}
                    <span className="ms-1">{item.label}</span>
                    {(selectedItem === item.label || location.pathname === item.to) && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-15px",
                          left: 0,
                          width: "105%",
                          height: "3px",
                          backgroundColor: "#1C96D3",
                          borderRadius: "2px",
                        }}
                      ></span>
                    )}
                  </span>
                </NavLink>
              ))}
            </Nav>

            {/* Right-side icons */}
            <Nav className="d-flex align-items-center ms-auto">
              <Nav.Link className="position-relative px-2">
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
              <Nav.Link className="mx-2 px-1">
                <FaCommentDots style={{ fontSize: "20px", color: "white", cursor: "pointer" }} />
              </Nav.Link>
              <Nav.Link
                className="d-flex align-items-center justify-content-center ms-1"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "gray",
                  color: "white",
                  borderRadius: "50%",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: 0,
                }}
              >
                DK
              </Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      {/* Mobile Off-canvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        placement="start"
        style={{ backgroundColor: "#03233d", maxWidth: "280px" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title style={{ color: "white", fontWeight: "bold" }}>Title Pro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
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
                className={`nav-link ${location.pathname === item.to ? "active" : ""}`}
                style={{
                  color: "white",
                  padding: "12px 20px",
                  borderLeft: location.pathname === item.to ? "3px solid white" : "none",
                  backgroundColor: location.pathname === item.to ? "rgba(255,255,255,0.1)" : "transparent",
                }}
                onClick={() => {
                  setSelectedItem(item.label)
                  setOrder(true)
                  handleCloseOffcanvas()
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </span>
              </NavLink>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {location.pathname !== "/orders" &&
        location.pathname !== "/contacts" &&
        location.pathname !== "/deleted-contacts" &&
        location.pathname !== "/contact-type" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/reports" &&
        location.pathname !== "/tasks" &&
        location.pathname !== "/accounting" && <Sidebar order={order} isAdmin={location.pathname === "/admin"} />}
    </>
  )
}

export default Navbar

