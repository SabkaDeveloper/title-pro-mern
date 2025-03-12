import "bootstrap/dist/css/bootstrap.min.css"
import { RxCross2 } from "react-icons/rx";

function OrderSummary() {
  return (
    <div className="container-fluid p-1 bg-white" style={{maxWidth: '100vw',overflowX: 'hidden',width: '113%', transform: 'translate(16px,-65px) scale(0.9)', fontSize: '16px' }}>

      {/* Order ID with Close Button */}
      <div className="py-2 px-3" style={{ transform: "translateY(25px)" }}>  
      <div className="d-flex align-items-center">
          <span className="border p-2">
          <span className="text-info fw-normal">2024-0183075-NH 
          </span>
          <RxCross2 className="mb-1" style={{marginLeft: '3px'}}/>
          </span>
          <button className="btn btn-link text-danger ms-2 p-0 border-0">
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-7" style={{transform : 'translate(-8.6rem,-3.5rem)'}}>
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

      {/* Main Content */}

      <div className="p-3">
        <div style={{width: '1400px', height: '280px'}}className="card row g-0">
          {/* Property Address */}
          <div className="col-md-4">
            <div className="mb-4">
              <div style={{marginLeft: '10px', marginTop: '10px'}} className="text-secondary small">Property Address</div>
              <div style={{marginLeft: '10px'}}>47 Bog Road, Apt.G1,</div>
              <div style={{marginLeft: '10px'}}>Concord, NH, 0000</div>
              <div style={{marginLeft: '10px'}}>Merrimack</div>
            </div>

            <div className="mb-4">
              <div className="text-secondary mb-1 small" style={{marginLeft: '10px'}}>Order Number</div>
              <div style={{marginLeft: '10px'}}>2024-0183075-NH</div>
            </div>

            <div className="mb-4">
              <div className="text-secondary mb-1 small" style={{marginLeft: '10px'}}>Open Date</div>
              <div style={{marginLeft: '10px'}}>08/05/2024</div>
            </div>
          </div>

          {/* Order Status */}
          <div className="col-md-3 ">
            <div className="mb-4">
              <div className="text-secondary mb-1 small" style={{transform: 'translate(-120px)', marginTop: '10px'}}>Order Status</div>
              <div className=" text-white p-2 rounded" style={{backgroundColor: '#44b75c', width : '300px',transform: 'translate(-120px)'}}>Open</div>
            </div>

          <div className="mb-4">
            <div className="text-secondary mb-1 small" style={{transform: 'translate(-120px,26px)'}}>Active WorkFlow</div>
            <div className="border p-2 rounded" style={{width : '300px', transform: 'translate(-120px,24px)'}}>Tax Processing</div>
          </div>

            <div className="mb-4">
              <div className="text-secondary mb-1 small" style={{transform: 'translate(-120px,12px)'}}>Due Date</div>
              <div style={{transform: 'translate(-120px,12px)'}}>08/05/2024 03:51 PM</div>
            </div>
          </div>


              {/* Product Type */}
              <div className="col-md-3">
                <div className="mb-4">
                  <div className="text-secondary mb-1 small" style={{transform: 'translate(-80px)', marginTop: '10px'}}>Product Type</div>
                  <div style={{transform: 'translate(-80px)'}}>Property Search</div>
                </div>

                  <div className="mb-4" style={{transform: 'translate(-80px,45px)'}}>
                    <div className="text-secondary mb-1 small" style={{transform: 'translate(1px)'}}>Assigned To</div>
                    <div className="text-primary">--</div>
                  </div>

                  <div className="mb-4" style={{transform: 'translate(-80px,50px)'}}>
                    <div className="text-secondary mb-1 small">Arrival Date</div>
                    <div style={{marginTop: '-4px'}}>08/05/2024 03:51 PM</div>
                  </div>
                </div>
                <div className="mb-4" style={{transform: 'translate(-5px,10px)'}}>
                <div className="text-secondary mb-1 small">Property Type</div>
                <div className="text-primary">--</div>
              </div>

              {/* Transaction Type */}
              <div className="col-md-3" style={{transform: 'translate(-1600px)', marginTop: '10px'}}>
                <div className="mb-4">
                  <div className="text-secondary mb-1 small">Transaction Type</div>
                  <div>Two Owner</div>
                </div>

                <div className="mb-4">
                  <div className="text-secondary mb-1 small" style={{transform: 'translateY(45px)'}}>Data Access</div>
                  <div style={{transform: 'translateY(40px)'}}>Online</div>
                </div>

              <div className="mb-4" style={{transform: 'translateY(48px)'}}>
                <div className="text-secondary mb-1 small">Closed Date</div>
                <div className="text-primary">--</div>
              </div>
            </div>
          
        </div>
        <div>

        {/* Transaction Details and Order Label Sections */}
        <div className="row g-0" style={{transform : 'translateY(10px)'}}>
          {/* Transaction Details Section */}
          <div className="card col-md-7 pe-3">
            <div className="mb-0 pb-2">
              <h6 style={{transform: 'translate(-15px)',borderBottom: "3px solid", paddingBottom: "7px",paddingLeft:"10px", width: "101.5%" }} className="m-3 border-bottom text-info">Transaction Details</h6>
            </div>

            <div className="row g-0 mb-0" >
              <div className="col-md-4" style={{marginLeft: '10px'}}>
                <div className="text-secondary mb-1 small">Customer</div>
                <div>New England Title & Escrow Services PC</div>
              </div>
              <div className="col-md-4" style={{marginLeft: '10px'}}>
                <div className="text-secondary mb-1 small">Address</div>
                <div>841 Main St,Tewksbury,MA,01876</div>
              </div>
              <div className="col-md-4" style={{marginLeft: '10px', transform: 'translate(600px,-72px)'}}>
                <div className="text-secondary mb-1 small">Branch Code</div>
                <div>NETESPC</div>
              </div>
            </div>

            <div className="row g-0 mb-4">
              <div className="col-md-4" >
                <div className="text-secondary mb-1 small" style={{marginLeft: '10px', marginTop: '-20px'}}>Lender</div>
                <div className="text-primary" style={{marginLeft: '10px'}}>--</div>
              </div>
              <div className="col-md-4">
                <div className="text-secondary mb-1 small" style={{transform: 'translate(20px)', marginTop: '-20px'}}>Address</div>
                <div className="text-primary" style={{transform: 'translate(20px)'}}>--</div>
              </div>
              <div className="col-md-4">
                <div className="text-secondary mb-1 small" style={{transform: 'translate(69px)', marginTop: '-20px'}}>Branch Code</div>
                <div className="text-primary" style={{transform: 'translate(69px)'}}>--</div>
              </div>
            </div>

            <div className="row g-0 mb-4">
              <div className="col-md-4">
                <div style={{marginLeft: '10px', marginTop: '-10px'}} className="text-secondary mb-1 small">File#</div>
                <div style={{marginLeft: '10px'}}>2024-12311</div>
              </div>
              <div className="col-md-4">
                <div style={{marginLeft: '20px', marginTop: '-10px'}} className="text-secondary mb-1 small">Loan#</div>
                <div style={{marginLeft: '20px'}} className="text-primary">--</div>
              </div>
              <div className="col-md-4">
                <div style={{marginLeft: '69px', marginTop: '-10px'}} className="text-secondary mb-1 small">Sales Price</div>
                <div style={{marginLeft: '69px'}}>$0.00</div>
              </div>
            </div>

            <div className="row g-0">
              <div className="col-md-4">
                <div style={{marginLeft: '10px'}} className="text-secondary mb-1 small">Loan Type</div>
                <div style={{marginLeft: '10px'}} className="text-primary">--</div>
              </div>
              <div className="col-md-4">
              <div style={{marginLeft: '20px', marginTop: '-10px'}} className="text-secondary mb-1 small">Loan Date</div>
              <div style={{marginLeft: '20px'}} className="text-primary">--</div>
              </div>
              <div className="col-md-4">
              <div style={{marginLeft: '69px', marginTop: '-10px'}} className="text-secondary mb-1 small">Loan Amount</div>
              <div style={{marginLeft: '69px'}} className="text-primary">--</div>
              </div>
            </div>
          </div>
        </div>

          {/* Order Label and Partners Section */}
          <div  className="col-md-4">
            <div style={{transform: 'translate(845px, -346px)', width: "555px"}} className="card">
            <div  className=" mb-3 pb-2">
            <h6 style={{transform: 'translate(-15px)',borderBottom: "3px solid", paddingBottom: "7px",paddingLeft:"10px", width: "100%" }} className="m-3 border-bottom text-info">Order Label</h6>
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" style={{transform: 'translateY(-20px)',marginLeft: '15px',width: '520px'}} placeholder="Order Label" />
            </div>
            </div>

            <div style={{transform: 'translate(845px, -330px)', width: '555px'}} className="card">
            <div className="mb-0 pb-2">
            <h6 style={{transform: 'translate(-15px)',borderBottom: "3px solid", paddingBottom: "7px",paddingLeft:"10px", width: "100%" }} className="m-3 border-bottom text-info">Partners</h6>
              </div>
              <div>
              <div className="mb-3" style={{marginLeft: '45px'}}>
                <div className="text-secondary mb-1 small">Abstractor</div>
              </div>
              <div className="mb-3" style={{marginLeft: '45px'}}>
                <div className="text-secondary mb-1 small">Business Source</div>
              </div>
              <div className="mb-3" style={{marginLeft: '45px'}}>
                <div className="text-secondary mb-1 small">Other Partner</div>
              </div>
              <div className="mb-3" style={{marginLeft: '45px'}}>
                <div className="text-secondary mb-1 small">Other Source</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary

