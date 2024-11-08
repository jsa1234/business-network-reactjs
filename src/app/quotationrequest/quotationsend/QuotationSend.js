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

function QuotationSend() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
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
    <div className="w-full table-container">
      <div className="filter-group">
        <div className="info-container">
          <p>
            QR ID: <span className="info-details">#2024ABC</span>
          </p>
          <p>
            Name:<span className="info-details"> Earthly Delights Trading</span>
          </p>
          <p>
            Requested Date:<span className="info-details"> 18/10/2024</span>
          </p>
          <p>
            Rejected Date:<span className="info-details"> 19/10/2024</span>
          </p>

          <p>
            Total Items:<span className="info-details"> 10</span>
          </p>
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
    </div>
  );
}
export default QuotationSend;
