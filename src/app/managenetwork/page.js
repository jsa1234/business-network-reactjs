import Pagenavigation from "@/components/Pagenavigation";
import Link from "next/link";
import React from "react";

function Page() {
  const breadcrumbItems = ["Dashboard", "Manage Network"];
  const urlList = ["/", "/dashboard"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Manage Network"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
         <Link href='/managenetwork/mynetwork'><button className="primary__btn">View My Networks</button>
         </Link> 
        </div>
      </div>
    </div>
  );
}
export default Page;
