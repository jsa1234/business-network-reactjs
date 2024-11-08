"use client";
import React from "react";
import StockCard from "./StockCard";
import DashBoardTable from "./DashBoardTable";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const handleBtnCLick = () => {
    router.push("/stockdetails");
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <StockCard mode="low" btnClick={handleBtnCLick} />
        <StockCard mode="medium" btnClick={handleBtnCLick} />
        <StockCard mode="high" btnClick={handleBtnCLick} />
      </div>
      <div className="table-container mt-6">
        <DashBoardTable />
      </div>
    </>
  );
};

export default Dashboard;
