import Image from "next/image";
import React from "react";
import ChevronIcon from "../../public/assests/icons/chevron-right-icon.svg";

const Networkcard = ({ mode, name, gst,contact, vender,address }) => {
  return (
    <div
    className={`networkcard ${
      mode == "request"
        ? "qr_request"
        : mode == "send"
        ? "qr_send"
        : mode == "hold"
        ? "qr_hold"
        : "qr_reject"
    }`}
  >
     <div className="qrcard__img">
        <Image
          src="/assests/trading.png"
          alt="trading"
          width={45}
          height={45}
          className="mr-4"
        />
      </div>
      <div className="vl"></div>
      <div className="qrcard__content">
        <h1>{name}</h1>
        <div className="qrcard__content__body">
          <table>
            <tbody>
              <tr>
                <td>
                GST No.
                  <span className="bold">{gst}</span>
                </td>
              </tr>
              <tr>
                <td>
                Contact No.:<span className="bold">{contact}</span>
                </td>
              </tr>
              <tr>
                <td>
                Address:<span className="bold">{address}</span>
                </td>
              </tr>
              <tr>
                <td>
                Vendor Type:<span className="bold">{vender}</span>
                </td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
      <div className="qrcard__details">
        <ChevronIcon />
      </div>
    
    </div>
  );
};

export default  Networkcard ;
