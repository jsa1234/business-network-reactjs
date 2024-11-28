"use client"; // Ensures this component is a client-side component

import Dashboard from "@/components/Dashboard";
import Pagenavigation from "@/components/Pagenavigation";
import { useRouter } from "next/navigation"; // Use next/navigation for router in app directory
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Page() {
  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );
  const urlList = ["/", "/dashboard", ""];
  
  const router = useRouter(); // Initialize router hook

  useEffect(() => {
    // Get token from sessionStorage
    const token = sessionStorage.getItem("vendorDetails");

    // If no token or token is an empty string, redirect to /login
    if (!token || Object.keys(token).length==0) {
      router.push("/login");
    }
  }, [router]); // Dependency array to ensure effect runs on mount

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
