"use client";
import { useState } from "react";
import DetailsBuyer from "./DetailsBuyer";
import Pagenavigation from "@/components/Pagenavigation";
import Image from "next/image";
function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Networks"];
  const urlList = ["/", "/dashboard", ""];
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("stock");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
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
              <Pagenavigation pageName={'earthy'} />
            </div>
            <p className="text-[14px] text-slate-400 ml-[48px]">
              GST No. <span className="font-bold text-black">{'GST3210012j11'}</span>
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
    </>
  );
}

export default Page;
