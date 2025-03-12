import React from 'react';
import Piechart from './PieChart';
import { LuPlus } from 'react-icons/lu';
import "./Dashboard.css";
import Map from './Map';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Heading Section */}
      <div style={{marginLeft: "-6rem"}} className="heading mb-4 d-flex justify-content-between align-items-center">
        <h4>Charts</h4>
      </div>
        <button className="manage-charts-btn bg-info border-0 rounded text-white p-2 d-flex align-items-center">
          <LuPlus className="me-2" /> Manage Charts
        </button>

      {/* Charts Layout */}
      <div className="d-flex gap-4">
        <div className="w-50" style={{ marginLeft: "-13rem" }}>  {/* Moves Piechart left */}
          <Piechart />
        </div>
        <div className="w-50" style={{marginLeft: "7rem" , marginTop: "-1.5rem"}}>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
