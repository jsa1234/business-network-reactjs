"use client"
import Pagenavigation from "@/components/Pagenavigation";
import CustomPaginationActionsTable from "@/components/Test";
import React, { useState } from "react";
import Mynetwork from "./Mynetwork";
import Searchvisual from "../../../../public/assests/icons/search-visual.svg";
import Search from "../../../../public/assests/icons/search.svg";
import SaturnLarge from "../../../../public/assests/icons/saturn-large.svg";
import SearchBtn from "../../../../public/assests/icons/search_btn.svg";
import { useRouter } from "next/navigation";
function Page() {
  const router=useRouter();
  const breadcrumbItems = ["Dashboard", "Manage Network", "My Networks"];
  const urlList = ["/", "/managenetwork", "/managenetwork/mynetwork"];
  const [showModal, setShowModal] = useState(false);
  const [searchField,setSearchField]=useState('');
  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleModalSearch = () => {
    if(searchField.trim()=='')return;
    console.log("Search Data",searchField);
    router.push(`/managenetwork/search?myProp=${searchField}`);
  };
  return (
    <>
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation
            pageName="My Networks"
            navList={breadcrumbItems}
            urlList={urlList}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <button className="primary__btn" onClick={handleButtonClick}>Add List <Searchvisual/></button>
        </div>
      </div>
      <div className="w-full table-container mt-6">
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
        {/* <CustomPaginationActionsTable/> */}
        <Mynetwork></Mynetwork>
      </div>
    </div>
     {showModal && (
        <div className="bus-modal">
          <div className="bus-modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>

            <div className="ellipse">
                <SaturnLarge/>
              </div>
              
              <h1>Find in Business Network</h1>
              <hr/>
              <p>You can find the current supply chain by using GST/ Name / Phone number</p>
              <input placeholder="Enter Here" onChange={(e)=>setSearchField(e.target.value)}></input>
              <button className='primary__btn' onClick={handleModalSearch}>Search Now <SearchBtn></SearchBtn></button>
              <button className='cancel_btn' onClick={handleCloseModal}>&times; Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
export default Page;
