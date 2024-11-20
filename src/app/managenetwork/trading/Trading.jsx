"use client";
import Buttons from "@/components/Buttons/Buttons";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import Businessname from "../../../../public/assests/icons/businessname.svg";
import Address from "../../../../public/assests/icons/address.svg";
import Contact from "../../../../public/assests/icons/contact.svg";
import Contactperson from "../../../../public/assests/icons/contactperson.svg";
import Email from "../../../../public/assests/icons/email.svg";
import CommonApi from "@/api/CommonApi";

function Trading({ activeTab }) {
  const [stock, setStock] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getStock();
    getDetails();
  }, []);

  async function getStock() {
    let data = await CommonApi.getData(
      "Stock/vendor/C34E50DF-6B95-4228-85F0-14D7B7AC778B/stock",
      {},
      {
       
        PageSize:5,//need to be dynamic
        PageNumber:1//need to be dynamic
      }
     
    );
    setStock(data.data.stockDetails || []);
  }

  async function getDetails() {
    let data = await CommonApi.getData(
      "ManageNetwork/supplier/C34E50DF-6B95-4228-85F0-14D7B7AC778B /details",
      {
       
      }
    );
    setDetails(data.data);
  }

  const renderTableData = () => {
    if (activeTab === "request") {
      return (
        <div className="flex flex-col ml-[4rem] mr-[4rem] pt-4 pb-4">
        {Object.keys(details).length > 0 ? (
          <>
            {/* Business Name */}
            <div className="flex flex-row border-b border-gray-300 p-4">
              <h1 className="text-xl w-[100px]">
                <Businessname />
              </h1>
              <h2 className="w-[150px] text-lg font-semibold">Business Name:</h2>
              <h3 className="text-md w-[400px] text-lg">{details.companyName || "--"}</h3>
            </div>
      
            {/* Address */}
            <div className="flex flex-row border-b border-gray-300 p-4">
              <h1 className="text-xl w-[100px]">
                <Address />
              </h1>
              <h2 className="w-[150px] text-lg font-semibold">Address:</h2>
              <h3 className="text-md w-[400px] text-lg">{details.address || "--"}</h3>
            </div>
      
            {/* Contact Number */}
            <div className="flex flex-row border-b border-gray-300 p-4">
              <h1 className="text-xl w-[100px]">
                <Contact />
              </h1>
              <h2 className="w-[150px] text-lg font-semibold">Contact No:</h2>
              <h3 className="text-md w-[400px] text-lg">{details.contactNo || "--"}</h3>
            </div>
      
            {/* Contact Person */}
            <div className="flex flex-row border-b border-gray-300 p-4">
              <h1 className="text-xl w-[100px]">
                <Contactperson />
              </h1>
              <h2 className="w-[150px] text-lg font-semibold">Contact Person:</h2>
              <h3 className="text-md w-[400px] text-lg">{details.contactPerson || "--"}</h3>
            </div>
      
            {/* Email ID */}
            <div className="flex flex-row border-b border-gray-300 p-4">
              <h1 className="text-xl w-[100px]">
                <Email />
              </h1>
              <h2 className="w-[150px] text-lg font-semibold">Email ID:</h2>
              <h3 className="text-md w-[400px] text-lg">{details.email || "--"}</h3>
            </div>
          </>
        ) : (
          <div className="p-4 text-center">No Details Available</div>
        )}
      </div>
      
      );
    }

    return (
      <table className="table w-full rounded-tr-lg">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Remaining Qty</th>
           {/*  <th>Original Price</th>
            <th>Offer Price</th>
            <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {stock.length > 0 ? (
            stock.map((stockDetails, index) => (
              <tr key={`approval_${index}`}>
                <td>{stockDetails.productName || "--"}</td>
               {/*  <td>
                  <Typography variant="body2" sx={{ color: "orange" }}>
                    {row.totalQuantity
                      ? `${Math.round(
                          ((row.totalQuantity - row.remainingQuantity) / row.totalQuantity) * 100
                        )}%`
                      : "0%"}
                  </Typography>
                  <Box sx={{ width: "100%", height: "50%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={
                        row.totalQuantity
                          ? ((row.totalQuantity - row.remainingQuantity) / row.totalQuantity) * 100
                          : 0
                      }
                      sx={{
                        height: "10px",
                        width: "100px",
                        borderRadius: "10px",
                        backgroundColor: "#DEDFE3",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "orange",
                        },
                      }}
                    />
                  </Box>
                </td> */}
                <td>{stockDetails.productUUId || "--"}</td>
                <td>{stockDetails.remainingQuantity || "--"}</td>
                {/* <td>{row.originalPrice || "--"}</td>
                <td>{row.offerPrice || "--"}</td>
                <td><Buttons /></td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No stock data available</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return <div className="w-full table-container2">{renderTableData()}</div>;
}

export default Trading;
