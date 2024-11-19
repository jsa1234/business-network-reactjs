import React from "react";
import Cancel from "../../public/assests/icons/cancel.svg";
import Navigation from "../../public/assests/icons/navigation.svg";
import HoldIcon from "../../public/assests/icons/hold.svg";
const QrPopup = ({mode, showModal, handleModalClose,handleSubmit,dateChange,commentsChange }) => {
  const sendValue = () => {
    handleModalClose(false); // Call the parent's function
  };
  return showModal ? (
    <div className="qr-modal">
      <div className="modal-content">
        <span className="close" onClick={sendValue}>
          <Cancel />
        </span>
        <h1>
          {
          mode=='accept'?
          "Quotation Acceptance Send":
          mode=='hold'?
          "Quotation Item Hold":
          "Quotation Item Reject"

          }
          </h1>
        <p>{
          mode=='accept'?
          "Details has been successfully submitted. Thanks!":
          mode=='hold'?
          "Enter the reason for hold.":
          "Enter the reason for rejection."

          }</p>
        <div className="input__group mt-10">
          <label htmlFor="BusinessInpt">{mode=='accept'?"Expected Delivery Date":"Reason"}</label>
          {
          mode=='accept'?
          <input type="date" id="BusinessInpt" onChange={(e)=>dateChange(e.target.value)}/>:
          mode=='hold'?
          <select onChange={(e)=>{commentsChange(e.target.value)}}>
            <option>Choose</option>
          </select>:
          <select onChange={(e)=>{commentsChange(e.target.value)}}>
            <option>Choose</option>
          </select>
          }
        </div>
        <div className="input__group">
          <label htmlFor="commentRow">Comments</label>
          <textarea rows={3} id="commentRow" onChange={(e)=>{commentsChange(e.target.value)}}/>
        </div>
  {
          mode=='accept'?
          <button className="green__btn" onClick={()=>handleSubmit('send')}>
          <Navigation />
          Submit
        </button>:
          mode=='hold'?
          <button className="outer__btn" onClick={()=>handleSubmit('hold')}><HoldIcon/>Hold</button>
            :
            <button className="cancel_btn_secondary" onClick={()=>handleSubmit('reject')}>Reject</button>          }
      </div>
    </div>
  ) : (
    ""
  );
};

export default QrPopup;
