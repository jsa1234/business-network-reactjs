import Pagenavigation from "@/components/Pagenavigation";
import React from "react";
import BusinessNetwork from "./BusinessNetwork";

function Page() {
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Build My Netowork Connections"
            message="Hi, MS Market. Welcome back to Olopo"
          />
        </div>
      </div>
      <div className="w-full mt-6">
<BusinessNetwork/>
      </div>
    </div>
  );
}

export default Page;
