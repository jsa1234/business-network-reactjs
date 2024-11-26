import React from "react";
import Navigation from "../../public/assests/icons/navigation.svg";
import { useSelector } from "react-redux";

const TotalRate = ({
  subTotal,
  totalGst,
  total,
  submitClick,
  discountChange,
  selectedCount = 0,
}) => {
  const VendorType = useSelector(
    (state) => state.vendor.VendorType
  );
  const handleChange = (e) => {
    discountChange(e.target.value);
  };
  return (
    <div className="total_container">
      <h1>
        Sub Total:<span>{subTotal}</span>
      </h1>
      {totalGst||VendorType==2?<h1>
        Total GST:<span>{totalGst}</span>
      </h1>:''}
      {VendorType!=2?<div className="flex items-center gap-3">
        <label className="" htmlFor="inpDis">
          Discount:
        </label>
        <input
          className=""
          id="inpDis"
          placeholder="0000"
          type="number"
          onChange={handleChange}
        ></input>
      </div>:''}
      <h1>
        Total:<span>{total}</span>
      </h1>
      <button
        className="green__btn"
        onClick={() => submitClick("accept")}
        data-count={selectedCount}
      >
        <Navigation />
        Submit Quotation
      </button>
    </div>
  );
};

export default TotalRate;
