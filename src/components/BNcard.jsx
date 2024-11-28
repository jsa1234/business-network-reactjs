"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Connect from "../../public/assests/icons/connect.svg";
import { useSelector } from "react-redux";

const BNcard = ({
  name,
  gst_number,
  contact,
  address,
  vendor,
  buttonClick,
  vendorUUID,
}) => {
  const [vendorDetails,setVendorDetails]=useState({});
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  // const VendorMasterUUID = useSelector(
  //   (state) => state.vendor.VendorMasterUUID
  // );

  return (
    <div className="bncard col-span-12 md:col-span-6 lg:col-span-4">
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
          <button
            className="secondary__btn pl-9 pr-9"
            onClick={() => buttonClick(vendorDetails.vendorMasterUUId, vendorUUID)}
          >
            <Connect />
            Connect
          </button>
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
