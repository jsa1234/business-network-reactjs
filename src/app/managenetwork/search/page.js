"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagenavigation from "@/components/Pagenavigation";
import CustomPaginationActionsTable from "@/components/Test";
function Page() {
  const [param,setParam]=useState('');
  const searchParams = useSearchParams();
  const breadcrumbItems = ["Dashboard", "", "My Networks"];
  useEffect(() => {
    
    const myProp = searchParams.get("myProp");
    setParam(myProp);
    console.log(myProp)
  }, []);

  return <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
    {/* {param} */}
    <div className="flex justify-between">
        <div className="w-full">
          <Pagenavigation
            pageName={
                <>
                    Search Result of <span className='highlight_txt'>{param}</span>
                </>
            }
            navList={[]}
            urlList={[]}
            message="Connect from the list"
          />
        </div>
      </div>
       <CustomPaginationActionsTable></CustomPaginationActionsTable>
  </div>;
}
export default Page;
