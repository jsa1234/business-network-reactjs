"use client";
import Pagenavigation from "@/components/Pagenavigation";
import Fourmdetails from "./Forumdetails"
const Page = () => {
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
    
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="Biz Forum"
            navList={["Dashboard", "Biz Forum", "Biz Forum Details"]}
            urlList={["/", "/forum", "forumdetails"]}
          />
        </div>
        <div className="w-full mt-6">
          <Fourmdetails/>

        </div>
      </div>
  
  );
};

export default Page;
