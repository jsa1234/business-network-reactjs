"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TablePaginationActions from "@/components/TablePagination";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import { ChevronRight } from "@mui/icons-material";
import Navigation from "../../../public/assests/icons/navigation.svg";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TickIcon from "../../../public/assests/icons/tick-double.svg";
import Search from "../../../public/assests/icons/search.svg";
import { useSelector } from "react-redux";
import CommonApi from "@/api/CommonApi";
import Loader from "@/components/Loader";

function Stockdetails() {
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [open, setOpen] = React.useState('');
  const [progress, setProgress] = useState(10);
  const [checkList, setCheckList] = useState([]);
  const [param,setParam]=useState('');
  const [loading,setLoading]=useState(false);
  const [stockDetails,setStockDetails]=useState({});
  const [vendorDetails,setVendorDetails]=useState({});
  const StockData = useSelector((state) => state.stock.StockData);
  // const VendorMasterUUID = useSelector(
  //   (state) => state.vendor.VendorMasterUUID
  // );
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    if (StockData) {
      setStockDetails(StockData);
    }
  }, [StockData]);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(stockDetails).length>0) {
      // const myProp = searchParams.get("uuid");
      setParam(stockDetails.stockStatus);
        fetchData()
    }
  }, [vendorDetails,stockDetails]); 
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // useEffect(() => {
  //   const myProp = searchParams.get("status");
  //   setParam(myProp);
  //   fetchData(myProp)
  // }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      let data={data:[]};
      if(stockDetails.stockStatus=='low'){
        data = await CommonApi.getData(
          `Stock/vendor/${vendorDetails.vendorMasterUUId}/get-status-of-less-stock-details`,
          {},
          { }
        );
        console.log(data)
      } else if(stockDetails.stockStatus=='medium'){
        data = await CommonApi.getData(
          `Stock/vendor/${vendorDetails.vendorMasterUUId}/get-status-of-average-stock-details`,
          {},
          { }
        );
      }
      else if(stockDetails.stockStatus=='high'){
        data = await CommonApi.getData(
          `Stock/vendor/${vendorDetails.vendorMasterUUId}/get-status-of-high-stock-details`,
          {},
          { }
        );
      }
      console.log(data)
      setData(data.data);
      // setTotalCount(5);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }finally{
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage,param]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRowEdit = (row, index, key, value) => {
    //handle row edit here
  };
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
  const submitClick=()=>{}
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="w-full table-container">
        <div className="filter-group">
          <div className="form">
            <Search className="fa fa-search"></Search>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
            &nbsp;&nbsp;
            <label className="dropdown-list" htmlFor="dropdown">
              Sort by
            </label>
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

        <TableContainer component={Paper}>
          <Table className="table" aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="left">Total Stock</TableCell>
                <TableCell align="left">Total Suppliers</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <React.Fragment key={row.productUUId}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell component="td" scope="row">
                      {row.productName}
                    </TableCell>
                    <TableCell align="left">{row.totalStock}</TableCell>
                    <TableCell align="left">{row.totalSuppliers}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() =>
                          setOpen(
                            open == row.productUUId ? "" : row.productUUId
                          )
                        }
                      >
                        {open == row.productUUId ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className={open == row.productUUId ? "highlight__row" : ""}
                  >
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={4}
                    >
                      <Collapse
                        in={open == row.productUUId}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <div className="flex items-center justify-between p-2 border-b border-gray-200">
                            <h1 className="text-[16px] font-semibold">
                              Supplier Details
                            </h1>
                            <button
                              className="green__btn"
                              onClick={() => submitClick(row)}
                            >
                              <Navigation />
                              Submit
                            </button>
                          </div>

                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Total Qty</TableCell>
                                <TableCell align="left">Total Qty</TableCell>
                                <TableCell align="left">
                                  Remaining Qty
                                </TableCell>
                                <TableCell align="left">
                                  Original Price
                                </TableCell>
                                <TableCell align="left">Offer Price</TableCell>
                                <TableCell align="left">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row?.quotationDetails.map(
                                (historyRow, index) => (
                                  <TableRow key={`${historyRow.supplierUUId}`}>
                                    <TableCell
                                      align="left"
                                      component="td"
                                      scope="row"
                                    >
                                      {historyRow.supplierName}
                                    </TableCell>
                                    <TableCell>
                                      {/* Display the progress percentage */}
                                      <Typography
                                        variant="body2"
                                        sx={{ color: "orange" }}
                                      >
                                        {`${Math.round(
                                          (historyRow.remainingQty /
                                            historyRow.toatlQty) *
                                            100
                                        )}%`}
                                      </Typography>

                                      <Box
                                        sx={{ width: "100%", height: "50%" }}
                                      >
                                        <LinearProgress
                                          variant="determinate"
                                          value={
                                            (historyRow.remainingQty /
                                              historyRow.toatlQty) *
                                            100
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
                                    </TableCell>

                                    <TableCell align="left">
                                      {historyRow.toatlQty}
                                    </TableCell>
                                    <TableCell align="left">
                                      {historyRow.remainingQty}
                                    </TableCell>
                                    <TableCell align="left">
                                      <input
                                        className="table__input"
                                        value={historyRow.originalPrice}
                                        onChange={(e) =>
                                          handleRowEdit(
                                            historyRow,
                                            index,
                                            "originalPrice",
                                            e.target.value
                                          )
                                        }
                                      ></input>
                                    </TableCell>
                                    <TableCell align="left">
                                      <input
                                        className="table__input"
                                        value={historyRow.offerPrice}
                                        onChange={(e) =>
                                          handleRowEdit(
                                            historyRow,
                                            index,
                                            "offerPrice",
                                            e.target.value
                                          )
                                        }
                                      ></input>
                                    </TableCell>
                                    <TableCell align="right">
                                      <button
                                        className={
                                          checkList.includes(
                                            row.productUUId +
                                              "_" +
                                              historyRow.supplierUUId
                                          )
                                            ? "secondary__btn__light"
                                            : "secondary__btn"
                                        }
                                        onClick={() =>
                                          handleRowclick(
                                            row.productUUId +
                                              "_" +
                                              historyRow.supplierUUId
                                          )
                                        }
                                      >
                                        <TickIcon />
                                        {!checkList.includes(
                                          row.productUUId +
                                            "_" +
                                            historyRow.supplierUUId
                                        )
                                          ? "Select"
                                          : ""}
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
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
    </>
  );
}
export default Stockdetails;
