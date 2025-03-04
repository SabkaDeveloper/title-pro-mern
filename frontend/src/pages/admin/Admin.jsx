import React from "react";
import { GrUserSettings } from "react-icons/gr";
import { IoIosArrowForward, IoIosContact } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { RiListUnordered } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import { TbSettingsDollar } from "react-icons/tb";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Administrator",
      icon: <GrUserSettings className="me-2" />,
      items: ["User Permissions", "Data Access", "Allowed IP Address"],
    },
    {
      title: "Contacts",
      icon: <IoIosContact className="me-2" />,
      items: ["Contact Type"],
    },
    {
      title: "System Settings",
      icon: <RiListUnordered className="me-2" />,
      items: ["Smart Tag Setup", "Lookup List"],
    },
    {
      title: "Company",
      icon: <RiListUnordered className="me-2" />,
      items: ["Company", "Order Number", "Invoice Number", "Customer Fee Schedule"],
    },
    {
      title: "Users",
      icon: <LuUsers className="me-2" />,
      items: [
        "User List",
        "Lite User List",
        "Permission Groups",
        "Task Groups",
        "User Non-Availability",
        "User Task Reassign",
      ],
    },
    {
      title: "Workflow",
      icon: <TiFlowChildren className="me-2" />,
      items: ["Workflow Groups"],
    },
    {
      title: "Order Settings",
      icon: <TbSettingsDollar className="me-2" />,
      items: [
        "Transaction Types",
        "Order Templates",
        "Custom Documents",
        "Email Template",
        "SQSearch Bot",
      ],
    },
    {
      title: "Defaults",
      icon: <LiaLayerGroupSolid className="me-2" />,
      items: ["Contact Fee Schedule", "Contact Workflow Groups", "Contact Guidance"],
    },
  ];

  return (
    <div className="container-fluid mt-4" style={{ transform: "translateX(-50px)" }}>

      <h3 className="mb-4 fw-bold">Admin Overview</h3>
      <div className="row">
        {sections.map((section, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card border-0 shadow-sm">
              {/* Card Header */}
              <div className="card-header text-dark fw-bold d-flex align-items-center" style={{ backgroundColor: "#E3F2FD" }}>
                {section.icon} {section.title}
              </div>

              {/* Card Body */}
              <div className="card-body p-3">
                <ul className="list-unstyled">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <button
                        className="btn w-100 text-start text-dark d-flex justify-content-between align-items-center px-2 py-2"
                        style={{ background: "transparent", border: "none", fontSize: "14px", cursor: "pointer" }}
                        onClick={() => {
                          if (item === "Contact Type") navigate("/contact-type");
                        }}
                      >
                        {item}
                        <IoIosArrowForward className="text-muted" />
                      </button>
                      {i < section.items.length - 1 && <hr className="m-0 text-secondary" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
