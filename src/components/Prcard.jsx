import Image from "next/image";
import React from "react";
import ChevronIcon from "../../public/assests/icons/chevron-right-icon.svg";

const Prcard = ({ mode, name, deliverydate, status, prdate,cardClick }) => {
const handlCardClick=()=>{
  cardClick();
}
  return (
    <div
      className={`qrcard ${
        mode == "request"
          ? "qr_request"
          : mode == "send"
          ? "qr_send"
          : mode == "hold"
          ? "qr_hold"
          : "qr_reject"
      } col-span-4`}
      onClick={()=>handlCardClick()}
    >
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
      <div className="qrcard__content">
        <h1>{name}</h1>
        <div className="qrcard__content__body">
          <table>
            <tbody>
              <tr>
                <td>
                  Expt. Delivery Date:
                  <span className="bold">{deliverydate}</span>
                </td>
              </tr>
              <tr>
                <td>
                  PR Date:<span className="bold">{prdate}</span>
                </td>
              </tr>
              <tr>
                <td>
                  Status:
                  {status === "Under Process" ? (
                    <span  style={{color:"#BD6112"}}>Under Process</span>
                  ) : status === "Out for Delivery" ? (
                    <span  style={{color:"#BD6112"}}>Out for Delivery</span>
                  ) : (
                    <span style={{color:"#BD6112"}}>Unknown Status</span>
                  )}
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

export default Prcard;
