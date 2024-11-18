"use client";

import Dashboard from "@/components/Dashboard";
import Pagenavigation from "@/components/Pagenavigation";
import { useSelector } from "react-redux";

function Page() {
  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );
  const urlList = ["/", "/dashboard", ""];

  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div>
        <h1>VendorMasterUUID: {VendorMasterUUID}</h1>
      </div>

      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Dashboard"
            message="Hi, MS Market. Welcome back to Olopo"
          />
        </div>
      </div>
      <div className="w-full mt-6">
        <Dashboard />
      </div>
    </div>
  );
}

export default Page;
