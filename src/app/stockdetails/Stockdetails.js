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
import { ChevronRight, Navigation } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Buttons from "@/components/Buttons/Buttons";

function Stockdetails() {
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  

  const fetchData = async (currentPage, rowsPerPage) => {
    try {
      // This would be your actual API call:
      // const response = await fetch(`your-api-endpoint?page=${currentPage + 1}&rowsPerPage=${rowsPerPage}`);

      // Example data:
      const rows = [
        {
          name: "Onion ",
          stock: 1500,
          supplier: 4,
          history: [
            {
              name: "Earthly Delights Trading",
              totalqlty: '300',
              remaingprice: "1000",
              originalprice: "300",
              offerprice: "300",
              
            },
          ],
        },
        {
          name: "Onions",
          stock: 15000,
          supplier: 41,
          history: [
            {
              name: "Earthly Delights Trading",
              totalqlty: '300',
              remaingprice: "1000",
              originalprice: "300",
              offerprice: "300",
              
            },
          ],
        },
      ];
      setData(rows);
      setTotalCount(5);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }
  };

  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full table-container">
      <div className="filter-group">
        <div className="form">
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search Product Name..."
          />
        </div>

        <div>
          <label className="dropdown-list">Sort by</label>
          <select
            id="dropdown"
            className="dropdownSelect"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="" className="font-bold text-black">
              Choose
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {selectedOption && <p>You selected: {selectedOption}</p>}
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Total Stock</TableCell>
              <TableCell align="right">Total Suppliers</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.name} row={row} />
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
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 1;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="td" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.stock}</TableCell>
        <TableCell align="right">{row.supplier}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={open ? "highlight__row" : ""}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className="flex items-center justify-between p-2 border-b border-gray-200">
                <h1 className="text-[16px] font-semibold">Supplier Details</h1>
                <button
                  className="green__btn"
                  onClick={(e) => submitClick(e.target.value)}
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
                    <TableCell align="right">Total Qty</TableCell>
                    <TableCell align="right">Remaining Qty</TableCell>
                    <TableCell align="right">Original Price</TableCell>
                    <TableCell align="right">Offer Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={`${historyRow.name}-${index}`}>
                      <TableCell align="left" component="td" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>
                        {/* Display the progress percentage */}
                        <Typography variant="body2" sx={{ color: "orange" }}>
                          {`${Math.round(progress)}%`}
                        </Typography>

                        <Box sx={{ width: "100%", height: "50%" }}>
                          <LinearProgress
                            variant="determinate"
                            value={progress}
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
                        {historyRow.totalqlty}
                      </TableCell>
                      <TableCell align="left">
                        {historyRow.remaingprice}
                      </TableCell>
                      <TableCell align="left">
                      <button className="w-[140px] h-[45px] border border-gray-300 rounded-[8px] ">   {historyRow. offerprice}</button>
                       
                      </TableCell>
                      <TableCell align="left">
                      <button className="w-[140px] h-[45px] border border-gray-300 rounded-[8px] ">  {historyRow.originalprice}</button>
                       
                      </TableCell>
                      <TableCell align="right">
                        <Buttons/>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Stockdetails;
