import Image from "next/image";
import React from "react";

import ChevronIcon from "../../public/assests/icons/chevron-right-icon.svg";
import Link from "next/link";

const Networkcard = ({ name, gst, contact, address, vender }) => {
  return (
    <div className="netcard col-span-4 mt-4 mb-4">
      <div className="bncard__header mb-4">
        <div className="qrcard__img">
          <Image
            src="/assests/trading.png"
            alt="trading"
            width={45}
            height={45}
            className="mr-4"
          />
        </div>
        <div className="vll"></div>
        <div className="flex items-center gap-3">
          <h1>{name}</h1>
          <div className="qrcard__details_2">
            <Link href="/managenetwork/trading">
              <ChevronIcon />
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="container mt-4 text-lg font-normal flex flex-col">
  <div className="flex justify-between">
    <div className="text-left w-[150px] text-[#777777]">GST No.:</div>
    <div className="text-left flex-1">{gst}</div>
  </div>

  <div className="flex justify-between">
    <div className="text-left w-[150px] text-[#777777]">Contact No.:</div>
    <div className="text-left flex-1">{contact}</div>
  </div>

  <div className="flex justify-between">
    <div className="text-left w-[150px] text-[#777777]">Address:</div>
    <div className="text-left flex-1">{address }</div>
  </div>

  <div className="flex justify-between">
    <div className="text-left w-[150px] text-[#777777]">Vendor Type:</div>
    <div className="text-left flex-1">{vender}</div>
  </div>
</div>

    </div>
  );
};

export default Networkcard;
