"use client";
import Buttons from "@/components/Buttons/Buttons";
import Pagenavigation from "@/components/Pagenavigation";
import { useState } from "react";
import Link from "next/link";
import { Tabs } from "@mui/material";
import Managework from "./managenetwork/Managework";
import Approvalpending from "../../../public/assests/icons/approvalpending.svg";
import Requestpending from "../../../public/assests/icons/requestpending.svg";
import Viewnetwork from "../../../public/assests/icons/viewnetwork.svg";
import Network from "../../../public/assests/icons/network.svg"
function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Networks"];
  const urlList = ["/", "/dashboard", ""];
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("approval");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Manage Networks"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
         {/*  <Link href="/managenetwork/mynetwork">
            <button className="primary__btn">
              <Viewnetwork />
              View My Networks
            </button>
          </Link> */}
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex space-x-4 mt-6 background">
        <button
            className={`tab flex items-center justify-center gap-2 p-2 rounded-md ${
              activeTab === "network"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                : ""
            }`}
            onClick={() => setActiveTab("network")}
          >
            <Network />
            <span>My Network</span>
          </button>
          <button
            className={`tab flex items-center justify-center gap-2 p-2 rounded-md ${
              activeTab === "approval"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                : ""
            }`}
            onClick={() => setActiveTab("approval")}
          >
            <Approvalpending />
            <span>Approval Pending</span>
          </button>
          <button
            className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
              activeTab === "request"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
                : ""
            }`}
            onClick={() => setActiveTab("request")}
          >
            <Requestpending />
            <span>Request Pending</span>
          </button>
        </div>

        {/*  {renderTableData()} */}
        <Managework activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Page;
