import "bootstrap/dist/css/bootstrap.min.css"
import { X, Plus, FileEarmarkText, ThreeDotsVertical, PencilFill, TrashFill } from "react-bootstrap-icons"
import "./order.css"
import { IoMdCheckmark } from "react-icons/io"

const ClientsPortalTyping = () => {
  return (
    <div className="order-processing-container">
      {/* Header */}
      <div className="order-header">
        <h5 className="header-title">Clients Portal Typing</h5>
        <div className="header-actions">
          <button className="icon-button">
            <X size={18} />
          </button>
          <button className="icon-button">
            <Plus size={18} />
          </button>
          <button className="icon-button">
            <IoMdCheckmark
            size={18} />
          </button>
          <button className="icon-button">
            <ThreeDotsVertical size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered m-0">
          <thead>
            <tr>
              <th className="column-header text-muted " style={{ width: "10rem" }}>
                Complete
              </th>
              <th className="column-header">Task Name</th>
              <th className="column-header">Assigned User</th>
              <th className="column-header">Assigned Type</th>
              <th className="column-header">Assigned Date</th>
              <th className="column-header">Due Date</th>
              <th className="column-header">Completed By</th>
              <th className="column-header">Completed Date</th>
              <th className="column-header text-center" style={{ width: "5rem" }}>
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
  {/* First Row */}
  <tr>
    <td className="text-center align-middle">
      <div className="form-check d-flex justify-content-center">
        <input className="custom-checkbox" type="checkbox" />
      </div>
    </td>
    <td className="align-middle">Typing - Clients</td>
    <td className="align-middle">
      <span className="redacted-text"></span>
    </td>
    <td className="align-middle">Task group</td>
    <td className="align-middle"></td>
    <td className="align-middle"></td>
    <td className="align-middle">
      <span className="redacted-text"></span>
    </td>
    <td className="align-middle"></td>
    <td className="text-center align-middle">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <PencilFill size={16} className="cursor-pointer edit-button " />
        <TrashFill size={16} className="cursor-pointer text-danger" />
      </div>
    </td>
  </tr>

  {/* Second Row (Duplicate) */}
  <tr>
    <td className="text-center align-middle">
      <div className="form-check d-flex justify-content-center">
        <input className="custom-checkbox" type="checkbox" />
      </div>
    </td>
    <td className="align-middle">Clients Portal</td>
    <td className="align-middle">
      <span className="redacted-text"></span>
    </td>
    <td className="align-middle">Previous Owner</td>
    <td className="align-middle"></td>
    <td className="align-middle"></td>
    <td className="align-middle">
      <span className="redacted-text"></span>
    </td>
    <td className="align-middle"></td>
    <td className="text-center align-middle">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <PencilFill size={16} className="cursor-pointer edit-button " />
        <TrashFill size={16} className="cursor-pointer text-danger" />
      </div>
    </td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  )
}

export default ClientsPortalTyping
