"use client"
import CommonApi from "@/api/CommonApi";
import { constants } from "@/api/constants";
import Loader from '@/components/Loader';
import QrPopup from "@/components/QrPopup";
import TotalRate from '@/components/TotalRate';
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Snackbar from "@mui/material/Snackbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from "date-fns";
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Cancel from "../../../../public/assests/icons/cancel.svg";
import TickIcon from "../../../../public/assests/icons/tick-double.svg";
import { useSelector } from "react-redux";
const QrHold = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [checkList, setCheckList] = React.useState([]);
  const [discount, setDiscount] = React.useState(0);
  const [qrUuid, setQrUuid] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [qrMode, setQrMode] = React.useState("");
  const [headData, setHeadData] = React.useState({});
  const [toastMsg, setToastMsg] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [selectRow, setSelectedRow] = React.useState({});
  const [totalGSTAmount, setTotalGSTAmount] = React.useState(0);
  const [loading,setLoading]=React.useState(false);
  const [vendorDetails,setVendorDetails]=React.useState({});
  const [quotationDetails,setQuotationDetails]=React.useState({});
  const Quotation = useSelector((state) => state.quotation.Quotation);
  const router = useRouter();
  // const VendorType = useSelector(
  //   (state) => state.vendor.VendorType
  // );
  // React.useEffect(() => {
  //   const myProp = searchParams.get("uuid");
  //   setQrUuid(myProp);
  //   fetchData(myProp);
  // }, []);
  React.useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  React.useEffect(() => {
    if (Quotation) {
      setQuotationDetails(Quotation);
    }
  }, [Quotation]);
  React.useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(quotationDetails).length>0) {
      // const myProp = searchParams.get("uuid");
    setQrUuid(quotationDetails.qrUuid);
    fetchData();
    }
  }, [vendorDetails,quotationDetails]); 
  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      let data = await CommonApi.getData(
        `Quotation/vendor/${quotationDetails.qrUuid}/details`,
        {},
        { }
      );
      if (data.data.length > 0) {
        let tData=[...data.data];
        for(const element of tData){
          element.totalPrice=element.quantity*element.unitPrice;
          element.gst=12;
        }
        setData(tData);
      }

      let hData = await CommonApi.getData(
        `Quotation/vendor/quotation-request`,
        {},
        {
          QuotationRequestUUId:quotationDetails.qrUuid,
          VendorMasterUUId: quotationDetails.vendorMasterUUId,
         }
      );
      setHeadData(hData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }finally{
      setLoading(false)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    calculateTotal();
  }, [checkList]);
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
    setLoading(true);
    if (value == "accept" && checkList.length == 0) {
      alert("No Products Selected");
      setLoading(false);
      return;
    }
    handleModal(value);
    setLoading(false);
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
    try {
      setLoading(true);
    
    setModalShow(!modalShow);
    if (Object.keys(selectRow).length > 0) {
      let mData = {};
      mData = {
        ...selectRow,
      
      };
      let response;
      if(vendorDetails.vendorType==2){
        response = await CommonApi.postData(
          `Purchase/vendor/request`,
          {},
          {
            "quotationRequestUUId": quotationDetails.qrUuid,
            "requestFromVendorUUId": vendorDetails.vendorMasterUUId,
            "requestedToVendorUUId": quotationDetails.vendorMasterUUId,
            "expectedDeliveryDate": deliveryDate,
            "comments": comments,
            "quotationDetails": [mData]
          }
        );
      } else{
      response = await CommonApi.putData(
        `Quotation/vendor/quotation`,
        {},
        {
          quotationRequestUUId: quotationDetails.qrUuid,
          requestFromVendorUUId: vendorDetails.vendorMasterUUId,//needs to be dynamic 
          requestedToVendorUUId:  quotationDetails.vendorMasterUUId,//needs to be dynamic
          status: constants.quotationStatus[value],
          expectedDeliveryDate: deliveryDate,
          comments: comments,
          quotationDetails: [mData],
        }
      );
    }
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
        };
      } else if (value == "send" || value == "reject") {
        //not-selected products will have a status of REJECT if submit quotation is clicked or same for if reject is clicked
        mData = {
          ...element,
        };
      } else if (value == "hold") {
        mData = {
          ...element,
        };
      }

      inputData.push(mData);
    }
    let response;
    if(vendorDetails.vendorType==2 && value == "send"){
      response = await CommonApi.postData(
        `Purchase/vendor/request`,
        {},
        {
          "quotationRequestUUId": qrUuid,
          "requestFromVendorUUId": vendorDetails.vendorMasterUUId,
          "requestedToVendorUUId":  quotationDetails.vendorMasterUUId,
          "expectedDeliveryDate": deliveryDate,
          "comments": comments,
          "quotationDetails": [...inputData]
        }
      );
    } else{

      response = await CommonApi.putData(
        `Quotation/vendor/quotation`,
        {},
        {
          quotationRequestUUId: qrUuid,
          requestFromVendorUUId: vendorDetails.vendorMasterUUId,
          requestedToVendorUUId: quotationDetails.vendorMasterUUId,
          status: constants.quotationStatus[value],
          expectedDeliveryDate: deliveryDate==""?null:deliveryDate,
          comments: comments,
          quotationDetails: [...inputData],
        }
      );
    } 
    if (response?.success||response?.status=="success") {
      // alert("success");
      if (value == "send") {
        setToastMsg("Quotation Request Submitted SuccessFully!");
        setOpen(true);
        setLoading(true)
        setTimeout(function() {
          router.push('/quotationrequest');
        }, 2000);
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
            className="cancel_btn_secondary flex items-center justify-between"
            onClick={() => handleSubmitClick("reject")}
          ><Cancel/>
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
          <React.Fragment key={row.productUUId}>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            
            <TableCell component="td" scope="row">
              {row.productName}
            </TableCell>
            <TableCell align="left">{row.quantity}</TableCell>
            <TableCell align="left"><select
            disabled={vendorDetails.vendorType
 === 2}
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
                  </select></TableCell>
            <TableCell align="left"><input
            disabled={vendorDetails.vendorType
 === 2}
                    className="table__input"
                    value={row.unitPrice}
                    onChange={(e) =>
                      handleRowEdit(row, index, "unitPrice", e.target.value)
                    }
                  ></input></TableCell>
            <TableCell align="left">{row.totalPrice}</TableCell>
            <TableCell>
            <button
                        className={
                          checkList.includes(row.productUUId)
                            ? "secondary__btn__light"
                            : "secondary__btn"
                        }
                        onClick={() => handleRowclick(row.productUUId)}
                      >
                        <TickIcon />
                        {!checkList.includes(row.productUUId) ? "Select" : ""}
                      </button>
            </TableCell>
            <TableCell/>
          </TableRow>
          <TableRow className={true?'highlight__row':''}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
              <Collapse in={true&&row.reason} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
               <h1>
                    Reason
               </h1>
                 <p>{row.reason}</p>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
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
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(true);
  const [checkList, setCheckList] = React.useState([]);
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
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        <TableCell component="td" scope="row">
          {row.productName}
        </TableCell>
        <TableCell align="left">{row.quantity}</TableCell>
        <TableCell align="left">{row.gst}</TableCell>
        <TableCell align="left">{row.unitPrice}</TableCell>
        <TableCell align="left">{row.totalPrice}</TableCell>
        <TableCell>
        <button
                    className={
                      checkList.includes(row.productUUId)
                        ? "secondary__btn__light"
                        : "secondary__btn"
                    }
                    onClick={() => handleRowclick(row.productUUId)}
                  >
                    <TickIcon />
                    {!checkList.includes(row.productUUId) ? "Select" : ""}
                  </button>
        </TableCell>
        <TableCell/>
      </TableRow>
      <TableRow className={open?'highlight__row':''}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
           <h1>
                Reason
           </h1>
             <p>We are currently holding order for a quality assurance review. This step ensures that all products meet our high standards of quality and safety before they are shipped. We want to make sure you receive the best possible item.
             We appreciate your patience and understanding, and we expect to resolve this shortly. Thank you for your support!</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default QrHold;
