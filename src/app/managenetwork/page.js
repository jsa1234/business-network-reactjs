"use client";
import Buttons from "@/components/Buttons/Buttons";
import Pagenavigation from "@/components/Pagenavigation";
import { useState } from "react";
import Mynetwork from "./mynetwork/Mynetwork";
import Link from "next/link";

function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Networks"];
  const urlList = ["/", "/dashboard", ""];
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("approval");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderTableData = () => {
    const theadContent = activeTab === "request" ? (
      <thead>
        <tr>
          <th>Req. Date</th>
          <th>GST No.</th>
          <th>Business name</th>
          <th>Contact No.</th>
          <th>Role</th>
        
          <th>Status</th>
        </tr>
      </thead>
    ) : (
      <thead>
        <tr>
          <th>GST No.</th>
          <th>Business name</th>
          <th>Contact No.</th>
          <th>Address</th>
          <th>Vendor Category</th>
          <th>Action</th>
        </tr>
      </thead>
    );

    const tableBodyContent =
      activeTab === "approval" ? (
        <tbody className="text-left">
          <tr>
            <td>#29GGGGG1314R9Z6</td>
            <td>Earthly Delights Trading</td>
            <td>123 456 7895</td>
            <td>1234 Greenway Lane, Suite 567, Springfield, ST 12345</td>
            <td>Supplier</td>
            <td>
              <Buttons />
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody className="text-left">
          <tr>
            <td>#88HHHHH2222X8Y7</td>
            <td>Sunshine Goods Ltd.</td>
            <td>987 654 3210</td>
            <td>5678 Sunshine St., Apt 123, Brookfield, ST 54321</td>
            <td>Distributor</td>
            <td>
              <button className="status-approvel">

              </button>
            </td>
          </tr>
        </tbody>
      );

    return (
      <table className="table w-full">
        {theadContent}
        {tableBodyContent}
      </table>
    );
  };

  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Manage Networks"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
        <Link href='/managenetwork/mynetwork'>
        
          <button className="primary__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.63604 18.3637C4.00736 16.735 3 14.485 3 11.9998C3 7.02919 7.02944 2.99976 12 2.99976C14.4853 2.99976 16.7353 4.00711 18.364 5.63579M20.2941 8.49976C20.7487 9.57564 21 10.7583 21 11.9998C21 16.9703 16.9706 20.9998 12 20.9998C10.7586 20.9998 9.57589 20.7484 8.5 20.2938"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8292 3.82142C18.5323 2.13929 20.7205 1.51927 21.6005 2.39779C23.1408 3.93534 20.0911 9.48071 14.7889 14.7837C9.48663 20.0867 3.93971 23.1393 2.39946 21.6017C1.52414 20.7279 2.13121 18.5598 3.79165 15.8773"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View My Networks
          </button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex space-x-4 mt-6 background">
          <button
            className={`tab flex items-center p-2 rounded-md ${
              activeTab === "approval"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500"
                : ""
            }`}
            onClick={() => setActiveTab("approval")}
          >
               <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={activeTab === "request" ? "#777777" :  "#FFA500"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M18.9905 19C19.6182 18.3776 19.4637 17.2444 19.4637 16.4479C19.4637 15.4414 19.6838 14.9786 20.4006 14.2618C21.4669 13.1956 22 12.6624 22 12C22 11.3375 21.4669 10.8044 20.4006 9.73817M18.9905 19H19"
              stroke={activeTab === "request" ? "#777777" :  "#FFA500"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2"
              stroke={activeTab === "request" ? "#777777" :  "#FFA500"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
            <span >Approval Pending</span>
          </button>
          <button
            className={`tab flex items-center p-2 rounded-md ${
              activeTab === "request"
                ? "bg-white text-orange-500 border-b-2 border-b-orange-500"
                : ""
            }`}
            onClick={() => setActiveTab("request")}
          >
             <svg
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke={activeTab === "request" ? "#FFA500" :   "#777777"}
             strokeWidth="1.5"
             strokeLinecap="round"
             strokeLinejoin="round"
          >
            <path
              d="M13 2.04938C12.6711 2.01672 12.3375 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
              stroke={activeTab === "request" ? "#FFA500" :   "#777777"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 11H8.70711C8.25435 11 7.82014 10.8201 7.5 10.5M14 11H15.2929C15.7456 11 16.1799 10.8201 16.5 10.5"
              stroke={activeTab === "request" ? "#FFA500" :   "#777777"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
              stroke={activeTab === "request" ? "#FFA500" :   "#777777"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 2H19.9474C20.5675 2 20.8775 2 20.9601 2.20009C21.0427 2.40019 20.8317 2.64023 20.4098 3.1203L17.9846 5.8797C17.5627 6.35977 17.3517 6.59981 17.4343 6.79991C17.5169 7 17.8269 7 18.447 7H21"
              stroke={activeTab === "request" ? "#FFA500" :   "#777777"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
            <span>Request Pending</span>
          </button>
        </div>

        <div className="w-full table-container">
          <div className="filter-group">
            <div className="form">
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search Product Name..."
              />
            </div>
            <div>
              <label className="dropdown-list">Sort by</label>
              <select
                id="dropdown"
                className="dropdownSelect"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="" className="font-bold text-black">
                  Choose
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              {selectedOption && <p>You selected: {selectedOption}</p>}
            </div>
          </div>

          {renderTableData()}
        </div>
      </div>
    </div>
  );
}

export default Page;
