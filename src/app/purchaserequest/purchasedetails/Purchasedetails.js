"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Update from "../../../../public/assests/icons/update.svg";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CommonApi from "@/api/CommonApi";
import { format } from "date-fns";
import TableFooter from "@mui/material/TableFooter";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PurchaseDetails = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Order Requested", "Order Shipped", "Estimated Delivery"];
  const [purchasedetails, setPurchaseDetails] = useState([]);
  const [purchaseRequest, setPurchaseRequest] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Tracks dropdown selection
  const [vendorDetails,setVendorDetails]=useState({});
  const [purchase,setPurchase]=useState({});
  const PurchaseData = useSelector((state) => state.purchase.PurchaseData);
  // Fetch initial purchase request data
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    if (PurchaseData) {
      setPurchase(PurchaseData);
      console.log(PurchaseData);
    }
  }, [PurchaseData]);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(purchase).length>0) {
      getPurchaseRequest();
    }
  }, [vendorDetails,purchase]); 
  // useEffect(() => {
  //   getPurchaseRequest();
  // }, []);

  const getPurchaseRequest = async () => {
    try {
      const data = await CommonApi.getData(
        "Purchase/vendor/purchase-request",
        {},
        {
          vendorMasterUUId: vendorDetails.vendorMasterUUId,
          PurchaseRequestUUId: purchase.purchaseRequestUUId,
        }
      );
      setPurchaseRequest(data.data);
    } catch (error) {
      console.error("Error fetching purchase request:", error);
    }
  };

  // Fetch purchase details data for the table
  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(purchase).length>0) {
      fetchData(page, rowsPerPage);
    }
  }, [vendorDetails,purchase,page, rowsPerPage]);

  const fetchData = async (currentPage, rowsPerPage) => {
    try {
      const response = await CommonApi.getData(
        `Purchase/vendor/${purchase.purchaseRequestUUId}/request-details`,
        {},
        {
          VendorUUId: vendorDetails.vendorMasterUUId,
          Status: 2,
        }
      );
      setPurchaseDetails(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateOrderStatus = async () => {
    try {
      const statusMapping = {
        "Order Requested": {
          status: 1,
          PurchaseRequestUUId: purchase.purchaseRequestUUId,
          VendorMasterUUId: vendorDetails.vendorMasterUUId,
        },
        "Order Shipped": {
          status: 2,
          PurchaseRequestUUId: purchase.purchaseRequestUUId,
          VendorMasterUUId: vendorDetails.vendorMasterUUId,
        },
        "Estimated Delivery": {
          status: 3,
          PurchaseRequestUUId: purchase.purchaseRequestUUId,
          VendorMasterUUId: vendorDetails.vendorMasterUUId,
        },
      };

      const selected = statusMapping[selectedStatus];
      if (!selected) {
        alert("Please select a valid status!");
        return;
      }

      const payload = {
        PurchaseRequestUUId: purchase.purchaseRequestUUId,
        VendorMasterUUId: vendorDetails.vendorMasterUUId,
        Status: selected.status,
      };

      const response = await CommonApi.putData(
        "Purchase/vendor/update-status",
        {},
        payload
      );

      if (response?.success ||response.status=="success") {
        alert(`Order status updated to: ${selectedStatus}`);
        
      
        const stepIndex = steps.indexOf(selectedStatus);
        setActiveStep(stepIndex !== -1 ? stepIndex : 0);
        
        setSelectedStatus(""); 
      } else {
        alert("Error updating the order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("An error occurred while updating the order status.");
    }
  };

  useEffect(() => {
    const stepIndex = steps.indexOf(selectedStatus);
    setActiveStep(stepIndex !== -1 ? stepIndex : 0);
  }, [selectedStatus]);


  return (
    <>
      <div className="mt-8">
       
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
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Heading */}
      <Typography variant="h5" 
      sx={{
        fontWeight:'600',
        marginBottom: "16px",
        color: "#3b3b3b",
        textAlign: "left",
        marginBottom:'8px', 
        fontSize:'16px' // Align the text to the left
      }}>
        Order Status
      </Typography>
              
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
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
                <p className="mb-4">
                  Update Order Status <span className="text-red-500">*</span>
                </p>
                <select
                  id="dropdown"
                  className="dropdownSelect w-[350px] mb-4"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Order Requested">Order Requested</option>
                  <option value="Order Shipped">Order Shipped</option>
                  <option value="Estimated Delivery">Estimated Delivery</option>
                </select>
                <button
                  className="w-[350px] mb-4 bg-[#FD9A46] h-[46px] rounded-[10px] text-white text-lg flex items-center justify-center"
                  onClick={updateOrderStatus}
                >
                  <Update />
                  Update
                </button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
      
      <div className="w-full mt-6 table-container">
      <div className="filter-group-secondary">
          {Object.keys(purchaseRequest).length > 0 ? ( 
            <>
              <h1>
                QR ID: <span>{purchaseRequest.QuotationRequestId || "--"}</span>
              </h1>
              <h1>
                Name: <span>{purchaseRequest.companyName || "--"}</span>
              </h1>
              <h1>
                Requested Date:{" "}
                <span>
                  {purchaseRequest.orderRequestedDate
                    ? format(new Date(purchaseRequest.orderRequestedDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Submitted Date:{" "}
                <span>
                  {purchaseRequest.approvedDate
                    ? format(new Date(purchaseRequest.approvedDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Expected Delivery Date:{" "}
                <span>
                  {purchaseRequest.expectedDeliveryDate
                    ? format(
                        new Date(purchaseRequest.expectedDeliveryDate),
                        "dd-MM-yyyy"
                      )
                    : "--"}
                </span>
              </h1>
            </>
          ) : (
            <p>No requests found</p>
          )}
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
          {purchasedetails.length > 0 ? (
              purchasedetails.map((row, index) => (
              <TableRow key={index}
               
               
              >
                <TableCell component="td" scope="row">
                  {row.productName || "--"}
                </TableCell>
                <TableCell align="left">{row.requestedQuantity || "--"}</TableCell>
                <TableCell align="right">{row.gstPercentage || "--"}</TableCell>
                <TableCell align="right">{row.unitPrice || "--"}</TableCell>
                <TableCell align="right">{row.totalPrice || "--"}</TableCell>
              </TableRow>
             ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
      
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
