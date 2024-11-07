import React from "react";
import ChevronIcon from "../../../public/assests/icons/chevron-right.svg";
import SearchIcon from "../../../public/assests/icons/search_btn.svg";
import BNcard from "@/components/BNcard";

const BusinessNetwork = () => {
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
            <input type="text" id="gstSrchInpt" />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="MobileInpt">By Mobile No.</label>
            <input type="text" id="MobileInpt" maxLength="10" />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="BusinessInpt">By Business Name</label>
            <input type="text" id="BusinessInpt" />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="ProductInpt">By Product Category</label>
            <input type="text" id="ProductInpt" />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="VendorInpt">By Vendor Category</label>
            <input type="text" id="VendorInpt" />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="LocationInpt">By Location</label>
            <input type="text" id="LocationInpt" />
          </div>
          <div className="input__group col-span-3">
            <label htmlFor="RatingInpt">By Rating</label>
            <input type="text" id="RatingInpt" />
          </div>
          <div className="input__group col-span-3">
            <p>&nbsp;</p>
            <button
              id="search_btn"
              className="primary__btn flex pl-20 pr-20 gap-1 justify-around"
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
          <BNcard className="col-span-4" />
          <BNcard className="col-span-4" />
          <BNcard className="col-span-4" />
        </div>
      </div>
    </div>
  );
};

export default BusinessNetwork;
