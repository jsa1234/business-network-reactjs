"use client";
import React, { useEffect } from "react";
import StockCard from "./StockCard";
import DashBoardTable from "./DashBoardTable";
import { useRouter } from "next/navigation";
import DashBoardChart from "./DashBoardChart";
import CommonApi from "@/api/CommonApi";

const Dashboard = () => {
  const router = useRouter();
  const handleBtnCLick = (value) => {
    router.push(`/stockdetails?status=${value}`);
  };
  useEffect(() => {
    callAPi();
  }, []);

  async function callAPi() {
    let data = await CommonApi.getData("products");
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mb-6">
        <StockCard mode="low" btnClick={()=>handleBtnCLick('low')} />
        <StockCard mode="medium" btnClick={()=>handleBtnCLick('medium')} />
        <StockCard mode="high" btnClick={()=>handleBtnCLick('high')} />
      </div>
      <DashBoardChart />
      <div className="table-container mt-6">
        <DashBoardTable />
      </div>
    </>
  );
};

export default Dashboard;
