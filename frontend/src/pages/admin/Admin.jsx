import React from "react";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      {/* Main Content */}
      <div style={{marginLeft: "80px"}} className="container-fluid p-4">
        <h3  className="mb-4 ">Admin Overview</h3>
        <div className="row">
          {[
            { title: "Administrator", items: ["User Permissions", "Data Access", "Allowed IP Address"] },
            { title: "System Settings", items: ["Smart Tag Setup", "Lookup List"] },
            { title: "Company", items: ["Company", "Order Number", "Invoice Number", "Customer Fee Schedule"] },
            { title: "Users", items: ["User List", "Lite User List", "Permission Groups", "Task Groups", "User Non-Availability", "User Task Reassign"] },
            { title: "Workflow", items: ["Workflow Groups"] },
            { title: "Order Settings", items: ["Transaction Types", "Order Templates", "Custom Documents", "Email Template", "SQSearch Bot"] },
            { title: "Defaults", items: ["Contact Fee Schedule", "Contact Workflow Groups", "Contact Guidance"] },
          ].map((section, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">{section.title}</div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    {section.items.map((item, i) => (
                      <li key={i}><a href="#" className="text-decoration-none">{item}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
