"use client";
import React, { useState } from "react";
import DocIcon from "../../../public/assests/icons/google-doc.svg";
import NavIcon from "../../../public/assests/icons/navigation.svg";
import HoldIcon from "../../../public/assests/icons/hold.svg";
import CancelIcon from "../../../public/assests/icons/cancel-icon.svg";
import Qrcard from "@/components/Qrcard";
import Search from "../../../public/assests/icons/search.svg";

const QuotationRequest = () => {
  const [activeTab, setActiveTab] = useState("approval");
  return (
    <div>
      <div className="flex space-x-4 mt-6 background">
        <button
          className={`tab flex items-center justify-center gap-2 p-2 rounded-md ${
            activeTab === "approval"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("approval")}
        >
          <DocIcon />
          <span>QR Recived</span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
            activeTab === "request"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("request")}
        >
          <NavIcon />
          <span>QR Send</span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
            activeTab === "hold"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("hold")}
        >
          <HoldIcon />
          <span>QR Hold</span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
            activeTab === "reject"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("reject")}
        >
          <CancelIcon />
          <span>QR Reject</span>
        </button>
      </div>
      <div className="filter-group">
        <div className="form">
          <Search className="fa fa-search"></Search>
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search Product Name..."
          />
          <label className="dropdown-list">Sort by</label>
          <select id="dropdown" className="dropdownSelect">
            <option value="" className="font-bold text-black">
              Choose
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
      <div className="quotationwraper">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
        
          <Qrcard
            key={row}
            mode='request'
            name="Earthly Delights Trading"
            date="04/11/2024"
            qritems="10"
            status="Urgent"
            qrId="2024ABC"
          />
        ))}
      </div>
    </div>
  );
};

export default QuotationRequest;
