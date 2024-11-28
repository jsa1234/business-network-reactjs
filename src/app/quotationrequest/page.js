"use client"
import Pagenavigation from "@/components/Pagenavigation";
import React from "react";
import QuotationRequest from "./QuotationRequest";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request"];
  const urlList = ["/", "/quotationrequest/qrrecieved"];
  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );
  const router=useRouter();
  const handleClick=()=>{
    router.push(`managenetwork/trading?uuid=${VendorMasterUUID}&type=open`)
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
        <button className="primary__btn mt-6"
         onClick={handleClick}>Add New
          Open Quotation</button>
      </div>
      <div className="w-full mt-6">
        <QuotationRequest />
      </div>
    </div>
  );
};

export default Page;