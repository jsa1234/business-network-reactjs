"use client"
import React, { useState } from 'react';
import { format } from "date-fns";
import Qrcard from '@/components/Qrcard';

const OpenQuotation = () => {
    const [data,setData]=useState([
        {
            "quotationRequestUUId": "b22a75bd-36be-4aac-977f-9009e373fd7a",
            "vendorMasterUUId": "66ca6c26-fcb3-4154-92ff-b75a368616ee",
            "requestDate": "2024-11-21T00:00:00",
            "status": 1,
            "quotationRequestId": "2",
            "companyName": "Chinnoos Bakeryy",
            "totalItems": 1,
            "comments": null,
            "reason": null
        },
        {
            "quotationRequestUUId": "c595254a-646f-4efd-9040-c290c00f2cec",
            "vendorMasterUUId": "4bf53476-c156-4aac-b49c-3f5044c66540",
            "requestDate": "2024-11-21T00:00:00",
            "status": 1,
            "quotationRequestId": "2",
            "companyName": "Garden Grove Suppliers",
            "totalItems": 1,
            "comments": null,
            "reason": null
        },
        {
            "quotationRequestUUId": "b22a75bd-36be-4aac-977f-9009e373fd7a1",
            "vendorMasterUUId": "66ca6c26-fcb3-4154-92ff-b75a368616ee1",
            "requestDate": "2024-11-21T00:00:00",
            "status": 1,
            "quotationRequestId": "2",
            "companyName": "Chinnoos Bakeryy",
            "totalItems": 1,
            "comments": null,
            "reason": null
        },
        {
            "quotationRequestUUId": "c595254a-646f-4efd-9040-c290c00f2cec2",
            "vendorMasterUUId": "4bf53476-c156-4aac-b49c-3f5044c665402",
            "requestDate": "2024-11-21T00:00:00",
            "status": 1,
            "quotationRequestId": "2",
            "companyName": "Garden Grove Suppliers",
            "totalItems": 1,
            "comments": null,
            "reason": null
        }
    ]);
    const handleCardClick=()=>{
        console.log("forced into error code :143")
    }
  return (
    <div className='table-container'>
        <div className="filter-group">
          <div className="form">
            {/* <Search className="fa fa-search"></Search> */}
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
            &nbsp;&nbsp;
            <label className="dropdown-list" htmlFor="dropdown">
              Sort by
            </label>
            <select id="dropdown" className="dropdownSelect">
              <option value="" className="font-bold text-black">
                Choose
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
        <div className="quotationwraper grid grid-cols-12 gap-4 p-6">
          {data.map((row) => (
            <Qrcard
              key={row.quotationRequestUUId}
              mode={'send'}
              name={row.companyName}
              date={format(new Date(row.requestDate), "dd-MM-yyyy")}
              qritems={row.totalItems}
              status={row.status ? "Urgent" : ""}
              qrId={row.quotationRequestId}
              cardClick={handleCardClick}
              qrUUID={row.quotationRequestUUId}
            />
          ))}
        </div>
    </div>
  )
}

export default OpenQuotation;