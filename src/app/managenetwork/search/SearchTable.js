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
import Connect from "../../../../public/assests/icons/connect.svg";
import Popup from "@/components/Popup";

const SearchTable = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(0);
    const [showModal,setShowModal]=React.useState(false);
    const handleModalClose = (value) => {
      setShowModal(value);
    };
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
            name: "GST0000001",
            calories: "Earthly Delights Trading",
            fat: 7894561230,
            carbs: "1234 Greenway Lane, Suite 567, Springfield, ST 12345",
            protein: 4.0,
            price: 3.99,
            history: [
              { date: "2020-01-05", customerId: "11091700", amount: 3 },
              { date: "2020-01-02", customerId: "Anonymou5", amount: 1 },
            ],
          },
          {
            name: "GST0000002",
            calories: "Fresh Harvest Supply",
            fat: 7123456980,
            carbs: "1234 Greenway Lane, Suite 567, Springfield, ST 12345",
            protein: 4.3,
            price: 4.99,
            history: [
              { date: "2020-01-05", customerId: "11091700", amount: 3 },
              { date: "2020-01-02", customerId: "Anonymous4", amount: 1 },
            ],
          },
          {
            name: "GST0000003",
            calories: "Veggie Vault Inc",
            fat: 7123456980,
            carbs: "1234 Greenway Lane, Suite 567, Springfield, ST 12345",
            protein: 6.0,
            price: 3.79,
            history: [
              { date: "2020-01-05", customerId: "11091700", amount: 3 },
              { date: "2020-01-02", customerId: "Anonymous3", amount: 1 },
            ],
          },
          {
            name: "GST0000004",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            price: 2.5,
            history: [
              { date: "2020-01-05", customerId: "11091700", amount: 3 },
              { date: "2020-01-02", customerId: "Anonymous2", amount: 1 },
            ],
          },
          {
            name: "GST0000005",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            price: 1.5,
            history: [
              { date: "2020-01-05", customerId: "11091700", amount: 3 },
              { date: "2020-01-02", customerId: "Anonymous1", amount: 1 },
            ],
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
        <Popup showModal={showModal} handleModalClose={handleModalClose}/>
      
      <TableContainer component={Paper}>
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>GST No.</TableCell>
              <TableCell>Business name</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Vendor Category</TableCell>
              <TableCell>Action</TableCell>
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
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>
                    <button className="secondary__btn pl-9 pr-9" onClick={()=>setShowModal(true)}><Connect/>Connect</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
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
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </>
    );
}

export default SearchTable;