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
import CommonApi from "@/api/CommonApi";
import { useSearchParams } from "next/navigation";
import QrPopup from "@/components/QrPopup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { format } from "date-fns";
import { constants } from "@/api/constants";
const QrRecieved = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [checkList, setCheckList] = useState([]);
  const [discount, setDiscount] = useState(0);
  const searchParams = useSearchParams();
  const [qrUuid, setQrUuid] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [comments, setComments] = useState("");
  const [open, setOpen] = useState(false);
  const [qrMode, setQrMode] = useState("");
  const [headData, setHeadData] = useState({});
  const [toastMsg, setToastMsg] = useState("");
  useEffect(() => {
    const myProp = searchParams.get("uuid");
    setQrUuid(myProp);
    fetchData(myProp);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async (qrUuid) => {
    try {
      let data = await CommonApi.getData(
        `Quotation/vendor/${qrUuid}/details`,
        {},
        { status: 1 }
      );
      if (data.length > 0) {
        setData(data);
        setTotalCount(data.length); //value need to be set from api
      }

      let hData = await CommonApi.getData(
        `Quotation/vendor/${qrUuid}/request`,
        {},
        { status: 1 }
      );
      setHeadData(hData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }
  };

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
    handleModal(value);
  };
  const handleDiscountChange = (value) => {
    setDiscount(value);
  };
  const handleRowEdit = (row, index, key, value) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };
  const handleModal = (value) => {
    console.log(checkList);
    setModalShow(!modalShow);
    setQrMode(value);
  };

  const handleDateChange = (dateValue) => {
    setDeliveryDate(dateValue);
    console.log(dateValue);
  };
  const handleCommentsChange = (comments) => {
    setComments(comments);
    console.log(comments);
  };

  const submitQuotation = async (value) => {
    setModalShow(!modalShow);
    
      let inputData = [];
    for (let i = 0; i < data.length; i++) {
      let mData ={};
      if (checkList.length>0 && checkList.includes(data[i].quotationRequestDetailUUId)) {
        mData = {
          ...data[i],
          'status': constants.quotationStatus[value],
          'reason': comments,
          'comments': comments,
          'deliverydate':deliveryDate,
          'discount':discount
        };
        
      }else if(checkList.length==0){
         mData = {
          ...data[i],
          'status': constants.quotationStatus[value],
          'reason': comments,
          'comments': comments,
          'deliverydate':deliveryDate,
          'discount':discount
        };
      }
      inputData.push(mData);
    }
      let response = await CommonApi.putData(
        `Quotation/vendor/${qrUuid}/quotation`,
        {},
        inputData
      );
      if (response.status == "success") {
        // alert("success");
        if (value == "send") {
          setToastMsg("Quotation Request Submitted SuccessFully!");
          setOpen(true);
        } else if (value == "hold") {
          setToastMsg("Quotation Hold Submitted SuccessFully!");
          setOpen(true);
        } else if (value == "reject") {
          setToastMsg("Quotation Reject Submitted SuccessFully!");
          setOpen(true);
        }
      } else {
        setToastMsg("Quotation Request Failed!");
        setOpen(true);
      }
      console.log(response.status);
    
  };

  return (
    <>
      <div className="filter-group-secondary">
        <h1>
          QR ID <span>{headData.quotationRequestId}</span>
        </h1>
        <h1>
          Name: <span>{headData.companyName}</span>
        </h1>
        <h1>
          Requested Date:{" "}
          <span>
            {format(new Date(headData.requestDate || Date()), "dd-MM-yyyy")}
          </span>
        </h1>
        <h1>
          Total Items:<span>{headData.totalItems}</span>
        </h1>
        <div className="btn_grp">
          <button
            className="outer__btn"
            onClick={() => handleSubmitClick("hold")}
          >
            <HoldIcon />
            Hold
          </button>
          <button
            className="cancel_btn_secondary"
            onClick={() => handleSubmitClick("reject")}
          >
            Reject
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className="qrtable">
        <Table className="table" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="left">Req Qty</TableCell>
              <TableCell align="left">GST %</TableCell>
              <TableCell align="left">Unit Price</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                key={row.productName}
              >
                <TableCell component="td" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
                <TableCell align="left">
                  <input
                    className="table__input"
                    value={row.gst}
                    onChange={(e) =>
                      handleRowEdit(row, index, "gst", e.target.value)
                    }
                  ></input>
                </TableCell>
                <TableCell align="left">
                  <input
                    className="table__input"
                    value={row.unitPrice}
                    onChange={(e) =>
                      handleRowEdit(row, index, "unitPrice", e.target.value)
                    }
                  ></input>
                </TableCell>
                <TableCell align="left">{row.totalPrice}</TableCell>
                <TableCell align="left flex">
                  <button
                    className={
                      checkList.includes(row.quotationRequestDetailUUId)
                        ? "secondary__btn__light"
                        : "secondary__btn"
                    }
                    onClick={() =>
                      handleRowclick(row.quotationRequestDetailUUId)
                    }
                  >
                    <TickIcon />
                    {!checkList.includes(row.quotationRequestDetailUUId)
                      ? "Select"
                      : ""}
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
      <QrPopup
        mode={qrMode}
        showModal={modalShow}
        handleModalClose={handleModal}
        handleSubmit={submitQuotation}
        dateChange={handleDateChange}
        commentsChange={handleCommentsChange}
      />
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            // Increase font size here
            fontSize: "1.4rem",
          }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QrRecieved;
