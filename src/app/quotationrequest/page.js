"use client"
import Pagenavigation from "@/components/Pagenavigation";
import React, { useEffect, useState } from "react";
import QuotationRequest from "./QuotationRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setmyNetwork } from "@/store/manageNetworkSlice";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request"];
  const urlList = ["/", "/quotationrequest/qrrecieved"];
  const [vendorDetails,setVendorDetails]=useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  const router=useRouter();
  const handleClick = async () => {
 
        if(vendorDetails.vendorType==1){
          await dispatch(setmyNetwork({
            vendorMstrUID:vendorDetails.vendorMasterUUId,
            type:'open'
          }));
          router.push(`/managenetwork/trading`)
        }else{
          await dispatch(setmyNetwork({
            vendorMstrUID:vendorDetails.vendorMasterUUId,
            type:'open'
          }));
          router.push(`/managenetwork/stock-details-buyer`)
        }
      };
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
        {vendorDetails?.vendorType==2
        ?      
        <button className="primary__btn mt-6"
        onClick={handleClick}>Add New
          Open Quotation</button>:""
      }
      </div>
      <div className="w-full mt-6">
        <QuotationRequest />
      </div>
    </div>
  );
};

export default Page;