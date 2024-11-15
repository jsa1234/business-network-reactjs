"use client";
import Pagenavigation from "@/components/Pagenavigation";
import React, { useEffect, useState } from "react";
import QrRecieved from "./QrRecieved";
import { useSearchParams } from "next/navigation";
import CommonApi from "@/api/CommonApi";
const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Recieved"];
  const urlList = ["/", "/quotationrequest"];
  const searchParams = useSearchParams();
  const [uuid,setUuid]=useState('');
  const [headData,setHeadData]=useState({});
  useEffect(()=>{
    const myProp = searchParams.get("uuid");
    setUuid(myProp);
  },[]);
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
        <QrRecieved qrUuid={uuid}/>
      </div>
    </div>
  );
};

export default Page;
