// Add this directive at the top
"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Update from "../../../public/assests/icons/update.svg";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
const PurchaseDetails = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Order Requested", "Order Shipped", "Estimated Delivery"];
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async (currentPage, rowsPerPage) => {
    try {
      //below code need to integrated when api are ready
      //   const response = await fetch(
      //     // Replace with your server endpoint URL
      //     `your-api-endpoint?page=${currentPage + 1}&rowsPerPage=${rowsPerPage}`
      //   );

      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      const rows = [
        {
          name: "Onionn",
          qty: 700,
          gst: 700,
          price: 700,
          totall: 700,
        },
        {
            name: "Onionny",
            qty: 700,
            gst: 700,
            price: 700,
            totall: 700,
          },
          {
            name: "Onionnn",
            qty: 700,
            gst: 700,
            price: 700,
            totall: 700,
          },
      ];
      setData(rows);
      setTotalCount(5); //value need to be set from api
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
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "white",
              height: "150px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step  key={label}>
                  <StepLabel >{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "white",
              height: "150px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="flux text-left flex flex-col justify-end">
              <p className="mb-4  ">
                Update Order Status <span className="text-red-500">*</span>
              </p>
              <select id="dropdown" className="dropdownSelect w-[350px] mb-4">
                <option value="" className="font-bold text-black">
                  Order Shipped
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              <button className="flux w-[350px] mb-4 bg-[#FD9A46] h-[46px] rounded-[10px] text-white text-lg flex items-center justify-center">
                <Update />
                Update
              </button>
            </div>
          </Box>
        </Grid>
      </Grid>
      <div className="w-full mt-6 table-container">
        <div className="filter-group-secondary">
          <h1>
            PR ID: <span>#2024ABC</span>
          </h1>
          <h1>
            Name: <span>Earthy Delights Trading</span>
          </h1>
          <h1>
            Approved Date: <span>18/10/2024</span>
          </h1>
          <h1>
            Expected Delivery Date:<span>10</span>
          </h1>
          <h1>
            Total Items:<span>10</span>
          </h1>
          <div className="btn_grp"></div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow className="quotationsend">
              <TableCell>Product Name</TableCell>
              <TableCell align="left">Req Qty</TableCell>
              <TableCell align="right">GST %</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                key={row.name}
              >
                <TableCell component="td" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.qty}</TableCell>
                <TableCell align="right">{row.gst}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.totall}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {/* <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
            </TableRow> */}
          </TableFooter>
        </Table>

        <div className="reason">
          <p>
            <span>Reason:</span>
          </p>
          <p>
            All products meet our high standards of quality and safety before
            they are shipped. We want to make sure you receive the best possible
            item. We appreciate your patience and understanding, and we expect
            to resolve this shortly. Thank you for your support!
          </p>
        </div>
      </TableContainer>
    </>
  );
};

export default PurchaseDetails;
