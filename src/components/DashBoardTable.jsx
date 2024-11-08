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
import ChevronRight from "../../public/assests/icons/chevron-right.svg";
import FiveStar from "../../public/assests/icons/star-filled.svg";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";

function DashBoardTable() {
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
          name: "Frozen yoghurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 14.0,
          price: 3,
          history: [
            { date: "2020-01-05", customerId: "11091700", amount: 3 },
            { date: "2020-01-02", customerId: "Anonymou5", amount: 1 },
          ],
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          price: 4.99,
          history: [
            { date: "2020-01-05", customerId: "11091700", amount: 3 },
            { date: "2020-01-02", customerId: "Anonymous4", amount: 1 },
          ],
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 24,
          protein: 6.0,
          price: 3.79,
          history: [
            { date: "2020-01-05", customerId: "11091700", amount: 3 },
            { date: "2020-01-02", customerId: "Anonymous3", amount: 1 },
          ],
        },
        {
          name: "Cupcake",
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
          name: "Gingerbread",
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
    <TableContainer component={Paper}>
      <Table className="table" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Total Suppliers</TableCell>
            <TableCell align="right">Total Retailers</TableCell>
            <TableCell align="right">No. Customers</TableCell>
            <TableCell align="right">Over all Rating</TableCell>
            <TableCell />
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
  );
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="td" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">
          <div className="flex items-center flex-row-reverse">
            <FiveStar /> <FiveStar /> <FiveStar /> <FiveStar /> <FiveStar />
          {row.protein}/5 &nbsp;&nbsp;
          </div>
        </TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <h1>Customer Name</h1>
              <div className="flex items-center">
                <FiveStar /> <FiveStar /> <FiveStar /> <FiveStar /> <FiveStar />
              </div>
              <p>
                The Organic Mixed Vegetables pack is a convenient option for
                anyone looking to incorporate more veggies into their diet. This
                blend typically includes a mix of carrots, peas, corn, and green
                beans, all sourced from organic farms.
              </p>
            </Box>
            <Box sx={{ margin: 1 }}>
              <h1>Customer Name</h1>
              <div className="flex items-center">
                <FiveStar /> <FiveStar /> <FiveStar /> <FiveStar /> <FiveStar />
              </div>
              <p>
                The Organic Mixed Vegetables pack is a convenient option for
                anyone looking to incorporate more veggies into their diet. This
                blend typically includes a mix of carrots, peas, corn, and green
                beans, all sourced from organic farms.
              </p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default DashBoardTable;
