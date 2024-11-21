"use client";
import Buttons from "@/components/Buttons/Buttons";
import Networkcard from "@/components/Networkcard";
import { Search } from "@mui/icons-material";
import CommonApi from "@/api/CommonApi";
import { useEffect, useState } from "react";
import Cross from "../../../../public/assests/icons/cross.svg";
import TickIcon from "../../../../public/assests/icons/tick-double.svg";
import Rejectpopup from "@/components/Rejectpopup";
function Managework(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [approvalData, setApprovalData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  const [requestPending, setRequestPending] = useState([]);
  const [activeTab, setActiveTab] = useState("network");
  const [reject, setReject] = useState([]);
  const [approval, setApproval] = useState([]);
  console.log(props);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //open popup//
  const [modalShow, setModalShow] = useState(false);

  // Toggle modal visibility
  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  //end//

  useEffect(() => {
    console.log(process.env.API_URL);
    getApprovalPending();
  }, []);
  async function getApprovalPending() {
    let data = await CommonApi.getData(
      "ManageNetwork/vendor/search-pending-approvals",
      {},
      {
        VendorMasterUUId: "00B7458C-CC8A-495E-BC0B-3D95D5DA8EE5", //need to be dynamic
        Status: 1, //need to be dynamic
        VendorType: 1, //need to be dynamic
        PageSize: 5, //need to be dynamic
        PageNumber: 1, //need to be dynamic
      }
    );
    console.log("MG.jsx", data);
    setApprovalData(data.data.vendorDetails || []);
  }

  useEffect(() => {
    getNetworks();
  }, []);

  async function getNetworks() {
    try {
      const data = await CommonApi.getData(
        "ManageNetwork/vendor/search-connected-networks",
        {},
        {
          VendorMasterUUId: "4BF53476-C156-4AAC-B49C-3F5044C66540",
          Status: 2,
          VendorType: 2,
          PageSize: 5,
          PageNumber: 1,
        }
      );

      setNetworkData(data.data.vendorDetails || []);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  useEffect(() => {
    getRequestPending();
  }, []);

  async function getRequestPending() {
    try {
      const data = await CommonApi.getData(
        "ManageNetwork/vendor/search-pending-requests",
        {},
        {
          VendorMasterUUId: "C34E50DF-6B95-4228-85F0-14D7B7AC778B",
          Status: 1,
          VendorType: 2,
          PageSize: 5,
          PageNumber: 1,
        }
      );
      setRequestPending(data.data.vendorDetails || []);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }
  //approve//

  // Approve Button Handler
  const handleApprove = async (busid) => {
    try {
      const response = await CommonApi.putData(
        `ManageNetwork/connection/approve`,
        {},
        {
          status: 2,
          businessNetworkUUId: busid,
        }
      );

      if (response.success) {
        alert("Approval successful!");
        getApprovalPending();
      }
    } catch (error) {
      console.error("Error approving connection:", error);
      alert("Error approving connection. Please try again.");
    }
  };

  //end//

  const renderTableData = () => {
    const theadContent = (
      <thead>
        {props.activeTab === "request" ? (
          <tr>
            <th>Req. Date</th>
            <th>GST No.</th>
            <th>Business name</th>
            <th>Contact No.</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        ) : props.activeTab === "approval" ? (
          <tr>
            <th>GST No.</th>
            <th>Business name</th>
            <th>Contact No.</th>
            <th>Address</th>
            <th></th>
            <th>Vendor Category</th>
            <th>Action</th>
          </tr>
        ) : props.activeTab === "network" ? ( // Add your new tab condition here
          <tr>
            <th>
              <div className="quotationwraper">
                {/* <Networkcard
                  name="Earthly Delights Trading"
                  gst="#29GGGGG1314R400"
                  contact="123 456 0101"
                  address="1234 Greenway Lane, Suite 567, Springfield, ST 12345"
                  vender="Seller"
                /> */}

                <div className="grid grid-cols-12 gap-4">
                  {networkData.length > 0 ? (
                    networkData.map((vendorDetails, index) => (
                      <Networkcard
                        key={index}
                        vendorMstrUID={vendorDetails.vendorMasterUUID}
                        name={vendorDetails.companyName || "--"}
                        gst={vendorDetails.gstNo || "--"}
                        contact={vendorDetails.contactNo || "--"}
                        address={vendorDetails.address || "--"}
                        vender={vendorDetails.vendorType || "--"}
                        className="col-span-4"
                      />
                    ))
                  ) : (
                    <p>No networks available</p> 
                  )}
                </div>
              </div>
            </th>
          </tr>
        ) : null}
      </thead>
    );

    const tableBodyContent = (
      <tbody className="text-left">
        {props.activeTab === "approval" &&
          approvalData.map((vendorDetails, index) => (
            <tr key={`approval_${index}`}>
              <td>{vendorDetails.gstNo || "--"}</td>
              <td>{vendorDetails.companyName || "--"}</td>
              <td>{vendorDetails.contactNo || "--"}</td>
              <td>{vendorDetails.address || "--"}</td>
              <td>{vendorDetails.vendorType || "--"}</td>
              <td>
                <button
                  className="secondary__btn"
                  onClick={() =>
                    handleApprove(vendorDetails.businessNetworkUUID)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <TickIcon />
                    Approval
                  </div>
                </button>
              </td>
              <td>
                <button
                  className="border border-gray-300 rounded-[15px] px-[30px] py-[10px] bg-[#fef6f6]"
                  onClick={handleModalToggle}
                >
                  <div className="flex items-center space-x-2">
                    <Cross />
                    <span className="buttonText">Reject</span>
                  </div>
                </button>

                {modalShow && (
                  <Rejectpopup handleModalClose={handleModalToggle} />
                )}
              </td>
            </tr>
          ))}

        {props.activeTab === "request" &&
          (requestPending.length > 0 ? (
            requestPending.map((vendorDetails, index) => (
              <tr key={`request_${index}`}>
                <td>{vendorDetails.requestedDate || "--"}</td>
                <td>{vendorDetails.gstNo || "--"}</td>
                <td>{vendorDetails.companyName || "--"}</td>
                <td>{vendorDetails.contactNo || "--"}</td>
                <td>{vendorDetails.vendorType || "--"}</td>
                <td>
                  <button className="status-approvel">
                    Waiting for approval
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // Show a message when there are no pending requests
            <tr>
              <td colSpan="6" className="text-center">
                No pending requests available
              </td>
            </tr>
          ))}

        {props.activeTab === "network" && networkData.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center">
              No networks available
            </td>
          </tr>
        )}
      </tbody>
    );

    return (
      <table className="table w-full rounded-tr-lg">
        {theadContent}
        {tableBodyContent}
      </table>
    );
  };
  return (
    <>
      <div className="w-full table-container2">
        <div className="filter-group">
          <div className="form">
            <Search className="fa fa-search"></Search>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
          </div>

          <div>
            <label className="dropdown-list">Sort by</label>
            <select
              id="dropdown"
              className="dropdownSelect"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="" className="font-bold text-black">
                Choose
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            {selectedOption && <p>You selected: {selectedOption}</p>}
          </div>
        </div>
        {renderTableData()}
      </div>
    </>
  );
}
export default Managework;
