"use client";
import Pagenavigation from "@/components/Pagenavigation";
import React, { useEffect, useState } from "react";
import QrRecieved from "./QrRecieved";
import CommonApi from "@/api/CommonApi";
const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Recieved"];
  const urlList = ["/", "/quotationrequest"];
  const [uuid,setUuid]=useState('');
  const [headData,setHeadData]=useState({});
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
        <QrRecieved />
      </div>
    </div>
  );
};

export default Page;
