import Pagenavigation from '@/components/Pagenavigation'
import React from 'react'
import NetworkProfile from './NetworkProfile';



const Page = () => {
  
    const urlList = ["/", "/networkprofile"];
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation pageName="Edit Profile"
       
           
            urlList={urlList}/>
            <p>Hi, MS Market. Welcome back to Olopo</p>
            
            
        </div>
       
      </div>
      <div className="w-full mt-6">
      <NetworkProfile/>
      </div>
    </div>
  )
}

export default Page
