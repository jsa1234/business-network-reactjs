"use client";
import Pagenavigation from "@/components/Pagenavigation";
import Stockdetails from "./Stockdetails";
import { useEffect, useState } from "react";
function Page() {
  const [vendorDetails, setVendorDetails] = useState({});
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails)); // Parse if it's a JSON string
    }
  }, []);
  const urlList = ["/", "/stockdetails"];
  return (
    <>
      <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
        <div className="flex justify-between">
          <div className="w-full md:w-1/2">
            <Pagenavigation pageName="Stock Details" urlList={urlList} />
            <p className="text-gray-600">
              Hi, {vendorDetails.companyName}. Welcome back to Olopo
            </p>
          </div>
        </div>
        <div className="w-full mt-6">
          <Stockdetails />
        </div>
      </div>
    </>
  );
}
export default Page;