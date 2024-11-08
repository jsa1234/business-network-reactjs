"use client";
import Pagenavigation from '@/components/Pagenavigation'
import Stockdetails from './Stockdetails';
function Page() {
  
    const urlList = ["/", "/stockdetails"];
    return (
        <>
          <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
          <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation pageName="Stock Details"
            urlList={urlList}/> 
            <p className="text-gray-600">Hi, MS Market. Welcome back to Olopo</p>   
        </div>
       
      </div>
      <div className="w-full mt-6">
       <Stockdetails/>
      </div>
          </div>
        </>
    );
}
export default Page;