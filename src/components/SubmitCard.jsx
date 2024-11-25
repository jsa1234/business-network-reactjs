import React from "react";
import Navigation from "../../public/assests/icons/navigation.svg";

const SubmitCard = ({
  submitClick,
  selectedCount = 0,
}) => {
  return (
    <div className="total_container flex justify-end">
      
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

export default SubmitCard;
