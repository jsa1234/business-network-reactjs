"use client";
import Image from "next/image";
import Pagenavigation from "@/components/Pagenavigation";
import { useEffect, useState } from "react";
import Trading from "./Trading";
import Stockdetails from "../../../../public/assests/icons/stockdetails.svg";
import Supplierdetails from "../../../../public/assests/icons/supplierdetails.svg";
import CommonApi from "@/api/CommonApi";
import { useSelector } from "react-redux";

function Page() {
  // Manage tab state in the Page component and pass it down as props
  const [activeTab, setActiveTab] = useState("approval");
  const [details, setDetails] = useState([]);
  const myNetwork = useSelector((state) => state.managenetwork.myNetwork);
  const [networkDetails,setnetworkDetails]=useState({});
  const [vendorDetails,setVendorDetails]=useState({});
  useEffect(() => {
    if (myNetwork) {
      setnetworkDetails(myNetwork);
    }
  }, [myNetwork]);
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(networkDetails).length>0) {
      // const myProp = searchParams.get("uuid");
    
    getDetails();
    }
  }, [vendorDetails,networkDetails]); 
  // useEffect(() => {
  //   const myProp = searchParams.get("uuid");
  //   getDetails(myProp);
  // }, []);
  async function getDetails() {
    let data = await CommonApi.getData(
      `ManageNetwork/supplier/${networkDetails.vendorMstrUID}/details`,
      {       
      }
    );
    setDetails(data.data);
  }
  return (
    
      <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <div className="flex items-center mr-2">
              <Image
                src="/assests/trading.png"
                alt="trading"
                width={45}
                height={45}
                className="mr-4"
              />
              <Pagenavigation pageName={details.companyName} />
            </div>
            <p className="text-[14px] text-slate-400 ml-[48px]">
              GST No. <span className="font-bold text-black">{details.gstNo}</span>
            </p>
          </div>
        </div>
        <div>
          {/* Tab buttons */}
          <div className="flex mt-6 background">
            <button
              className={`tab flex items-center justify-center gap-2 p-2 rounded-md ${
                activeTab === "approval"
                  ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                  : ""
              }`}
              onClick={() => setActiveTab("approval")}
            >
              <Stockdetails />
              <span>Stock Details</span>
            </button>
            <button
              className={`tab flex items-center justify-center p-2 rounded-md gap-2 ${
                activeTab === "request"
                  ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                  : ""
              }`}
              onClick={() => setActiveTab("request")}
            >
              <Supplierdetails />
              <span>Supplier Details</span>
            </button>
          </div>

          {/* Pass the activeTab as props to the Trading component */}
          <Trading activeTab={activeTab} />
        </div>
      </div>
   
  );
}

export default Page;
