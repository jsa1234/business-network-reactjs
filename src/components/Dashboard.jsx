"use client"
import React, { useEffect, useState } from "react"
import StockCard from "./StockCard"
import DashBoardTable from "./DashBoardTable"
import { useRouter } from "next/navigation"
import DashBoardChart from "./DashBoardChart"
import CommonApi from "@/api/CommonApi"
import { useDispatch, useSelector } from "react-redux"
import { setStock } from "@/store/stockSlice"

const Dashboard = () => {
  const dispatch = useDispatch();
  const [vendorDetails,setVendorDetails]=useState({});


  const [lowStockData, setLowStockData] = useState({})
  const [avgStockData, setAvgStockData] = useState({})
  const [moreStockData, setMoreStockData] = useState({})

  const router = useRouter()
  const handleBtnCLick = async (value) => {
    await dispatch(setStock({
      stockStatus:value
    }));
    router.push(`/stockdetails`);
  }
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      getLow();
      getAvg();
      getMore();
    }
  }, [vendorDetails]); 
  // useEffect(() => {
  //   debugger;
  //   setVendorDetails(sessionStorage.getItem("vendorDetails"));
  //   debugger;
  //   getLow()
  //   getAvg()
  //   getMore()
  // }, [])

  // low stock api
  async function getLow() {
    try {
      console.log(vendorDetails);
      const res = await CommonApi.getData(
        `Stock/vendor/${vendorDetails.vendorMasterUUId}/get-less-stock-status`,
        {},
        {}
      )
      setLowStockData(res.data[0])
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  // average stock api
  async function getAvg() {
    try {
      const res = await CommonApi.getData(
        `Stock/vendor/${vendorDetails.vendorMasterUUId}/get-average-stock-status`,
        {},
        {}
      )
      setAvgStockData(res.data[0])
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  // more stock api
  async function getMore() {
    try {
      const res = await CommonApi.getData(
        `Stock/vendor/${vendorDetails.vendorMasterUUId}/get-more-stock-status`,
        {},
        {}
      )
      setMoreStockData(res.data[0])
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  // async function callAPi() {
  //   let data = await CommonApi.getData("products");
  // }
  if (Object.keys(vendorDetails).length==0) {
    return <div>Loading...</div>;  // Handle loading state or error
  }
  return (
    <>
      <div className='grid grid-cols-12 gap-4 mb-6'>
        <StockCard
          mode='low'
          btnClick={(e) => handleBtnCLick("low")}
          data={lowStockData}
        />
        <StockCard
          mode='medium'
          btnClick={(e) => handleBtnCLick("medium")}
          data={avgStockData}
        />
        <StockCard
          mode='high'
          btnClick={(e) => handleBtnCLick("high")}
          data={moreStockData}
        />
      </div>
      <DashBoardChart />
      <div className='table-container mt-6'>
        <DashBoardTable />
      </div>
    </>
  )
}

export default Dashboard
