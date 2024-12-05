"use client";
import * as React from "react";
import { useEffect, useState } from "react";
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
import CommonApi from "@/api/CommonApi";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";

function QuotationSend() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [submittedQuotation, setSubmittedQuotation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [param,setParam]=useState('');
  const [vendorDetails,setVendorDetails]=useState({});
  const [quotationDetails,setQuotationDetails]=useState({});
  const Quotation = useSelector((state) => state.quotation.Quotation);
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    if (Quotation) {
      setQuotationDetails(Quotation);
    }
  }, [Quotation]);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(quotationDetails).length>0) {
      // const myProp = searchParams.get("uuid");
    // setQrUuid(quotationDetails.qrUuid);
    // fetchData();
    setParam(quotationDetails.qrUuid);
    fetchData();
    }
  }, [vendorDetails,quotationDetails]); 
  // Fetch data from the API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await CommonApi.getData(
        `Quotation/vendor/${quotationDetails.qrUuid}/details`,
        {},
        {
       
        }
      );
      console.log("API Data:", response);
      if(response.success){
        let tData = response.data;
        for (let i = 0; i < tData.length; i++) {
          tData[i].totalPrice = tData[i].quantity * tData[i].offerPrice;
        }
        setSubmittedQuotation(response.data || []);
      } 
      /*  setTotalCount(response?.totalCount || 0); */
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   const myProp = searchParams.get("uuid");
  //   setParam(myProp);
  //   fetchData(myProp);
  // }, []);
  // useEffect(() => {
  //   param?fetchData(param):'';
  // }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <TableContainer component={Paper}>
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow className="quotationsend">
              <TableCell>Product Name</TableCell>
              <TableCell align="left">Req Qty</TableCell>
              <TableCell align="right">GST %</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Offer Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedQuotation.length > 0 ? (
              submittedQuotation.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="td" scope="row">
                    {row.productName || "--"}
                  </TableCell>
                  <TableCell align="left">{row.quantity || "--"}</TableCell>
                  <TableCell align="right">{row.gst || "--"}</TableCell>
                  <TableCell align="right">{row.unitPrice || "--"}</TableCell>
                  <TableCell align="right">{row.offerPrice || "--"}</TableCell>
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
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>

        
      </TableContainer>
    </>
  );
}

export default QuotationSend;
