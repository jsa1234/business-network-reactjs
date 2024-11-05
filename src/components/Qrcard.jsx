import Image from "next/image";
import React from "react";
import ChevronIcon from "../../public/assests/icons/chevron-right-icon.svg";
import { useRouter } from "next/navigation";

const Qrcard = ({ mode,name, date, status, qritems, qrId ,navPath}) => {
  console.log("navpath",navPath)
  const router=useRouter();
  const handleClick=()=>{
    router.push(navPath);
  }
  return (
    <div className={`qrcard ${mode=='request'?'qr_request':mode=='send'?'qr_send':mode=='hold'?'qr_hold':'qr_reject'}`}onClick={handleClick}>
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
                  Date:<span className="bold">{date}</span>
                </td>
                {status ? (
                  <td>
                    Status: <span className="red">Urgent</span>
                  </td>
                ) : (
                  ""
                )}
              </tr>
              <tr>
                <td>
                  QR Items: <span className="orange">{qritems}</span>
                </td>

                {qrId ? (
                  <td>
                    QR ID:<span className="bold">{qrId}</span>
                  </td>
                ) : (
                  ""
                )}
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

export default Qrcard;
