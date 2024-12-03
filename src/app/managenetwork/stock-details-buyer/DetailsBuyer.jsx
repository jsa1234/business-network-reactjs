"use client";
import CommonApi from "@/api/CommonApi";
import Loader from "@/components/Loader";
import QrPopup from "@/components/QrPopup";
import SubmitCard from "@/components/SubmitCard";
import { useEffect, useState } from "react";
import Address from "../../../../public/assests/icons/address.svg";
import Businessname from "../../../../public/assests/icons/businessname.svg";
import Contact from "../../../../public/assests/icons/contact.svg";
import Contactperson from "../../../../public/assests/icons/contactperson.svg";
import Email from "../../../../public/assests/icons/email.svg";
import TickIcon from "../../../../public/assests/icons/tick-double.svg";
import { useSelector } from "react-redux";

function DetailsBuyer({ activeTab }) {
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
  // useEffect(() => {
  //   const myProp = searchParams.get("uuid");
  //   setVendorMstrUID(myProp);
  //   getStock(myProp);
  //   // getDetails(myProp);
  // }, []);
  useEffect(() => {
    if (myNetwork) {
      setnetworkDetails(myNetwork);
      console.log(myNetwork);
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
      // getDetails();
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
    setLoading(false)
  }
  
  }
  const handleRowclick = (row) => {
    console.log(checkList);
    if (
      !row.rqQty ||
      row.rqQty == ""
    ) {
      alert("Enter the Required Quantity!");
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
  async function getDetails(uuid) {
    try {
      setLoading(true);
    let data = await CommonApi.getData(
      `ManageNetwork/supplier/${uuid}/details`,
      {}
    );
    setDetails(data.data);
  } catch (error) {
      
  }finally{
    setLoading(false)
  }
  
  }
  const handleRowEdit = (value, key, row, index) => {
    let data = [...stock];
    data[index][key] = value;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (checkList.includes(data[i].productUUId)) {
        data[i]?.ofPrice ? (total += Number(data[i]?.ofPrice)) : "";
      }
    }
    setStock(data);
    setTotalPrice(total);
  };
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < stock.length; i++) {
      if (checkList.includes(stock[i].productUUId)) {
        stock[i]?.ofPrice ? (total += Number(stock[i]?.ofPrice)) : "";
      }
    }
    setTotalPrice(total);
  }, [checkList]);
  const handleDiscountChange = (value) => {
    setDiscount(value);
  };
  const handleSubmitClick = () => {
    if (checkList.length == 0) {
      alert("Select Products to submit");
      return;
    }
    handleModal();
  };
  const submitQuotation = async () => {
    try {
      setLoading(true);

      let inputData = [];
      for (const element of stock) {
        let mData = {};
        mData = {
          productUUId: element.productUUId,
          productName: element.productName,
          quantity: element.rqQty,
          
        };
        if (checkList.includes(element.productUUId)) {
          mData.status = 2;
          inputData.push(mData);
        }
      }
      let url;
      if(networkDetails.type=="open"){
        url="Quotation/vendor/open-quotation"
      }else{
        url="Quotation/vendor/quotation"
      }
      const res = await CommonApi.postData(
        url,
        {},
        {
          requestFromVendorUUId: vendorDetails.vendorMasterUUId,
          requestedToVendorUUId: networkDetails.vendorMstrUID,
          status: 1,
          expectedDeliveryDate: deliveryDate||null,
          quotationDetails: [...inputData],
        }
      );
      if(res.success){
        alert("Quotation Updated");
      }
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
       return (
      <>
        {loading ? <Loader /> : ""}
        <table className="table w-full rounded-tr-lg mb-40">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Remaining Qty</th>
              <th>Required Quantity</th>
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
                      value={stockDetails?.rqQty || ""}
                      onChange={(e) =>
                        handleRowEdit(
                          e.target.value,
                          "rqQty",
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

        <SubmitCard
          selectedCount={checkList.length}
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
      </>
    );
  };

  return <div className="w-full table-container2">{renderTableData()}</div>;
}

export default DetailsBuyer;
