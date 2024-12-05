"use client"
import React, { useEffect, useState } from "react";
import Cancel from "../../public/assests/icons/cancel.svg";
import Navigation from "../../public/assests/icons/navigation.svg";
import HoldIcon from "../../public/assests/icons/hold.svg";
import CommonApi from "@/api/CommonApi";
const QrPopup = ({mode, showModal, handleModalClose,handleSubmit,dateChange,commentsChange }) => {
  const [reasonList,setReasonList]=useState([]);
  const sendValue = () => {
    handleModalClose(false); // Call the parent's function
  };
  let modeList={
    reject:2,
    hold:3
  }
  useEffect(()=>{
    if(mode!==""){
      getReasonData();
    }
  },[mode]);
  async function getReasonData(){
    try {
      const res = await CommonApi.getData(
        `ManageNetwork/reject/${modeList[mode]}/reason`,
        {},
        {}
      );
      console.log(res);
      if(res?.data.length>0){
        setReasonList(res.data);
      }
      // setReason((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
      // getApprovalPending();
    }
  }
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
            <option value="1" disabled={true}>Choose</option>
            {reasonList.map((row) => (
              <option value={row.reasonId}key={row.reasonId}>{row.reason}</option>
            ))}
            {/* <option>Price to High</option>
            <option>Stock Not Acceptable</option> */}
          </select>:
          <select onChange={(e)=>{commentsChange(e.target.value)}}>
            <option value="1" disabled={true}>Choose</option>
            {reasonList.map((row) => (
              <option value={row.reasonId} key={row.reasonId}>{row.reason}</option>
            ))}
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
