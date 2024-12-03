"use client"
import Pagenavigation from '@/components/Pagenavigation';
import Forum from './Forum';

const Page = () => {
    const breadcrumbItems = ["Dashboard", "Biz Forum"];
    const urlList = ["/", "/forum"]; 
  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
           <div className="flex justify-between">
           <div className="w-full md:w-1/2">
          <Pagenavigation pageName="Biz Forum"
            navList={breadcrumbItems}
            urlList={urlList}/>
            
        </div>
        <button className="primary__btn mt-6"
      >+ Create New Query</button>
           </div>
           <div className="w-full mt-6">
           <Forum/>
           </div>
 </div>
)
}

export default Page
