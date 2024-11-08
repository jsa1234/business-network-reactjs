import React from "react";
import Package from "../../public/assests/icons/package.svg";
import ArrowRight from "../../public/assests/icons/arrow-right.svg";
const StockCard = ({mode}) => {
  return (
    <div className={`stock ${mode=='low'?'stock_low':mode=='medium'?"stock_med":'stock_high'} col-span-4`}>
      <div className="stock__content">
        <p>STOCK STATUS</p>
        <Package/>
        <div className="stock_total_user">
          <h4>{mode=='medium'?'Total Buyers':'Total Suppliers'}</h4>
          <h1>120</h1>
        </div>
        <div className="vl"></div>
        <div className="stock_total_user">
          <h4>Total Products</h4>
          <h1>28</h1>
        </div>
      </div>
      <ArrowRight/>
    </div>
  );
};

export default StockCard;
