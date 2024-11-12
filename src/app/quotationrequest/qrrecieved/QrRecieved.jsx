"use client";
// import * as React from "react";
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
import TickIcon from "../../../../public/assests/icons/tick-double.svg";
import HoldIcon from "../../../../public/assests/icons/hold.svg";
import { useEffect, useState } from "react";
import TotalRate from "@/components/TotalRate";
const QrRecieved = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [checkList, setCheckList] = useState([]);
  const [discount, setDiscount] = useState(0);
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
          protein: 4.0,
          price: 3.99,
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
      setTotalCount(5); //value need to be set from api
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
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
  const handleRowclick = (value) => {
    // alert(value);
    console.log(checkList);
    setCheckList((checkList) => {
      if (checkList.includes(value)) {
        return checkList.filter((item) => item !== value);
      } else {
        return [...checkList, value];
      }
    });
  };
  const handleSubmitClick = (value) => {
    console.log(value);
    alert(discount);
  };
  const handleDiscountChange = (value) => {
    setDiscount(value);
  };
  return (
    <>
      <TableContainer component={Paper} className="qrtable">
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="left">Req Qty</TableCell>
              <TableCell align="right">GST %</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="left">Action</TableCell>
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
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right flex">
                  <button
                    className={
                      checkList.includes(row.name)
                        ? "secondary__btn__light"
                        : "secondary__btn"
                    }
                    onClick={() => handleRowclick(row.name)}
                  >
                    <TickIcon />
                    {!checkList.includes(row.name) ? "Select" : ""}
                  </button>
                  &nbsp;&nbsp;
                  <button className="secondary__btn__light">
                    <HoldIcon />
                    Hold
                  </button>
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
      <TotalRate
        subTotal={1000}
        totalGst={200}
        total={1200}
        submitClick={handleSubmitClick}
        discountChange={handleDiscountChange}
        selectedCount={checkList.length}
      />
    </>
  );
};

export default QrRecieved;
