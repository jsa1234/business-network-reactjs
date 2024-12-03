"use client"; // Ensures this component is a client-side component

import Dashboard from "@/components/Dashboard";
import Pagenavigation from "@/components/Pagenavigation";
import { useRouter } from "next/navigation"; // Use next/navigation for router in app directory
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Page() {
const [auth,setAuth]=useState(false);
  const urlList = ["/", "/dashboard", ""];
  const [vendorDetails,setVendorDetails]=useState({});
  const router = useRouter(); // Initialize router hook

  useEffect(() => {
    // Get token from sessionStorage
    const token = sessionStorage.getItem("vendorDetails");

    // If no token or token is an empty string, redirect to /login
    if (!token || Object.keys(token).length==0) {
      router.push("/login");
    }else{
      setAuth(true);
    }
  }, [router]); // Dependency array to ensure effect runs on mount
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
if(!auth){
return(<h1>Loading...</h1>)
}
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">

      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Dashboard"
            message={`Hi, ${vendorDetails.companyName}. Welcome back to Olopo`}
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
