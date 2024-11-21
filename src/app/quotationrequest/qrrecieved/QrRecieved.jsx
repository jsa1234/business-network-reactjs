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
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectRow, setSelectedRow] = useState({});
  const [totalGSTAmount, setTotalGSTAmount] = useState(0);
  const [loading,setLoading]=useState(false);
  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );
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
      setLoading(true);
      let data = await CommonApi.getData(
        `Quotation/vendor/${qrUuid}/details`,
        {},
        { status: 1 }
      );
      if (data.data.length > 0) {
        setData(data.data);
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
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    calculateTotal();
  }, [checkList]);
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
    if (value == "accept" && checkList.length == 0) {
      alert("No Products Selected");
      return;
    }
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
    setCheckList([]);
    setTotalAmount(0);
    setTotalGSTAmount(0);
    let tData = data;
    for (const element of tData) {
      if (row.productUUId == element.productUUId) {
        if (key == "unitPrice") {
          element.totalPrice = Number(element.quantity) * value;
          element.unitPrice = value;
        }
        if (key == "gst") element.gst = value;
      }
    }

    if (key == "unitPrice") setData(tData);
  };
  const calculateTotal=()=>{
    let total = 0;
    let totalGST = 0;
    let tData = data;
    for (const element of tData) {
      if(checkList.includes(element.productUUId)){
        
        total += element.totalPrice;
        totalGST += (Number(element.gst) / 100) * Number(element.totalPrice);
      }
    }
console.log(total);
console.log(totalGST);
    setTotalAmount(total);
    setTotalGSTAmount(totalGST);
  }
  const handleModal = (value) => {
    console.log(checkList);
    modalShow ? setSelectedRow({}) : "";
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
    try{
    setModalShow(!modalShow);
    if (Object.keys(selectRow).length > 0) {
      let mData = {};
      mData = {
        ...selectRow,
        status: constants.quotationStatus["hold"],
        reason: comments,
        comments: comments,
        deliverydate: deliveryDate,
        discount: discount,
      };
      let response = await CommonApi.putData(
        `Quotation/vendor/${qrUuid}/quotation`,
        {},
        [mData]
      );
      if (response.status == "success") {
        setToastMsg("Quotation Hold Submitted SuccessFully!");
        setOpen(true);
      } else {
        setToastMsg("Quotation Request Failed!");
        setOpen(true);
      }
      return;
    }
    let inputData = [];
    for (const element of data) {
      let mData = {};
      if (
        value == "send" &&
        checkList.includes(element.quotationRequestDetailUUId)
      ) {
        //selected products will have a status of SEND if submit quotation is clicked
        mData = {
          ...element,
          status: constants.quotationStatus[value],
          reason: comments,
          comments: comments,
          deliverydate: deliveryDate,
          discount: discount,
        };
      } else if (value == "send" || value == "reject") {
        //not-selected products will have a status of REJECT if submit quotation is clicked or same for if reject is clicked
        mData = {
          ...element,
          status: constants.quotationStatus["reject"],
          reason: comments,
          comments: comments,
          deliverydate: deliveryDate,
          discount: discount,
        };
      } else if (value == "hold") {
        mData = {
          ...element,
          status: constants.quotationStatus["hold"],
          reason: comments,
          comments: comments,
          deliverydate: deliveryDate,
          discount: discount,
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
  } catch (error) {
      
  }finally{
    setLoading(false)
  }
  };

  const holdRowItem = async (row) => {
    setSelectedRow(row);
    handleModal("hold");
  };

  return (
    <>
    {
      loading?<Loader/>:''
    }
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
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                key={row.productUUId}
              >
                <TableCell component="td" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="left">{row.quantity}</TableCell>

                <TableCell align="left">
                  <select
                    className="table__input"
                    value={row.gst}
                    onChange={(e) =>
                      handleRowEdit(row, index, "gst", e.target.value)
                    }
                  >
                    <option value="5">5 %</option>
                    <option value="12">12 %</option>
                    <option value="18">18 %</option>
                    <option value="28">28 %</option>
                  </select>
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
                <TableCell align="left flex border-b-0">
                  <button
                    className={
                      checkList.includes(row.productUUId)
                        ? "secondary__btn__light"
                        : "secondary__btn"
                    }
                    onClick={() =>
                      handleRowclick(row.productUUId)
                    }
                  >
                    <TickIcon />
                    {!checkList.includes(row.productUUId)
                      ? "Select"
                      : ""}
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="secondary__btn__light"
                    onClick={() => holdRowItem(row)}
                  >
                    <HoldIcon />
                    Hold
                  </button>
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TotalRate
        subTotal={totalAmount}
        totalGst={totalGSTAmount}
        total={totalAmount + totalGSTAmount - discount}
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
