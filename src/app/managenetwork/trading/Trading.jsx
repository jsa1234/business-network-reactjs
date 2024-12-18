"use client";
import CommonApi from "@/api/CommonApi";
import Loader from "@/components/Loader";
import QrPopup from "@/components/QrPopup";
import TotalRate from "@/components/TotalRate";
import { useEffect, useState } from "react";
import Address from "../../../../public/assests/icons/address.svg";
import Businessname from "../../../../public/assests/icons/businessname.svg";
import Contact from "../../../../public/assests/icons/contact.svg";
import Contactperson from "../../../../public/assests/icons/contactperson.svg";
import Email from "../../../../public/assests/icons/email.svg";
import TickIcon from "../../../../public/assests/icons/tick-double.svg";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

function Trading({ activeTab }) {
  const [stock, setStock] = useState([]);
  const [details, setDetails] = useState([]);
  const [vendorMstrUID, setVendorMstrUID] = useState("");
  const [checkList, setCheckList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState();
  const myNetwork = useSelector((state) => state.managenetwork.myNetwork);
  const [networkDetails,setnetworkDetails]=useState({});
  const [vendorDetails,setVendorDetails]=useState({});
  const [toastMsg,setToastMsg]=useState({open:false,severity:'',message:''});
  const handleClose = () => {
    setToastMsg({open:false,severity:'',message:''});
  };

  useEffect(() => {
    if (myNetwork) {
      setnetworkDetails(myNetwork);
    }
  }, [myNetwork]);
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(networkDetails).length>0) {
      // const myProp = searchParams.get("uuid");
    
      getStock();
      getDetails();
    }
  }, [vendorDetails,networkDetails]); 
  async function getStock() {
    try {      
      setLoading(true);
    let data = await CommonApi.getData(
      `Stock/vendor/${networkDetails.vendorMstrUID}/stock`,
      {Authorization: `Bearer ${sessionStorage.getItem("token")}`},
      {
        PageSize: 10, //need to be dynamic
        PageNumber: 1, //need to be dynamic
      }
    );
    console.log(data);
    setStock(data.data || []);
  } catch (error) {
      
  }finally{
    setLoading(false);
  }
  }
  const handleRowclick = (row) => {
    console.log(checkList);
    if (
      !row.ofPrice ||
      !row.ogPrice ||
      !row.reqQty ||
      row.reqQty == ""||
      row.ofPrice == "" ||
      row.ogPrice == ""
    ) {
      setToastMsg({open:true,severity:'warning',message:'Enter the all fields :: Required Quantity,Original Price and Offer Price'});
      return;
    }
    setCheckList((checkList) => {
      if (checkList.includes(row.productUUId)) {
        return checkList.filter((item) => item !== row.productUUId);
      } else {
        return [...checkList, row.productUUId];
      }
    });
  };
  async function getDetails() {
    let data = await CommonApi.getData(
      `ManageNetwork/supplier/${networkDetails.vendorMstrUID}/details`,
      {}
    );
    setDetails(data.data);
  }
  const handleRowEdit = (value, key, row, index) => {
    let data = [...stock];
    data[index][key] = value;
    let total = 0;
    let unitTotal=0;
    for (let i = 0; i < data.length; i++) {
      if (checkList.includes(data[i].productUUId)) {
        data[i]?.ofPrice ? (total += Number(data[i]?.ofPrice)*Number(data[i]?.reqQty)) : "";
        data[i]?.ogPrice?(unitTotal+=Number(data[i]?.ogPrice)*Number(data[i]?.reqQty)):"";
      }
    }
    setStock(data);
    setDiscount(unitTotal-total);
    setTotalPrice(total);
  };
  useEffect(() => {
    let total = 0;
    let unitTotal=0;
    for (let i = 0; i < stock.length; i++) {
      if (checkList.includes(stock[i].productUUId)) {
        stock[i]?.ofPrice ? (total += Number(stock[i]?.ofPrice)*Number(stock[i]?.reqQty)) : "";
        stock[i]?.ogPrice?(unitTotal+=Number(stock[i]?.ogPrice)*Number(stock[i]?.reqQty)):"";
      }
    }
    setDiscount(unitTotal-total);
    setTotalPrice(total);
  }, [checkList]);
  const handleDiscountChange = (value) => {
    setDiscount(value);
  };
  const handleSubmitClick = () => {
    if (checkList.length == 0) {
      setToastMsg({open:true,severity:'warning',message:'Select Products to submit'});
      return;
    }
    handleModal();
  };
  const submitQuotation = async () => {
    try {
      if(deliveryDate==''){
        setToastMsg({open:true,severity:'warning',message:'Choose Expected Delivery Date'});
        return;
      }
      setLoading(true);

      let inputData = [];
      for (const element of stock) {
        let mData = {};
        mData = {
          productUUId: element.productUUId,
          productName: element.productName,
          unitPrice: element.ogPrice,
          offerPrice: element.ofPrice,
          quantity:element.reqQty
        };
        if (checkList.includes(element.productUUId)) {
          mData.status = 0;
          inputData.push(mData);
        } 
      }
      const res = await CommonApi.postData(
        "Quotation/vendor/quotation",
        {},
        {
          requestFromVendorUUId: vendorDetails.vendorMasterUUId,
          requestedToVendorUUId: networkDetails.vendorMstrUID,
          status: 1,
          comments:comments,
          expectedDeliveryDate: deliveryDate,
          quotationDetails: [...inputData],
        }
      );
      handleModal();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const handleModal = () => {
    console.log(checkList);
    // modalShow ? setSelectedRow({}) : "";
    setModalShow(!modalShow);
  };
  const handleDateChange = (dateValue) => {
    setDeliveryDate(dateValue);
    console.log(dateValue);
  };
  const handleCommentsChange = (comments) => {
    setComments(comments);
    console.log(comments);
  };
  const renderTableData = () => {
    if (activeTab === "request") {
      return (
        <div className="flex flex-col ml-[4rem] mr-[4rem] pt-4 pb-4">
          {Object.keys(details).length > 0 ? (
            <>
              {/* Business Name */}
              <div className="flex flex-row border-b border-gray-300 p-4">
                <h1 className="text-xl w-[100px]">
                  <Businessname />
                </h1>
                <h2 className="w-[150px] text-lg font-semibold">
                  Business Name:
                </h2>
                <h3 className="text-md w-[400px] text-lg">
                  {details.companyName || "--"}
                </h3>
              </div>

              {/* Address */}
              <div className="flex flex-row border-b border-gray-300 p-4">
                <h1 className="text-xl w-[100px]">
                  <Address />
                </h1>
                <h2 className="w-[150px] text-lg font-semibold">Address:</h2>
                <h3 className="text-md w-[400px] text-lg">
                  {details.address || "--"}
                </h3>
              </div>

              {/* Contact Number */}
              <div className="flex flex-row border-b border-gray-300 p-4">
                <h1 className="text-xl w-[100px]">
                  <Contact />
                </h1>
                <h2 className="w-[150px] text-lg font-semibold">Contact No:</h2>
                <h3 className="text-md w-[400px] text-lg">
                  {details.contactNo || "--"}
                </h3>
              </div>

              {/* Contact Person */}
              <div className="flex flex-row border-b border-gray-300 p-4">
                <h1 className="text-xl w-[100px]">
                  <Contactperson />
                </h1>
                <h2 className="w-[150px] text-lg font-semibold">
                  Contact Person:
                </h2>
                <h3 className="text-md w-[400px] text-lg">
                  {details.contactPerson || "--"}
                </h3>
              </div>

              {/* Email ID */}
              <div className="flex flex-row border-b border-gray-300 p-4">
                <h1 className="text-xl w-[100px]">
                  <Email />
                </h1>
                <h2 className="w-[150px] text-lg font-semibold">Email ID:</h2>
                <h3 className="text-md w-[400px] text-lg">
                  {details.email || "--"}
                </h3>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">No Details Available</div>
          )}
        </div>
      );
    }

    return (
      <>
        {loading ? <Loader /> : ""}
        <table className="table w-full rounded-tr-lg mb-40">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Remaining Qty</th>
              <th>Required Qty</th>
              <th>Original Price</th>
              <th>Offer Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stock.length > 0 ? (
              stock.map((stockDetails, index) => (
                <tr key={`approval_${index}`}>
                  <td>{stockDetails.productName || "--"}</td>
                  <td>{stockDetails.remainingQuantity || "--"}</td>
                  <td>
                    <input
                      type="number"
                      className="table__input"
                      value={stockDetails?.reqQty || ""}
                      onChange={(e) =>
                        handleRowEdit(
                          e.target.value,
                          "reqQty",
                          stockDetails,
                          index
                        )
                      }
                    ></input>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="table__input"
                      value={stockDetails?.ogPrice || ""}
                      onChange={(e) =>
                        handleRowEdit(
                          e.target.value,
                          "ogPrice",
                          stockDetails,
                          index
                        )
                      }
                    ></input>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="table__input"
                      value={stockDetails?.ofPrice || ""}
                      onChange={(e) =>
                        handleRowEdit(
                          e.target.value,
                          "ofPrice",
                          stockDetails,
                          index
                        )
                      }
                    ></input>
                  </td>
                  <td>
                    <button
                      className={
                        checkList.includes(stockDetails.productUUId)
                          ? "secondary__btn__light"
                          : "secondary__btn"
                      }
                      onClick={() => handleRowclick(stockDetails)}
                    >
                      <TickIcon />
                      {!checkList.includes(stockDetails.productUUId)
                        ? "Select"
                        : ""}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No stock data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <TotalRate
          subTotal={totalPrice+discount}
          selectedCount={checkList.length}
          total={totalPrice}
          discount={discount}
          submitClick={handleSubmitClick}
        />
        <QrPopup
          mode="accept"
          showModal={modalShow}
          handleModalClose={handleModal}
          handleSubmit={submitQuotation}
          dateChange={handleDateChange}
          commentsChange={handleCommentsChange}
        />
        <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toastMsg.open}
        onClose={handleClose}
        message="I love snacks"
      >
        <Alert
          onClose={handleClose}
          severity={toastMsg.severity}
          variant="filled"
          sx={{
            width: "100%",
            // Increase font size here
            fontSize: "1.2rem",
          }}
        >
          {toastMsg.message}
        </Alert>
      </Snackbar>
      </>
    );
  };

  return <div className="w-full table-container2">{renderTableData()}</div>;
}

export default Trading;
