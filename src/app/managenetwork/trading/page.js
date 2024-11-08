"use client";
import Image from "next/image";
import Pagenavigation from "@/components/Pagenavigation";
import Buttons from "@/components/Buttons/Buttons";
import { useState } from "react";
import { Tabs } from "@mui/material";
import Tabletabs from "@/components/Tabletabs";
import Trading from "./Trading";
import Stockdetails from"../../../../public/assests/icons/stockdetails.svg"
import Supplierdetails from"../../../../public/assests/icons/supplierdetails.svg"
function Page() {
  const [selectedOption, setSelectedOption] = useState("");
    const [activeTab, setActiveTab] = useState("approval");

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
  return (
    <>
      <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <div className="flex items-center mr-2">
              <Image
                src="/assests/trading.png"
                alt="trading"
                width={35}
                height={35}
                className="mr-4"
              />

              <Pagenavigation pageName="Earthly Delights Trading" />
            </div>
            <p className="text-[14px] text-slate-400 ml-[48px]  ">
              GST No.
              <span className="font-bold text-black">GSTN10247894BS</span>
            </p>
          </div>
        </div>
        <div>
         <div className="flex space-x-4 mt-6 background">
          <button
            className={`tab flex items-center justify-center gap-2 p-2 rounded-md ${
              activeTab === "approval"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                : ""
            }`}
            onClick={() => setActiveTab("approval")}
          >
           <Stockdetails/>
            <span >Stock Details</span>
          </button>
          <button
            className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
              activeTab === "request"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                : ""
            }`}
            onClick={() => setActiveTab("request")}
          >
           <Supplierdetails/>
            <span>Supplier Details</span>
          </button>
        </div> 
        
        
        {/*   {renderTableData()} */}
        <Trading
        activeTab={activeTab}
        />
        </div>
      </div> 
     
    </>
  );
}
export default Page;
