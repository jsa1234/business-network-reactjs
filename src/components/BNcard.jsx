import Image from "next/image";
import React from "react";
import Connect from "../../public/assests/icons/connect.svg";
const BNcard = ({name,gst_number,contact,address,vendor,buttonClick}) => {
  return (
    <div className="bncard col-span-4">
      <div className="bncard__header">
        <div className="bncard__img">
          <Image
            src="/assests/trading.png"
            alt="trading"
            width={65}
            height={65}
            className="mr-4"
          />
        </div>
      <div className="vl"></div>
      <div className="flex items-baseline flex-col gap-3">
        <h1>{name}</h1>
        <button className="secondary__btn pl-9 pr-9" onClick={buttonClick}><Connect/>Connect</button>
      </div>
      </div>
      <hr></hr>
      <table className="border-spacing-10">
        <tbody>
        <tr>
            <td className="table__hdr">GST No.</td>
            <td>{gst_number}</td>
        </tr>
        <tr>
            <td className="table__hdr">Contact No.</td>
            <td>{contact}</td>
        </tr>
        <tr>
            <td className="table__hdr">Address</td>
            <td>{address}</td>
        </tr>
        <tr>
            <td className="table__hdr">Vendor Type</td>
            <td>{vendor}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BNcard;
