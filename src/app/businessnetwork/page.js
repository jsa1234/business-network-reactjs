"use client";
import Pagenavigation from "@/components/Pagenavigation";
import React, { Suspense, useEffect, useState } from "react";
import BusinessNetwork from "./BusinessNetwork";

function Page() {
  const [vendorDetails,setVendorDetails]=useState({});

  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Build My Network Connections"
            message={`Hi ${vendorDetails.companyName}. Welcome back to Olopo`}
          />
        </div>
      </div>
      <div className="w-full mt-6">
        {/* Wrap BusinessNetwork with Suspense */}
        <Suspense fallback={<div>Loading Business Network...</div>}>
          <BusinessNetwork />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
