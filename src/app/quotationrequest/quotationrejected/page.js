"use client";
import React, { useEffect, useState } from "react";
import Pagenavigation from "@/components/Pagenavigation";
import Quotationreject from "./quotationreject";
import CommonApi from "@/api/CommonApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Reject "];
  const urlList = ["/", "/quotationrejected"];
  const [rejectRequest, setRejectRequest] = useState([]);
  const [quotationDetails,setQuotationDetails]=useState({});
  const [vendorDetails,setVendorDetails]=useState({});
  const Quotation = useSelector((state) => state.quotation.Quotation);
  useEffect(() => {
    if (Quotation) {
      setQuotationDetails(Quotation);
    }
  }, [Quotation]);
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId && Object.keys(quotationDetails).length>0) {

    getRejectRequest();
    }
  }, [vendorDetails,quotationDetails]); 
    // useEffect(() => {
    //   console.log(process.env.API_URL);
    //   getRejectRequest();
    // }, []);
  async function getRejectRequest() {
    let data = await CommonApi.getData(
      "Quotation/vendor/quotation-request",
      {},
      {
        QuotationRequestUUId:quotationDetails.qrUuid,
        VendorMasterUUId: vendorDetails.vendorMasterUUId,
      }
    );
    console.log("MG.jsx", data);
    setRejectRequest(data.data);
  }

  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Rejected Quotation "
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
      </div>

      <div className="w-full mt-6 table-container">
        <div className="filter-group-secondary">
          {Object.keys(rejectRequest).length > 0 ? (
            <>
              <h1>
                QR ID: <span>{rejectRequest.quotationRequestId || "--"}</span>
              </h1>
              <h1>
                Name: <span>{rejectRequest.companyName || "--"}</span>
              </h1>
              <h1>
                Requested Date:{" "}
                <span>
                  {rejectRequest.requestDate
                    ? format(new Date(rejectRequest.requestDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Submitted Date:{" "}
                <span>
                  {rejectRequest.submittedDate
                    ? format(
                        new Date(rejectRequest.submittedDate),
                        "dd-MM-yyyy"
                      )
                    : "--"}
                </span>
              </h1>
              <h1>
                Expected Delivery Date:{" "}
                <span>
                  {rejectRequest.expectedDeliveryDate
                    ? format(
                        new Date(rejectRequest.expectedDeliveryDate),
                        "dd-MM-yyyy"
                      )
                    : "--"}
                </span>
              </h1>
            </>
          ) : (
            <p>No requests found</p>
          )}
        </div>
        <Quotationreject />
      </div>
    </div>
  );
};

export default Page;
