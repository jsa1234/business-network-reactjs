import React from "react";
import Cancel from "../../public/assests/icons/cancel.svg";
import Navigation from "../../public/assests/icons/navigation.svg";
import Calendar from "../../public/assests/icons/calendar.svg";
const QrPopup = ({ showModal, handleModalClose,handleSubmit,dateChange }) => {
  const sendValue = () => {
    handleModalClose(false); // Call the parent's function
  };
  return showModal ? (
    <div className="qr-modal">
      <div className="modal-content">
        <span className="close" onClick={sendValue}>
          <Cancel />
        </span>
        <h1>Quotation Acceptance Send</h1>
        <p>Details has been successfully submitted. Thanks!</p>
        <div className="input__group mt-10">
          <label htmlFor="BusinessInpt">Expected Delivery Date</label>
          <input type="date" id="BusinessInpt" onChange={(e)=>dateChange(e.target.value)}/>
        </div>
        <div className="input__group">
          <label htmlFor="commentRow">Comments</label>
          <textarea rows={3} id="commentRow" />
        </div>
        <button className="green__btn" onClick={()=>handleSubmit()}>
          <Navigation />
          Submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default QrPopup;
