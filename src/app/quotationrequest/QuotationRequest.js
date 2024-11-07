"use client";
import React, { useEffect, useState } from "react";
import DocIcon from "../../../public/assests/icons/google-doc.svg";
import NavIcon from "../../../public/assests/icons/navigation.svg";
import HoldIcon from "../../../public/assests/icons/hold.svg";
import CancelIcon from "../../../public/assests/icons/cancel-icon.svg";
import TableCell from "@mui/material/TableCell";
import TablePaginationActions from "@/components/TablePagination";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Qrcard from "@/components/Qrcard";
import Search from "../../../public/assests/icons/search.svg";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const QuotationRequest = () => {
  let routingList={
    "request":"/quotationrequest/qrrecieved",
    "send":"/quotationrequest/qrsend",
    "hold":"/quotationrequest/qrhold",
    "reject":"/quotationrequest/qrreject",
  }
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState("request");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  useEffect(() => {
    fetchData(activeTab,page, rowsPerPage);
  }, [activeTab,page, rowsPerPage]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const handleQuotationTypeSwitch = (tabname) => {
  //   setActiveTab(tabname);
  // };
  const fetchData = async (reqData, currentPage, rowsPerPage) => {
    try {
      //below code need to integrated when api are ready
      //   const response = await fetch(
      //     // Replace with your server endpoint URL
      //     `your-api-endpoint?page=${currentPage + 1}&rowsPerPage=${rowsPerPage}`
      //   );

      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      let rows=[];
      if(reqData=='request'){ 
        rows = [
        {
          mode: "request",
          name: "Frozen yoghurt",
          date: "05/11/2024",
          fat: 6.0,
          carbs: 24,
          status: "Urgent",
          qrId: 3.99,
        },
        {
          mode: "request",
          name: "Ice cream sandwich",
          date: "05/11/2024",
          fat: 9.0,
          carbs: 37,
          status: "Urgent",
          qrId: 4.99,
        },
        {
          mode: "request",
          name: "Eclair",
          date: "05/11/2024",
          fat: 16.0,
          carbs: 24,
          status: "Urgent",
          qrId: 3.79,
        },
        {
          mode: "request",
          name: "Cupcake",
          date: "05/11/2024",
          fat: 3.7,
          carbs: 67,
          status: "Urgent",
          qrId: 2.5,
        },
        {
          mode: "request",
          name: "Gingerbread",
          date: "05/11/2024",
          fat: 16.0,
          carbs: 49,
          status: "Urgent",
          qrId: 1.5,
        },
      ];
    }
    if(reqData=='send'||reqData=='hold'){
       rows = [
        {
          mode: "send",
          name: "Brownie",
          date: "06/11/2024",
          fat: 12.0,
          carbs: 45,
        },
        {
          mode: "send",
          name: "Donut",
          date: "06/11/2024",
          fat: 14.0,
          carbs: 32,
        },
        {
          mode: "send",
          name: "Muffin",
          date: "06/11/2024",
          fat: 10.0,
          carbs: 50,
        },
        {
          mode: "send",
          name: "Macaron",
          date: "06/11/2024",
          fat: 5.0,
          carbs: 28,
        },
        {
          mode: "send",
          name: "Cheesecake",
          date: "06/11/2024",
          fat: 22.0,
          carbs: 36,
        },
      ];
      
    }
      setData(rows);
      setTotalCount(5);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }
  };
  return (
    <div>
      <div className="flex space-x-4 mt-6 background">
        <button
          className={`tab flex items-center justify-center gap-2 p-2 rounded-md ${
            activeTab === "request"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("request")}
        >
          <DocIcon />
          <span>QR Recived</span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
            activeTab === "send"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("send")}
        >
          <NavIcon />
          <span>QR Send</span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
            activeTab === "hold"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("hold")}
        >
          <HoldIcon />
          <span>QR Hold</span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2  ${
            activeTab === "reject"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("reject")}
        >
          <CancelIcon />
          <span>QR Reject</span>
        </button>
      </div>
      <div className="filter-group">
        <div className="form">
          <Search className="fa fa-search"></Search>
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search Product Name..."
          />
          <label className="dropdown-list">Sort by</label>
          <select id="dropdown" className="dropdownSelect">
            <option value="" className="font-bold text-black">
              Choose
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="quotationwraper grid grid-cols-12 gap-4">
                  {data.map((row) => (
                    <Qrcard
                      key={row.name}
                      mode={row.mode}
                      name={row.name}
                      date={row.date}
                      qritems={row.fat}
                      status={row.status}
                      qrId={row.qrId}
                      navPath={routingList[activeTab]}
                    />
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default QuotationRequest;
