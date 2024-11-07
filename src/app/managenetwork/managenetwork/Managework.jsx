"use client";
import Buttons from "@/components/Buttons/Buttons";
import Networkcard from "@/components/Networkcard";

import { useState } from "react";
function Managework(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("approval");
  console.log(props);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
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
                <Networkcard
                  name="Earthly Delights Trading"
                  gst="#29GGGGG1314R400"
                  contact="123 456 0101"
                  address="1234 Greenway Lane, Suite 567, Springfield, ST 12345"
                  vender="Seller"
                />
              </div>
            </th>
          </tr>
        ) : null}
      </thead>
    );

    const tableBodyContent = (
      <tbody className="text-left">
        {props.activeTab === "approval" ? (
          <tr>
            <td>#29GGGGG1314R9Z6</td>
            <td>Earthly Delights Trading</td>
            <td>123 456 7895</td>
            <td>1234 Greenway Lane, Suite 567, Springfield, ST 12345</td>
            <td>Supplier</td>
            <td>
              <Buttons />
            </td>
          </tr>
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
