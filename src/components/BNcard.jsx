import Image from "next/image";
import React from "react";
import Connect from "../../public/assests/icons/connect.svg";
const BNcard = () => {
  return (
    <div className="bncard col-span-4">
      <div className="bncard__header">
        <div className="qrcard__img">
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
        <h1>Earthy Delights Trading</h1>
        <button className="secondary__btn pl-9 pr-9" ><Connect/>Connect</button>
      </div>
      </div>
      <hr></hr>
      <table className="border-spacing-10">
        <tbody>

        <tr>
            <td className="table__hdr">GST No.</td>
            <td>#29GGGGG1314R400</td>
        </tr>
        <tr>
            <td className="table__hdr">Contact No.</td>
            <td>#29GGGGG1314R400</td>
        </tr>
        <tr>
            <td className="table__hdr">Address</td>
            <td>1234 Greenway Lane, Suite 567, Springfield, ST 12345</td>
        </tr>
        <tr>
            <td className="table__hdr">Vendor Type</td>
            <td>Seller</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BNcard;
