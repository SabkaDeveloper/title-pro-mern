import React, { useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { IoIosArrowForward, IoIosContact } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { RiListUnordered } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import { TbSettingsDollar } from "react-icons/tb";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex">
        <div style={{ marginLeft: "80px" }} className="container-fluid p-4">
          <h3 className="mb-4">Admin Overview</h3>
          <div className="row">
            {[
              { title: "Administrator", icon: <GrUserSettings />, items: ["User Permissions", "Data Access", "Allowed IP Address"] },
              { title: "Contacts", icon: <IoIosContact />, items: ["Contact Type"] },
              { title: "Company", icon: <RiListUnordered />, items: ["Company", "Order Number", "Invoice Number", "Customer Fee Schedule"] },
              { title: "Users", icon: <LuUsers />, items: ["User List", "Lite User List", "Permission Groups", "Task Groups", "User Non-Availability", "User Task Reassign"] },
              { title: "Workflow", icon: <TiFlowChildren />, items: ["Workflow Groups"] },
              { title: "Order Settings", icon: <TbSettingsDollar />, items: ["Transaction Types", "Order Templates", "Custom Documents", "Email Template", "SQSearch Bot"] },
              { title: "Defaults", icon: <LiaLayerGroupSolid />, items: ["Contact Fee Schedule", "Contact Workflow Groups", "Contact Guidance"] },
            ].map((section, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card shadow-sm">
                  <div className="card-header text-black fw-bold" style={{ backgroundColor: "#F0FAFF" }}>
                    {section.icon} {section.title}
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      {section?.items?.map((item, i) => (
                        <li key={i} className="list-unstyled">
                          <a
                            role="button"
                            className="text-decoration-none text-black d-flex justify-content-between align-items-center py-2"
                            onClick={item === "Contact Type" ? () => navigate("/contact-type") : null} // ✅ Redirect on click
                            style={{ cursor: item === "Contact Type" ? "pointer" : "default" }}
                          >
                            {item} <span className="fw-light"><IoIosArrowForward /></span>
                          </a>
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
      </div>

        </>
  );
};

export default AdminDashboard;
