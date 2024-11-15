"use client";
import Pagenavigation from '@/components/Pagenavigation'

import Purchasedetails from './Purchasedetails';
import React, { useEffect, useState } from "react";


const Page = () => {
    const breadcrumbItems = ["Dashboard", "Purchase Request"];
    const urlList = ["/", "/purchasedetails"];
   

   
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation pageName="Purchase Request"
            navList={breadcrumbItems}
            urlList={urlList}/>
            
        </div>
       
      </div>
      <div className="w-full mt-6 table-container">
     {/*  <div className="filter-group-secondary">
          {Object.keys(purchaseRequest).length > 0 ? (
            <>
              <h1>
                QR ID: <span>{purchaseRequest.quotationRequestId || "--"}</span>
              </h1>
              <h1>
                Name: <span>{purchaseRequest.companyName || "--"}</span>
              </h1>
              <h1>
                Requested Date:{" "}
                <span>
                  {purchaseRequest.requestDate
                    ? format(new Date(purchaseRequest.requestDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Submitted Date:{" "}
                <span>
                  {purchaseRequest.submittedDate
                    ? format(new Date(purchaseRequest.submittedDate), "dd-MM-yyyy")
                    : "--"}
                </span>
              </h1>
              <h1>
                Expected Delivery Date:{" "}
                <span>
                  {purchaseRequest.expectedDeliveryDate
                    ? format(
                        new Date(purchaseRequest.expectedDeliveryDate),
                        "dd-MM-yyyy"
                      )
                    : "--"}
                </span>
              </h1>
            </>
          ) : (
            <p>No requests found</p>
          )}
        </div> */} 
       <Purchasedetails/>
      </div>
    </div>
  )
}

export default Page