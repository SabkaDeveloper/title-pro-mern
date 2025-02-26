import { useState } from "react"
import { Search, Plus, Download, Settings, ArrowLeft, ArrowRight } from "lucide-react"

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const orders = [
    {
      arrivalDate: "Jul 12, 2024 09:01 AM",
      orderNumber: "2024-0181563-NE",
      priority: "N",
      transactionType: "Full",
      dataSource: "Online",
      state: "NE",
      county: "Cass",
      activeWorkflow: "Abstract Processing",
      assignedTo: "Search Processing",
    },
    {
      arrivalDate: "Jul 17, 2024 10:46 AM",
      orderNumber: "2024-0181827-NC",
      priority: "N",
      transactionType: "Document Retrieval",
      dataSource: "Ground",
      state: "NC",
      county: "Gaston",
      activeWorkflow: "Document Review",
      assignedTo: "Document Review",
    },
    // Add more sample data as needed
  ]

  const totalPages = 9; // Define the total number of pages

  return (
    <div className="container-fluid p-4" style={{ border: "2px solid #ddd", borderRadius: "8px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "6px" }}>
        <h1 className="h3 mb-0">Orders</h1>
        <div className="d-flex gap-2">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Order Number" aria-label="Order Number" />
            <button className="btn btn-primary d-flex align-items-center gap-2 w-auto">
  <Plus className="h-2 w-4" />
  Search Order
</button>

          </div>
          <button className="btn btn-primary d-flex align-items-center gap-2 w-auto">
  <Plus className="h-2 w-4" />
  Create Order
</button>

          <button className="btn btn-outline-secondary">
            <Download className="h-4 w-4" />
          </button>
          <button className="btn btn-outline-secondary">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive" style={{ marginTop: "20px", border: "2px solid #ddd", borderRadius: "6px", backgroundColor: "#f1f3f5" }}>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Arrival Date</th>
              <th>Order Number</th>
              <th>Priority</th>
              <th>Transaction Type</th>
              <th>Data Source</th>
              <th>State</th>
              <th>County</th>
              <th>Active Workflow</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa", // Alternate between white and light grey
                }}
              >
                <td>{order.arrivalDate}</td>
                <td className="text-primary">{order.orderNumber}</td>
                <td>{order.priority}</td>
                <td>{order.transactionType}</td>
                <td>{order.dataSource}</td>
                <td>{order.state}</td>
                <td>{order.county}</td>
                <td>{order.activeWorkflow}</td>
                <td>{order.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4" style={{ backgroundColor: "#e9ecef", padding: "10px", borderRadius: "6px" }}>
        <button className="btn btn-outline-secondary" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Pagination Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <span>...</span>
        <button className="btn btn-outline-secondary">9</button>
        
        <button className="btn btn-outline-secondary" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="d-flex align-items-center gap-2 ms-2">
          <span>Go to</span>
          <input
            type="number"
            className="form-control"
            style={{ width: "60px" }}
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
