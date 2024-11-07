"use client";
import React, { useState, useEffect } from "react";
import ChevronIcon from "../../../public/assests/icons/chevron-right.svg";
import SearchIcon from "../../../public/assests/icons/search_btn.svg";
import BNcard from "@/components/BNcard";
import Popup from "@/components/Popup";

const BusinessNetwork = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [connectClick, setconnectClick] = React.useState(false);

  const handlebuttonClick = () => {
    setconnectClick(!connectClick);
  };
  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);
  const fetchData = async (currentPage, rowsPerPage) => {
    try {
      //below code need to integrated when api are ready
      //   const response = await fetch(
      //     // Replace with your server endpoint URL
      //     `your-api-endpoint?page=${currentPage + 1}&rowsPerPage=${rowsPerPage}`
      //   );

      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      let rows = [];

      rows = [
        {
          name: "ABC Pvt Ltd",
          gst_number: "27AAAAA1234A1Z5",
          contact: "+91 9876543210",
          address: "123, ABC Street, Mumbai, Maharashtra, 400001",
          vendor: "ABC Vendor",
        },
        {
          name: "XYZ Industries",
          gst_number: "29BBBBB2345B1Z7",
          contact: "+91 9988776655",
          address: "456, XYZ Industrial Park, Bangalore, Karnataka, 560001",
          vendor: "XYZ Vendor",
        },
        {
          name: "DEF Suppliers",
          gst_number: "19CCCCD3456C1Z8",
          contact: "+91 9001122334",
          address: "789, DEF Plaza, Kolkata, West Bengal, 700001",
          vendor: "DEF Vendor",
        },
        {
          name: "ABC Pvt Ltd 1",
          gst_number: "27AAAAA1234A1Z5",
          contact: "+91 9876543210",
          address: "123, ABC Street, Mumbai, Maharashtra, 400001",
          vendor: "ABC Vendor",
        },
        {
          name: "XYZ Industries 1",
          gst_number: "29BBBBB2345B1Z7",
          contact: "+91 9988776655",
          address: "456, XYZ Industrial Park, Bangalore, Karnataka, 560001",
          vendor: "XYZ Vendor",
        },
        {
          name: "DEF Suppliers 1",
          gst_number: "19CCCCD3456C1Z8",
          contact: "+91 9001122334",
          address: "789, DEF Plaza, Kolkata, West Bengal, 700001",
          vendor: "DEF Vendor",
        },
      ];

      setData(rows);
      setTotalCount(5);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }
  };
  const [gstNo, setGstNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");

  // Handle input changes
  const handleInputChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  // Handle form submission or search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      gstNo,
      mobileNo,
      businessName,
      productCategory,
      vendorCategory,
      location,
      rating,
    });
    // Add your search logic here
  };
  return (
    <div>
      <div className="advance__filter">
        <div className="advance__filter__header">
          <h1>Advance Filter</h1>
          <ChevronIcon />
        </div>
        <hr></hr>
        <div className="advance__filter__body grid grid-cols-12 gap-4">
          <div className="input__group col-span-3">
            <label htmlFor="gstSrchInpt">By GST No.</label>
            <input
              type="text"
              id="gstSrchInpt"
              value={gstNo}
              onChange={(e) => handleInputChange(e, setGstNo)}
            />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="MobileInpt">By Mobile No.</label>
            <input
              type="text"
              id="MobileInpt"
              maxLength="10"
              value={mobileNo}
              onChange={(e) => handleInputChange(e, setMobileNo)}
            />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="BusinessInpt">By Business Name</label>
            <input
              type="text"
              id="BusinessInpt"
              value={businessName}
              onChange={(e) => handleInputChange(e, setBusinessName)}
            />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="ProductInpt">By Product Category</label>
            <select
              id="ProductInpt"
              value={productCategory}
              onChange={(e) => handleInputChange(e, setProductCategory)}
            >
              <option value="">Select from the list</option>
              {/* Add options dynamically if needed */}
            </select>
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="VendorInpt">By Vendor Category</label>
            <select
              id="VendorInpt"
              value={vendorCategory}
              onChange={(e) => handleInputChange(e, setVendorCategory)}
            >
              <option value="">Select from the list</option>
              {/* Add options dynamically if needed */}
            </select>
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="LocationInpt">By Location</label>
            <select
              id="LocationInpt"
              value={location}
              onChange={(e) => handleInputChange(e, setLocation)}
            >
              <option value="">Select from the list</option>
              {/* Add options dynamically if needed */}
            </select>
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="RatingInpt">By Rating</label>
            <select
              id="RatingInpt"
              value={rating}
              onChange={(e) => handleInputChange(e, setRating)}
            >
              <option value="">Select from the list</option>
              {/* Add options dynamically if needed */}
            </select>
          </div>
          <div className="input__group col-span-3">
            <p>&nbsp;</p>
            <button
              id="search_btn"
              className="primary__btn flex pl-20 pr-20 gap-1 justify-around"
              onClick={handleSearch}
            >
              Search Now
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="filter__results">
        <div className="filter__results__header">
          <h1>Networks</h1>
        </div>
        <hr></hr>
        <div className="filter__results__body grid grid-cols-12 gap-4">
          {data.map((row) => (
            <BNcard
              key={row.name}
              name={row.name}
              gst_number={row.gst_number}
              contact={row.contact}
              address={row.address}
              vendor={row.vendor}
              buttonClick={handlebuttonClick}
            />
          ))}
        </div>
      </div>
      <Popup showModal={connectClick} handleModalClose={handlebuttonClick} />
    </div>
  );
};

export default BusinessNetwork;
