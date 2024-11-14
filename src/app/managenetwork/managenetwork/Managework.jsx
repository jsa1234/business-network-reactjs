"use client";
import Buttons from "@/components/Buttons/Buttons";
import Networkcard from "@/components/Networkcard";
import { Search } from "@mui/icons-material";
import CommonApi from "@/api/CommonApi";
import { useEffect, useState } from "react";
function Managework(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [approvalData, setApprovalData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  const [requestPending, setRequestPending] = useState([]);
  const [activeTab, setActiveTab] = useState("network");
  console.log(props);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    console.log(process.env.API_URL);
    getApprovalPending();
  }, []);
  async function getApprovalPending() {
    let data = await CommonApi.getData(
      "ManageNetwork/vendor/search-approval-pending-networks",
      {},
      {
        VendorUUId: "21C7586F-9F29-457B-8E3D-4C75213183DF",
        Status: 2,
      }
    );
    console.log("MG.jsx", data);
    setApprovalData(data);
  }

  useEffect(() => {
    getNetworks();
  }, []);

  async function getNetworks() {
    try {
      const data = await CommonApi.getData(
        "ManageNetwork/vendor/search-networks",
        {},
        {
          VendorUUId: "21C7586F-9F29-457B-8E3D-4C75213183DF",
          Status: 2,
        }
      );
      setNetworkData(data || []); 
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  useEffect(() => {
    getRequestPending();
  }, []);

  async function  getRequestPending() {
    try {
      const data = await CommonApi.getData(
        "ManageNetwork/vendor/search-networks",
        {},
        {
          VendorUUId: "21C7586F-9F29-457B-8E3D-4C75213183DF",
          Status: 1,
        }
      );
      setRequestPending(data || []); 
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

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
                    networkData.map((network, index) => (
                      <Networkcard
                        key={index}
                        name={network.vendorName || "--"}
                        gst={network.gstNo || "--"}
                        contact={network.contactNo || "--"}
                        address={network.address || "--"}
                        vender={network.vendorType || "--"}
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
          approvalData.map((row, index) => (
            <tr key={`approval_${index}`}>
              <td>{row.gstNo || "--"}</td>
              <td>{row.vendorName || "--"}</td>
              <td>{row.contactNo || "--"}</td>
              <td>{row.address || "--"}</td>
              <td>{row.vendorType || "--"}</td>
              <td>
                <Buttons />
              </td>
            </tr>
          ))}
    
        {props.activeTab === "request" &&
          (requestPending.length > 0 ? (
            requestPending.map((row, index) => (
              <tr key={`request_${index}`}>
                <td>{row.gstNo || "--"}</td>
                <td>{row.vendorName || "--"}</td>
                <td>{row.contactNo || "--"}</td>
                <td>{row.address || "--"}</td>
                <td>{row.vendorType || "--"}</td>
                <td>
                  <button className="status-approvel">Waiting for approval</button>
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
