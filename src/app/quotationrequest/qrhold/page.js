import Pagenavigation from "@/components/Pagenavigation";
import React from 'react';
import QrHold from "./QrHold";


const Page = () => {
  const breadcrumbItems = ["Dashboard", "Quotation Request Hold"];
  const urlList = ["/", "/quotationrequest"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Quotation Request"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
      </div>
      <div className="w-full mt-6 table-container">
        <QrHold/>
      </div>
    </div>
  );
}

export default Page;