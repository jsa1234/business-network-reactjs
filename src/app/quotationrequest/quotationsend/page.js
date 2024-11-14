"use client";
import React, { useEffect, useState } from "react";
import Pagenavigation from "@/components/Pagenavigation";
import QuotationSend from "./QuotationSend";
import CommonApi from "@/api/CommonApi";
import { format } from "date-fns";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Submitted"];
  const urlList = ["/", "/quotationsend"];
  const [sendRequest, setSendRequest] = useState([]);

  // Fetch Quotation Requests
  useEffect(() => {
    console.log(process.env.API_URL);
    getSendRequest();
  }, []);
  async function getSendRequest() {
    let data = await CommonApi.getData(
      "Quotation/vendor/{a8a50e1f-2e61-4008-933b-61cf2bdc6659}/request",
      {},
      {
        VendorUUId: "21C7586F-9F29-457B-8E3D-4C75213183DF",
      }
    );
    console.log("MG.jsx", data);
    setSendRequest(data);
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
