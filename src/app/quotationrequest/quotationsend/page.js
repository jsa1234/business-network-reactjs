import React from "react";
import Pagenavigation from "@/components/Pagenavigation";
import QuotationSend from "./QuotationSend";

const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Submitted"];
  const urlList = ["/", "/quotationsend"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Quotation Send"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
      </div>

      <div className="w-full mt-6">
        <QuotationSend/>
    
      </div>
    </div>
  );
};

export default Page;
