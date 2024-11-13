"use client";
import Buttons from "@/components/Buttons/Buttons";
import Networkcard from "@/components/Networkcard";
import CommonApi from "@/api/CommonApi";
import { useEffect, useState } from "react";
function Managework(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [approvalData,setApprovalData]=useState([]);
  const [activeTab, setActiveTab] = useState("network");
  console.log(props);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(()=>{
    console.log(process.env.API_URL);
    getApprovalPending();
  },[])
  async function getApprovalPending() {
   let data =await CommonApi.getData("ManageNetwork/vendors/SearchApprovalPendingNetworks",{},{
      VendorUUId: '21C7586F-9F29-457B-8E3D-4C75213183DF',
      Status: 2})
    console.log("MG.jsx",data);
    setApprovalData(data);
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

<div className="filter__results__body grid grid-cols-12 gap-4">
          <Networkcard 
          name="Earthly Delights Trading"
          gst="#29GGGGG1314R400"
          contact="123 456 0101"
          address="1234 Greenway Lane, Suite 567, Springfield, ST 12345"
          vender="Seller"
          className="col-span-4" />
         
          
        </div>
                
              </div>
            </th>
          </tr>
        ) : null}
      </thead>
    );

    const tableBodyContent = (
      <tbody className="text-left">
        {props.activeTab === "approval" ? (
          approvalData.map((row, index) => (
            <tr key={`key_`+index}> {/* Add a unique key here */}
              <td>{row.gstNo||'--'}</td>
              <td>{row.vendorName||'--'}</td>
              <td>{row.contactNo||'--'}</td>
              <td>{row.address||'--'}</td>
              <td>{row.vendorType||'--'}</td>
              <td>
                <Buttons />
              </td>
            </tr>
          ))
        ) : props.activeTab === "request" ? (
          <tr>
            <td>#88HHHHH2222X8Y7</td>
            <td>Sunshine Goods Ltd.</td>
            <td>987 654 3210</td>
            <td>5678 Sunshine St., Apt 123, Brookfield, ST 54321</td>
            <td>Distributor</td>
            <td>
              <button className="status-approvel">Waiting for approval</button>
            </td>
          </tr>
        ) : props.activeTab === "network" ? (
          <tr></tr>
        ) : null}
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
