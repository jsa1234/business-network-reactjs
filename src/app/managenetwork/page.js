import Pagenavigation from "@/components/Pagenavigation";
import React, { Suspense } from "react";
import BusinessNetwork from "./BusinessNetwork";

function Page() {
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Build My Network Connections"
            message="Hi, MS Market. Welcome back to Olopo"
          />
        </div>
      </div>
      <div className="w-full mt-6">
        {/* Wrap BusinessNetwork with Suspense */}
        <Suspense fallback={<div>Loading Business Network...</div>}>
          <BusinessNetwork />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
