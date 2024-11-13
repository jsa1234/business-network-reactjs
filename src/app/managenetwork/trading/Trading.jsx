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
import TotalRate from "@/components/TotalRate";
import CommonApi from "@/api/CommonApi";

function Trading(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("approval");
  const [stock, setStock] = useState([]);
  const [details, setDetails] = useState([]);


  useEffect(() => {
    getStock();
  }, []);

  async function getStock() {
    let data = await CommonApi.getData(
      "ManageNetwork/vendors/{0EA46866-1C70-4AF5-B3E1-F1F2A9E23CD3}/stock",
      {},
      {
        VendorUUId: "0EA46866-1C70-4AF5-B3E1-F1F2A9E23CD3",
      }
    );
    console.log("MG.jsx", data);
    // Ensure stock is always an array
    setStock(Array.isArray(data) ? data : []);
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderTableData = () => {
    const theadContent =
      activeTab === "request" ? (
        <thead>
          <tr></tr>
        </thead>
      ) : (
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Qty</th>
            <th>Remaining Qty</th>
            <th>Original Price</th>
            <th>Offer Price</th>
            <th>Action</th>
          </tr>
        </thead>
      );

    const tableBodyContent =
      activeTab === "approval" ? (
        <tbody className="text-left">
          {Array.isArray(stock) && stock.length > 0 ? (
            stock.map((row, index) => (
              <tr key={`approval_${index}`}>
                <td>{row.productName || "--"}</td>
                <td>
                  <Typography variant="body2" sx={{ color: "orange" }}>
                    {/* Calculate progress based on total and remaining quantity */}
                    {row.totalQuantity
                      ? `${Math.round(
                          ((row.totalQuantity - row.remainingQuantity) /
                            row.totalQuantity) *
                            100
                        )}%`
                      : "0%"}
                  </Typography>
                  <Box sx={{ width: "100%", height: "50%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={
                        row.totalQuantity
                          ? ((row.totalQuantity - row.remainingQuantity) /
                              row.totalQuantity) *
                            100
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
                </td>
                <td>{row.remainingQuantity || "--"}</td>
                <td>{row.originalPrice || "--"}</td>
                <td>
                  <div className="trading-box">{row.offerPrice || "--"}</div>
                </td>
                <td>
                  <Buttons />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No stock data available
              </td>
            </tr>
          )}
        </tbody>
      ) : (
        <div className="flex flex-col ml-[4rem] mr-[4rem]">
          <div className="flex flex-row border-b border-gray-300 p-4">
            <h1 className="text-xl w-[100px]">
              <Businessname />
            </h1>
            <h2 className="w-[100px] text-lg font-semibold">Business Name</h2>
            <h3 className="text-md w-[400px] text-lg">

              Earthly Delights Trading
            </h3>
          </div>

          <div className="flex flex-row border-b border-gray-300 p-4">
            <h1 className="text-xl w-[100px]">
              <Address />
            </h1>
            <h2 className="w-[100px] text-lg font-semibold pr-4">Address:</h2>
            <h3 className="text-md w-[400px] text-lg">123 457 2587</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4">
            <h1 className="text-xl w-[100px]">
              <Contact />
            </h1>
            <h2 className="w-[100px] text-lg font-semibold pr-4">
              Contact No:
            </h2>
            <h3 className="text-md w-[400px] text-lg">123 457 2587</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4">
            <h1 className="text-xl w-[100px]">
              <Contactperson />
            </h1>
            <h2 className="w-[100px] text-lg font-semibold pr-4">
              Contact Person:
            </h2>
            <h3 className="text-md w-[400px] text-lg">Zubin Basher</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4">
            <h1 className="text-xl w-[100px]">
              <Email />
            </h1>
            <h2 className="w-[100px] text-lg font-semibold pr-4">Email ID:</h2>
            <h3 className="text-md w-[400px] text-lg">supplier@mail.com</h3>
          </div>
        </div>
      );

    return (
      <table className="table w-full rounded-tr-lg">
        {theadContent}
        {tableBodyContent}
      </table>
    );
  };

  return (
    <>
      <div className="w-full table-container2">{renderTableData()}</div>
    </>
  );
}

export default Trading;
