import React from 'react'
import OrderProcessing from './OrderProcessing'
import TaxProcessing from './TaxProcessing'
import SearchProcessing from './SearchProcessing'
import SQTyping from './SQTyping'
import InvoiceProcessing from './InvoiceProcessing'
import ClientsPortalTyping from './ClientsPortalTyping'
import ChangedStatus from './ChangedStatus'
import DocumentProcessing from './DocumentProcessing'
import { RxCross2 } from 'react-icons/rx'

const OrderTaskPage = () => {
  return (
    <>
<span className="p-2" style={{ marginLeft: "6.5rem", position: "relative", top: "-0.7rem", display: "inline" }}>
<span className="text-info fw-normal">2024-0183075-NH</span>
        <RxCross2 className="mb-1" />
        </span>
        <div className="d-flex justify-content-end align-items-start" style={{ marginTop: "-2rem", marginRight: "-6rem" }}>
        <input
    type="text"
    className="form-control form-control-sm me-1"
    placeholder="Property Address"
    style={{ width: "240px" }}
  />
  <input
    type="text"
    className="form-control form-control-sm"
    placeholder="Search Property Address"
    style={{ width: "290px" }}
  />
</div>
        {/* Search Bar */}
        <h4 style={{ marginLeft: "7rem" }}>Order Task</h4>
        <div className="d-flex flex-column gap-4 mb-4">
        <OrderProcessing />
        <TaxProcessing />
        <SearchProcessing/>
        <SQTyping/>
        <InvoiceProcessing/>
        <ClientsPortalTyping/>
        <ChangedStatus/>
        <DocumentProcessing />
        </div>

    </>
)
}

export default OrderTaskPage