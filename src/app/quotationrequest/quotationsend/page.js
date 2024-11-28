"use client";
import React, { useEffect, useState } from "react";
import Pagenavigation from "@/components/Pagenavigation";
import QuotationSend from "./QuotationSend";
import CommonApi from "@/api/CommonApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Submitted"];
  const urlList = ["/", "/quotationsend"];
  const [sendRequest, setSendRequest] = useState([]);
  const [param,setParam]=useState('');
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

    setParam(quotationDetails.qrUuid);
    getSendRequest();
    }
  }, [vendorDetails,quotationDetails]); 

  async function getSendRequest() {
    let data = await CommonApi.getData(
      "Quotation/vendor/quotation-request",
      {},
      {
        QuotationRequestUUId:quotationDetails.qrUuid,
        VendorMasterUUId: quotationDetails.vendorMasterUUId,
      }
    );
    console.log("MG.jsx", data);
    setSendRequest(data.data);
  }

  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      {/* Page Navigation */}
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Submitted Quotation"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
      </div>

      {/* Quotation Request List */}
      <div className="w-full mt-6 table-container">
        <div className="filter-group-secondary">
          {Object.keys(sendRequest).length > 0 ? (
            <>
              <h1>
                QR ID: <span>{sendRequest.quotationRequestId || "--"}</span>
              </h1>
              <h1>
                Name: <span>{sendRequest.companyName || "--"}</span>
              </h1>
              <h1>
                Requested Date:{" "}
                <span>
                  {sendRequest.requestDate
                    ? format(new Date(sendRequest.requestDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Submitted Date:{" "}
                <span>
                  {sendRequest.submittedDate
                    ? format(new Date(sendRequest.submittedDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Expected Delivery Date:{" "}
                <span>
                  {sendRequest.expectedDeliveryDate
                    ? format(
                        new Date(sendRequest.expectedDeliveryDate),
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

        {/* Render the QuotationSend component */}
        <QuotationSend />
      </div>
    </div>
  );
};

export default Page;
