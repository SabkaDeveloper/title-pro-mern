import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCalendarAlt, faDollarSign, faTimes } from "@fortawesome/free-solid-svg-icons"
import { MdOutlineHorizontalRule } from "react-icons/md"
import {  RxCross2 } from "react-icons/rx"

export default function OrderEntryForm() {
  const [orderNumber, setOrderNumber] = useState("2024-0183075-NH")
  const [openDate, setOpenDate] = useState("08/05/2024")
  const [dueDate, setDueDate] = useState("08/05/2024 03:51 PM")
  const [arrivalDate, setArrivalDate] = useState("08/05/2024 03:51 PM")
  const [streetAddress, setStreetAddress] = useState("47 Bog Road, Apt.G1")
  const [city, setCity] = useState("Concord")
  const [state, setState] = useState("New Hampshire")
  const [county, setCounty] = useState("Merrimack")
  const [zipCode, setZipCode] = useState("0000")

  return (
    <div className="container-fluid">

      {/* Search Bar */}
      <div className="row">
        <div className="col-md-6 offset-md-7" style={{transform : 'translateY(-14px)'}}>
          <div className="input-group gap-2">
          <div className="ms-auto d-flex">
          <input
            type="text"
            className="form-control form-control-sm me-2"
            placeholder="Property Address"
            style={{ width: "240px" }}
          />
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search Property Address"
            style={{ width: "240px" }}
          />
        </div>  
          </div>
        </div>
      </div>
      
      {/* Order Number Badge */}
      <div className="mb-2" style={{transform: 'Translate(88px, -40px)'}}>
      <span className="border p-2">
          <span className="text-info fw-normal">2024-0183075-NH 
          </span>
          <RxCross2 className="mb-1" style={{marginLeft: '3px'}}/>
          </span>
      </div>


      {/* Main Form Header */}
      <div style={{transform: 'translate(90px,-40px)'}} className="d-flex justify-content-between align-items-center mb-4">
        <h4>Order Entry</h4>
        <div>
          <button className="btn bg-gradient btn-info me-2 text-white">Save</button>
          <button className="btn bg-gradient btn-info text-white">Cancel</button>
        </div>
      </div>

      {/* Main Form Content */}
      <div style={{ transform: 'translate(90px, -55px)', fontSize: '0.85rem' }} className="row small-form">
  <div className="col-md-8" style={{width: '700px'}}>
    <div className="card">
      <div className="card-body p-2">
        {/* Order Details Row */}
        <div className="row mb-4">
          <div className="col-md-2">
            <label className="form-label text-muted fs-7 mb-0">Order Number</label>
            <input type="text"   style={{ width: '150px' }} 
            className="fw-sm form-control bg-light text-muted fs-7 p-2" value={orderNumber} />
          </div>
          <div style={{transform : 'TranslateX(50px)'}} className="col-md-3">
            <label className="form-label text-muted fs-7 mb-0" style={{transform : 'TranslateX(8px)'}}>Open Date</label>
            <p className="text-muted fs-7 p-2">{openDate}</p>
            </div>

            <div style={{transform : 'TranslateX(25px)'}} className="col-md-3">
            <label className="form-label text-muted fs-7 mb-0">Closed Date</label>
            <p type="text" className="text-muted fs-7 p-2">--</p>
            </div>

            <div className="col-md-3" style={{ transform: 'TranslateX(6px)' }}>
                <label className="form-label text-muted fs-7 mb-0">Due Date</label>
                <div className="input-group" style={{ width: '200px' }}>  {/* Ensure input & icon stay in line */}
                    <input 
                    style={{ flex: '1' }}  // Let input take available space
                    type="text" 
                    className="form-control text-muted fs-7 p-2" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    />
                    <span className="input-group-text text-muted">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                </div>
                </div>
                </div>

              {/* Dates and Workflow Row */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <label className="form-label text-muted fs-7 mb-0">
                    Arrival Date<span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                    />
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                  </div>
                </div>
                <div style={{transform : 'TranslateX(-10px)'}} className="col-md-3">
            <label className="form-label text-muted fs-7 mb-0">Delivery Date</label>
            <p type="text" className="text-muted fs-7 p-2">--</p>
            </div>


                <div className="col-md-3" style={{transform : 'TranslateX(-54px)'}}>
                  <label className=" form-label text-muted fs-7 mb-0">Active WorkFlow</label>
                  <input style={{width:'165px'}} type="text" className="form-control bg-light" value="Tax Processing" readOnly />
                </div>
                <div className="col-md-3" style={{transform : 'TranslateX(-50px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">Assigned To</label>
                  <input style={{width:'198px'}} type="text" className="form-control bg-light" value="" readOnly />
                </div>
              </div>

              {/* Address Row */}
              <div className="row mb-4" >
                <div className="col-md-6">
                  <label className="form-label text-muted fs-7 mb-0">
                    Street Address<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    style={{width: "280px"}}
                    className="form-control"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-2" style={{transform: 'translateX(-53px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">Unit#</label>
                  <input style={{width: '164px'}}type="text" className="form-control" />
                </div>
                <div className="col-md-4" style={{transform: 'translateX(6px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">
                    City<span className="text-danger">*</span>
                  </label>
                  <input type="text" style={{width: '199px'}} className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>

              {/* Location Row */}
              <div className="row mb-4">
                <div className="col-md-4" >
                  <label className="form-label text-muted fs-7 mb-0">
                    ST<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    style={{width: '200px'}}
                    className="form-control text-muted fs-7 mb-0"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="col-md-4" style={{transform: 'translateX(1px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">
                    County<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    style={{width: '200px'}}
                    className="form-control text-muted fs-7 mb-0"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                  />
                </div>
                <div className="col-md-4" style={{transform: 'translateX(4px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">
                    Zip code<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    style={{width: '200px'}}
                    className="form-control text-muted fs-7 mb-0"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Property Details Row */}
              <div className="row mb-0">
                <div className="col">
                  <label                     
                className="form-label text-muted fs-7 mb-0">Parcel Id#</label>
                  <input style={{width: '140px'}} type="text" className="form-control" />
                </div>
                <div className="col" style={{transform: 'translateX(-20px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">Sub Division</label>
                  <input style={{width: '140px'}} type="text" className="form-control" />
                </div>
                <div className="col" style={{transform: 'translateX(-40px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">Block</label>
                  <input style={{width: '140px'}} type="text" className="form-control" />
                </div>
                <div className="col" style={{transform: 'translateX(-60px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">LOT</label>
                  <input style={{width: '100px'}} type="text" className="form-control" />
                </div>
                <div className="col" style={{transform: 'translate(560px,-58px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">Section</label>
                  <input style={{width: '98px'}} type="text" className="form-control" />
                </div>
              </div>

              {/* Value Fields Row */}
              <div className="row" style={{transform: 'translateY(-30px)'}}>
                <div className="col-md-4">
                  <label className="form-label text-muted fs-7 mb-0">Land Value</label>
                  <div style={{width: "180px"}}className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faDollarSign} />
                    </span>
                    <input type="text" className="form-control text-muted fs-7 mb-0" placeholder="0.00" />
                  </div>
                </div>
                <div className="col-md-4" style={{transform: 'translateX(-33px)'}}>
                  <label className="form-label text-muted fs-7 mb-0">Improvement Value</label>
                  <div style={{width: "180px"}} className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faDollarSign} />
                    </span>
                    <input type="text" className="form-control" placeholder="0.00" />
                  </div>
                </div>
                <div className="col-md-4" style={{ transform: 'translateX(-63px)' }}>
                    <label className="form-label text-muted fs-7 mb-0">Total Assessed Value</label>
                    <div style={{width: "268px"}} className="input-group">
                        <span className="mt-2" style={{ marginLeft: "-10px", marginRight: "10px" }}>=</span> {/* Added marginRight */}
                        <span className="input-group-text">
                        <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                        <input type="text" className="form-control" placeholder="0.00" readOnly />
                    </div>
                    </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Panels */}
<div className="col-md-4" style={{ transform: 'translate(-35px,-27px)' }}>  
        {/* Order Setup Panel */}
  <div className="card mb-3" style={{width: '350px', fontSize: '16px', transform: 'scale(0.9)' , height: '550px'}}>  
    <div className="card-header bg-white py-2">
      <h6 className="mb-0 text-info">Order Setup</h6>  
    </div>
    <div className="card-body p-3">  
      <div className="mb-4">
        <label className="form-label text-muted mb-0" >
          Product Type<span className="text-danger">*</span>
        </label>
        <input type="text" className="form-control form-control-sm" value="Property Search" readOnly />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">
          Transaction Type<span className="text-danger">*</span>
        </label>
        <input type="text" className="form-control form-control-sm" value="Two Owner" readOnly />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted  mb-0">
          Workflow Group<span className="text-danger">*</span>
        </label>
        <input type="text" className="form-control form-control-sm" value="Online_TO_Plus" readOnly />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted  mb-0">Property Type</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">
          Data Source<span className="text-danger">*</span>
        </label>
        <input type="text" className="form-control form-control-sm" value="Online" readOnly />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">Add-in Product/Service</label>
        <div className="input-group">
          <input type="text" className="form-control form-control-sm" />
          <button className="btn btn-info btn-sm">
            <MdOutlineHorizontalRule />
          </button>
        </div>
      </div>
    </div>
  </div>


          {/* Partners Panel */}
          <div className="col-md-4" style={{ transform: 'translate(322px,-566px)' }}>  
  <div className="card mb-3" style={{ width: '325px',fontSize: '16px', transform: 'scale(0.9)', height: '550px' }}>  
    <div className="card-header bg-white d-flex justify-content-between align-items-center py-2">
      <h6 className="mb-0 text-info text-primary">Partners</h6>  
      <button className="btn btn-sm btn-link">
        <i className="fa fa-chevron-down"></i>
      </button>
    </div>
    <div className="card-body p-3">  
      <div className="mb-2">
        <label className="form-label text-muted mb-0">Abstractor</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">Business Source</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">Other Partner</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">Other Source</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">Recording Partner</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
      <div className="mb-4">
        <label className="form-label text-muted mb-0">Tax Office</label>
        <input type="text" className="form-control form-control-sm" />
      </div>
    </div>
  </div>
  </div>
  </div>
      </div>
    </div>
  )
}

