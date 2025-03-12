import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    'ATO Report ',
    'ATO Report and Typing ',
    'Document Retrieval ',
    'Property Search ',
    'Tax Search ',
    'Title Opinion ',
    'Title Services ',
    'Typing '
  ],
  datasets: [
    {
      cutout:  "60%",
      data: [9236, 6698, 5836, 88, 176417, 85, 9236, 6698],
      backgroundColor: [
        '#EAC4A3', // ATO Report
        '#E74C3C', // ATO Report and Typing
        '#F7DC6F', // Document Retrieval
        '#D4AC0D', // Property Search
        '#E8A13B', // Tax Search
        '#48C9B0', // Title Opinion
        '#A569BD', // Title Services
        '#EC7063'  // Typing
      ],
      hoverOffset: 8
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 16,
      top: 16
    }
  },
  plugins: {
    legend: {
      position: window.innerWidth < 768 ? 'bottom' : 'right',
      align: 'center',
      labels: {
        boxWidth: 10,
        font: {
          size: window.innerWidth < 768 ? 12 : 14
        }
      }
    },
    tooltip: {
      enabled: true
    }
  }
};

const Piechart = () => {
    return (
      <div className="container">
        <Card className="card-half">
          {/* Add card header similar to Map component */}
          <div className="card-header text-white">
            <h5 className="text-info mt-2">Orders By Product Type</h5>
          </div>
          <Card.Body>
            <div style={{ marginLeft: '6rem', width: "33vw", height: "45vh" }}>
              <Doughnut data={data} options={options} />
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };
  
export default Piechart;
