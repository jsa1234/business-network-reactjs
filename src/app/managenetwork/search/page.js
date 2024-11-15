"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState,Suspense } from "react";
import Pagenavigation from "@/components/Pagenavigation";
import SearchTable from "./SearchTable";
import Search from "../../../../public/assests/icons/search.svg";
function Page() {
  const [param,setParam]=useState('');
  const searchParams = useSearchParams();
  useEffect(() => {
    
    const myProp = searchParams.get("myProp");
    setParam(atob(myProp));
    console.log(myProp)
  }, []);

  return <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
<Suspense fallback={<div>Loading search results...</div>}>
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
      <div className="w-full table-container mt-6">
{/* <CustomPaginationActionsTable/> */}
<div className="filter-group">
          <div className="form">
            <Search className="fa fa-search"></Search>

            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
          </div>
        </div>
       <SearchTable searchValue={param}></SearchTable>
      </div>
      </Suspense>
  </div>;
}
export default Page;
