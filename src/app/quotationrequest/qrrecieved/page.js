import Pagenavigation from "@/components/Pagenavigation";
import React from "react";
import QrRecieved from "./QrRecieved";
import HoldIcon from "../../../../public/assests/icons/hold.svg"

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Recieved"];
  const urlList = ["/", "/quotationrequest"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Quotation Request"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
      </div>
      <div className="w-full mt-6 table-container">
        <div className="filter-group-secondary">
          <h1>QR ID <span>#2024ABC</span></h1>
          <h1>Name: <span>Earthy Delights Trading</span></h1>
          <h1>Requested Date: <span>18/10/2024</span></h1>
          <h1>Total Items:<span>10</span></h1>
          <div className="btn_grp">
            <button className="outer__btn"><HoldIcon/>Hold</button>
            <button className="cancel_btn_secondary">Reject</button>
          </div>
        </div>
        <QrRecieved />
      </div>
    </div>
  );
};

export default Page;
