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
function Quotationreject() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [rejectedQuotation, setRejectedQuotation] = useState([]);

  const fetchData = async (currentPage, rowsPerPage) => {
   
      try {
        const response = await CommonApi.getData(
          "Quotation/vendor/{a8a50e1f-2e61-4008-933b-61cf2bdc6659}/details",
          {},
          {
            VendorUUId: "a8a50e1f-2e61-4008-933b-61cf2bdc6659",
            Status: 4,
          }
        );
        console.log("API Data:", response);
        setRejectedQuotation(response || []);
       /*  setTotalCount(response?.totalCount || 0); */
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
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
          {rejectedQuotation.length > 0 ? (
             rejectedQuotation.map((row, index) => (
              <TableRow key={index}
             
              >
                <TableCell component="td" scope="row">
                {row.productName || "--"}
                </TableCell>
                <TableCell align="left">{row.quantity || "--"}</TableCell>
                <TableCell align="right">{row.gst || "--"}</TableCell>
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

        <div className="reason">
          <p>
            <span>Reason:</span>
          </p>
          <p>
            We are currently holding order for a quality assurance review. This
            step ensures that all products meet our high standards of quality
            and safety before they are shipped. We want to make sure you receive
            the best possible item. We appreciate your patience and
            understanding, and we expect to resolve this shortly. Thank you for
            your support!
          </p>
        </div>
      </TableContainer>
    </>
  );
}
export default Quotationreject;
