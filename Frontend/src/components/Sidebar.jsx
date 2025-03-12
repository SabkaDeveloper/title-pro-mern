import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { FaBars, FaHome, FaCog, FaUserFriends, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { PiClipboardText, PiNewspaperClippingThin, PiBooksLight } from "react-icons/pi";
import { BsDatabaseCheck } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { CiDollar } from "react-icons/ci";
import { SlNote } from "react-icons/sl";
import { LuFileSpreadsheet, LuClipboardPenLine, LuUsers } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiFileHistoryLine, RiListUnordered } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { GrUserSettings } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import { TiFlowChildren } from "react-icons/ti";
import { TbSettingsDollar } from "react-icons/tb";
import { LiaLayerGroupSolid } from "react-icons/lia";

const Sidebar = ({ order, isAdmin }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("Dashboard");
  const navigate = useNavigate();

  const orderMenuItems = [
    { label: "Order Summary", icon: <TfiLayoutGrid2 className="me-2" />, path: "/order-summary" },
    { label: "Order Entry", icon: <PiClipboardText className="me-2" />, path: "/order-entry" },
    { label: "Data Access", icon: <BsDatabaseCheck className="me-2" />, path: "/data-access" },
    { label: "Property Tax", icon: <PiNewspaperClippingThin className="me-2" />, path: "/property-tax" },
    { label: "Worksheet", icon: <LuFileSpreadsheet className="me-2" />, path: "/worksheet" },
    { label: "Tasks", icon: <FaTasks className="me-2" />, path: "/order-task" },
    { label: "Documents", icon: <HiOutlineDocumentText className="me-2" />, path: "/documents" },
    { label: "File History", icon: <RiFileHistoryLine className="me-2" />, path: "/file-history" },
    { label: "Recording", icon: <PiBooksLight className="me-2" />, path: "/recording" },
    { label: "Notes", icon: <SlNote className="me-2" />, path: "/notes" },
    { label: "Email", icon: <MdOutlineEmail className="me-2" />, path: "/email" },
    { label: "Accounting", icon: <CiDollar className="me-2" />, path: "/accounting" },
    { label: "Custom Fields", icon: <LuClipboardPenLine className="me-2" />, path: "/custom-fields" },
  ];

  const adminMenuItems = [
    { label: "Administrator", icon: <GrUserSettings className="me-2" />, path: "/admin/users" },
    { label: "Contacts", icon: <IoIosContact className="me-2" />, path: "/admin/settings" },
    { label: "Company", icon: <RiListUnordered className="me-2" />, path: "/admin/roles" },
    { label: "Users", icon: <LuUsers className="me-2" />, path: "/admin/logs" },
    { label: "Workflow", icon: <TiFlowChildren className="me-2" />, path: "/admin/logs" },
    { label: "Order Settings", icon: <TbSettingsDollar className="me-2" />, path: "/admin/logs" },
    { label: "Defaults", icon: <LiaLayerGroupSolid className="me-2" />, path: "/admin/logs" },
  ];

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div
        className="d-none d-lg-block"
        style={{
          width: "210px",
          height: "100vh",
          backgroundColor: "rgb(255, 255, 255)",
          color: "black",
          position: "fixed",
          top: "61.5px",
          left: "0",
          padding: "20px",
          overflowY: "auto",
          borderRight: "2px solid #ddd",
          marginLeft: "-10px"
        }}
      >
        <h5 style={{ color: "black", fontSize: "1.2rem" }} className="mb-2">
          {value}
        </h5>
        <hr style={{ borderTop: "2px solid rgb(1,1,1)" }} />

        <Nav className="flex-column">
          {isAdmin
            ? adminMenuItems.map((item, index) => (
                <Nav.Link key={index} onClick={() => { setValue(item.label); navigate(item.path); }} className="text-black text-start ps-1">
                  {item.icon}{item.label}
                </Nav.Link>
              ))
            : orderMenuItems.map((item, index) => (
                <Nav.Link key={index} onClick={() => { setValue(item.label); navigate(item.path); }} className="text-black text-start ps-1">
                  {item.icon}{item.label}
                </Nav.Link>
              ))}
        </Nav>
      </div>

      {/* Button to Open Sidebar on Small Screens */}
      <button className="d-lg-none btn btn-primary m-3" onClick={() => setShow(true)}>
        <FaBars /> Menu
      </button>

      {/* Offcanvas Sidebar for Small Screens */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => { setValue("Home"); navigate("/home"); setShow(false); }}>
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link onClick={() => { setValue("Analytics"); navigate("/analytics"); setShow(false); }}>
              <FaChartLine className="me-2" /> Analytics
            </Nav.Link>
            <Nav.Link onClick={() => { setValue("Users"); navigate("/users"); setShow(false); }}>
              <FaUserFriends className="me-2" /> Users
            </Nav.Link>

            {isAdmin
              ? adminMenuItems.map((item, index) => (
                  <Nav.Link key={index} onClick={() => { setValue(item.label); navigate(item.path); setShow(false); }}>
                    {item.icon}{item.label}
                  </Nav.Link>
                ))
              : orderMenuItems.map((item, index) => (
                  <Nav.Link key={index} onClick={() => { setValue(item.label); navigate(item.path); setShow(false); }}>
                    {item.icon}{item.label}
                  </Nav.Link>
                ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
