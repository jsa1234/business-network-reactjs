"use client";
import { useEffect, useState } from "react";
import DetailsBuyer from "./DetailsBuyer";
import Pagenavigation from "@/components/Pagenavigation";
import Image from "next/image";
import CommonApi from "@/api/CommonApi";
import { useSelector } from "react-redux";
function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Networks"];
  const urlList = ["/", "/dashboard", ""];
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("stock");
  const [details, setDetails] = useState([]);
  const myNetwork = useSelector((state) => state.managenetwork.myNetwork);
  const [networkDetails,setnetworkDetails]=useState({});
  const [vendorDetails,setVendorDetails]=useState({});

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
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
    
    <div className="bus__body w-full pl-9 mt-6 pr-3">
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
    
    <div className="flex mt-6 background">
        <button
          className={`tab flex items-center justify-center gap-2 p-2 rounded-md relative ${
            activeTab === "stock"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("stock")}
        >
          {/* <DocIcon /> */}
          <span className="relative">
            Stock Details{" "}
          </span>
        </button>
        {/* <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2 relative ${
            activeTab === "send"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("send")}
        >        
          <span className="relative">
            QR Send
           
          </span>
        </button> */}

      </div>
      <DetailsBuyer/>
      </div>
    
  );
}

export default Page;
