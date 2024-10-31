import Pagenavigation from "@/components/Pagenavigation";
import CustomPaginationActionsTable from "@/components/Test";
import React from "react";
import Mynetwork from "./Mynetwork";

function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Network", "My Networks"];
  const urlList = ["/", "/managenetwork", "/managenetwork/mynetwork"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="My Networks"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <button className="primary__btn">Add List</button>
        </div>
      </div>
      <div className="w-full table-container mt-6">
        <div className="filter-group">
          <div className="form">
            <svg
              className="fa fa-search"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 13.5C11.2614 13.5 13.5 11.2614 13.5 8.5C13.5 5.73858 11.2614 3.5 8.5 3.5C5.73858 3.5 3.5 5.73858 3.5 8.5C3.5 11.2614 5.73858 13.5 8.5 13.5Z"
                stroke="#778294"
                strokeWidth="1.5"
              />
              <path
                d="M12.0961 12.0961L16 16"
                stroke="#778294"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>

            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
          </div>
        </div>
        {/* <CustomPaginationActionsTable/> */}
        <Mynetwork></Mynetwork>
      </div>
    </div>
  );
}
export default Page;
