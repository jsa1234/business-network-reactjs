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
import TickIcon from "../../../../public/assests/icons/tick-double.svg";
import { useSearchParams } from "next/navigation";
import TotalRate from "@/components/TotalRate";

function Trading({ activeTab }) {
  const [stock, setStock] = useState([]);
  const [details, setDetails] = useState([]);
  const [vendorMstrUID,setVendorMstrUID]=useState('');
  const searchParams = useSearchParams();
  const [checkList, setCheckList] = useState([]);
  useEffect(() => {
    const myProp = searchParams.get("uuid");
    setVendorMstrUID(myProp);
    getStock(myProp);
    getDetails(myProp);
  }, []);

  async function getStock(uuid) {
    let data = await CommonApi.getData(
      `Stock/vendor/${uuid}/stock`,
      {},
      {      
        PageSize:10,//need to be dynamic
        PageNumber:1//need to be dynamic
      }
     
    );
    setStock(data.data.stockDetails || []);
  }
  const handleRowclick = (value) => {

    console.log(checkList);
    setCheckList((checkList) => {
      if (checkList.includes(value)) {
        return checkList.filter((item) => item !== value);
      } else {
        return [...checkList, value];
      }
    });
  };
  async function getDetails(uuid) {
    let data = await CommonApi.getData(
      `ManageNetwork/supplier/${uuid}/details`,
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
      <>
      <table className="table w-full rounded-tr-lg mb-40">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Remaining Qty</th>
           <th>Original Price</th>
            <th>Offer Price</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {stock.length > 0 ? (
            stock.map((stockDetails, index) => (
              <tr key={`approval_${index}`}>
                <td>{stockDetails.productName || "--"}</td>
                <td>{stockDetails.remainingQuantity || "--"}</td>
                <td> <input className="table__input"></input></td>
                <td> <input className="table__input"></input></td>
                <td><button
                                        className={
                                          checkList.includes(
                                            stockDetails.productUUId 
                                          )
                                            ? "secondary__btn__light"
                                            : "secondary__btn"
                                        }
                                        onClick={() =>
                                          handleRowclick(
                                            stockDetails.productUUId 
                                          )
                                        }
                                      >
                                        <TickIcon />
                                        {!checkList.includes(
                                          stockDetails.productUUId
                                        )
                                          ? "Select"
                                          : ""}
                                      </button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No stock data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <TotalRate/>
      </>
    );
  };

  return <div className="w-full table-container2">{renderTableData()}</div>;
}

export default Trading;
