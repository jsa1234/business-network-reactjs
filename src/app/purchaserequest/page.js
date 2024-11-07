import Pagenavigation from '@/components/Pagenavigation'
import React from 'react'
import PurchaseRequest from './PurchaseRequest';


const Page = () => {
    const breadcrumbItems = ["Dashboard", "Purchase Request"];
    const urlList = ["/", "/purchaserequest"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation pageName="Purchase Request"
            navList={breadcrumbItems}
            urlList={urlList}/>
            
        </div>
       
      </div>
      <div className="w-full mt-6">
       <PurchaseRequest/>
      </div>
    </div>
  )
}

export default Page