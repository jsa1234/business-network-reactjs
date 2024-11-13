"use client";
import Pagenavigation from "@/components/Pagenavigation";
import React, { useEffect, useState } from "react";
import QrRecieved from "./QrRecieved";
import HoldIcon from "../../../../public/assests/icons/hold.svg"
import { useSearchParams } from "next/navigation";
import CommonApi from "@/api/CommonApi";
import { format } from 'date-fns';
const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Recieved"];
  const urlList = ["/", "/quotationrequest"];
  const searchParams = useSearchParams();
  const [uuid,setUuid]=useState('');
  const [headData,setHeadData]=useState({});
  useEffect(()=>{
    const myProp = searchParams.get("uuid");
    setUuid(myProp);
    fetchData(myProp);
  },[]);
const fetchData= async (uid)=>{
  let data = await CommonApi.getData(
    `Quotation/vendor/${uid}/request`,
    {},
    { status: 1 }
  );
  setHeadData(data);
}
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
          <h1>QR ID <span>{headData.quotationRequestId}</span></h1>
          <h1>Name: <span>{headData.companyName}</span></h1>
          <h1>Requested Date: <span>{format(new Date(headData.requestDate||Date()), 'dd-MM-yyyy')}</span></h1>
          <h1>Total Items:<span>{headData.totalItems}</span></h1>
          <div className="btn_grp">
            <button className="outer__btn"><HoldIcon/>Hold</button>
            <button className="cancel_btn_secondary">Reject</button>
          </div>
        </div>
        <QrRecieved qrUuid={uuid}/>
      </div>
    </div>
  );
};

export default Page;
