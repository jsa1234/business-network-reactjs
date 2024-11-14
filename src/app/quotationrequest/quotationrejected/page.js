"use client";
import React, { useEffect, useState } from "react";
import Pagenavigation from "@/components/Pagenavigation";
import Quotationreject from "./quotationreject";
import CommonApi from "@/api/CommonApi";
import { format } from "date-fns";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Reject "];
  const urlList = ["/", "/quotationrejected"];
  const [rejectRequest, setRejectRequest] = useState([]);

  useEffect(() => {
    console.log(process.env.API_URL);
    getRejectRequest();
  }, []);
  async function getRejectRequest() {
    let data = await CommonApi.getData(
      "Quotation/vendor/{a8a50e1f-2e61-4008-933b-61cf2bdc6659}/request",
      {},
      {
        VendorUUId: "21C7586F-9F29-457B-8E3D-4C75213183DF",
      }
    );
    console.log("MG.jsx", data);
    setRejectRequest(data);
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
