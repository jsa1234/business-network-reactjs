import React from "react";
import Pagenavigation from "@/components/Pagenavigation";
import Quotationreject from "./quotationreject";


const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Reject "];
  const urlList = ["/", "/quotationrejected"];
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

      <div className="w-full mt-6">

        <Quotationreject/>
    
      </div>
    </div>
  );
};

export default Page;
