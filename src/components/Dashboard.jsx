import React from "react";
import StockCard from "./StockCard";
import DashBoardTable from "./DashBoardTable";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <StockCard mode="low" />
        <StockCard mode="medium" />
        <StockCard mode="high" />
      </div>
      <div className="table-container mt-6">
        <DashBoardTable />
      </div>
    </>
  );
};

export default Dashboard;
