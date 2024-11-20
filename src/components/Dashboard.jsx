"use client";
import React, { useEffect, useState } from "react";
import StockCard from "./StockCard";
import DashBoardTable from "./DashBoardTable";
import { useRouter } from "next/navigation";
import DashBoardChart from "./DashBoardChart";
import CommonApi from "@/api/CommonApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );

  const [lowStockData, setLowStockData] = useState({});
  const [avgStockData, setAvgStockData] = useState({});
  const [moreStockData, setMoreStockData] = useState({});

  const router = useRouter();
  const handleBtnCLick = (value) => {
    router.push(`/stockdetails?status=${value}`);
  };
  useEffect(() => {
    getLow();
    getAvg();
    getMore();
  }, []);

  // low stock api
  async function getLow() {
    try {
      const res = await CommonApi.getData(
        `Stock/vendor/${VendorMasterUUID}/get-less-stock-status`,
        {},
        {}
      );
      setLowStockData(res.data[0]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // average stock api
  async function getAvg() {
    try {
      const res = await CommonApi.getData(
        `Stock/vendor/${VendorMasterUUID}/get-average-stock-status`,
        {},
        {}
      );
      setAvgStockData(res.data[0]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // more stock api
  async function getMore() {
    try {
      const res = await CommonApi.getData(
        `Stock/vendor/${VendorMasterUUID}/get-more-stock-status`,
        {},
        {}
      );
      setMoreStockData(res.data[0]);
      console.log(res[0]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  async function callAPi() {
    let data = await CommonApi.getData("products");
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mb-6">
        <StockCard mode="low" btnClick={(e)=>handleBtnCLick("low")} data={lowStockData} />
        <StockCard
          mode="medium"
          btnClick={(e)=>handleBtnCLick("medium")}
          data={avgStockData}
        />
        <StockCard mode="high" btnClick={(e)=>handleBtnCLick("high")} data={moreStockData} />
      </div>
      <DashBoardChart />
      <div className="table-container mt-6">
        <DashBoardTable />
      </div>
    </>
  );
};

export default Dashboard;
