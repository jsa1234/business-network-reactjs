"use client";
import { useState, useEffect } from "react";
import ChevronIcon from "../../../public/assests/icons/chevron-right.svg";
import SearchIcon from "../../../public/assests/icons/search_btn.svg";
import SearchDarkIcon from "../../../public/assests/icons/search-dark.svg";
import TimesIcon from "../../../public/assests/icons/times.svg";
import BNcard from "@/components/BNcard";
import Popup from "@/components/Popup";
import CommonApi from "@/api/CommonApi";

import { useSelector } from "react-redux";

const BusinessNetwork = () => {
  const hasQueryParam = false;
  const [searchKeyword, setSearchKeyword] = "";

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [connectClick, setconnectClick] = useState(false);
  const [vendorDetails,setVendorDetails]=useState({});
  const [globalSearch, setGlobalSearch] = useState("");
  const [globalMatch, setGlobalMatch] = useState("");

  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      hasQueryParam && searchKeyword !== "" ? basicSearch() : fetchData();
    }
  }, [vendorDetails]); 
  const handlebuttonClick = async (VendorMasterUUID, vendorUUID) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // console.log("connectFromUUID:", VendorMasterUUID);
    // console.log("connectToUUID:", vendorUUID);

    try {
      const res = await CommonApi.postData(
        "BusinessNetwork/vendor/connection/request",
        {},
        {
          createdAt: formattedDate,
          modifiedAt: formattedDate,
          requestFromVendorUUId: vendorDetails.vendorMasterUUId,
          requestedToVendorUUId: vendorUUID,
        }
      );
      setconnectClick(!connectClick);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  };
const handleGlobalSearch=async ()=>{
  try {
    const res = await CommonApi.getData(
      "BusinessNetwork/vendor/global-search",
      {},
      {
        VendorMasterUUId: vendorDetails.vendorMasterUUId,
        SearchKey: globalSearch,
        VendorType: vendorDetails.vendorType,
        FilterType: globalMatch==""?null:globalMatch,
        PageSize :10,
        PageNumber :1,
      }
    );
    setData(res.data.suggestionDetails);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error, e.g., display error message to the user
  }
}
  const handleModalClose = () => {
    hasQueryParam && searchKeyword !== "" ? basicSearch() : fetchData();

    setconnectClick(!connectClick);
  };
  // useEffect(() => {
  //   hasQueryParam && searchKeyword !== "" ? basicSearch() : fetchData();
  // }, [page, rowsPerPage, searchKeyword]);

  const fetchData = async () => {
    try {
      const res = await CommonApi.getData(
        "BusinessNetwork/vendor/suggestions",
        {},
        {
          VendorMasterUUID: vendorDetails.vendorMasterUUId,
          gstNo: gstNo,
          mobileNo: mobileNo,
          CompanyName: businessName,
          productCategory: productCategory,
          vendorCategory: vendorCategory,
          location: location,
          rating: rating,
          VendorType: vendorDetails.vendorType,
          Status: 1,
          PageSize: rowsPerPage,
          PageNumber: page,
        }
      );
      // console.log("suggestion: ", res);
      if(res.data.suggestionDetails){

        setData(res.data.suggestionDetails);
        setTotalCount(5);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message to the user
    }
  };

  const basicSearch = async () => {
    try {
      const res = await CommonApi.getData(
        "BusinessNetwork/vendor/basic-search",
        {},
        {
          VendorMasterUUID: vendorDetails.vendorMasterUUId,
          searchKey: searchKeyword,
          VendorType: VendorType,
          Status: 3,
          PageSize: rowsPerPage,
          PageNumber: page,
        }
      );
      setData(res.data.suggestionDetails);
      // console.log(res);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }

    // console.log(searchKeyword);
  };

  const mapVendorCategory = (value) => {
    const category = vendorCategoryData.find((item) => item.value === value);
    return category ? category.name : "Unknown"; // Default to "Unknown" if no match is found
  };

  // const VendorMasterUUID = useSelector(
  //   (state) => state.vendor.VendorMasterUUID
  // );

  const VendorType = useSelector((state) => state.vendor.VendorType);

  const [gstNo, setGstNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [vendorCategoryData, setVendorCategoryData] = useState([]);
  const [locationsData, setLoationsData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  // Handle input changes
  const handleInputChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  // Handle form submission or search
  const handleSearch = (e) => {
    e.preventDefault();

    // Add your search logic here
    (async function () {
      try {
        const res = await CommonApi.getData(
          "BusinessNetwork/vendor/search/networks",
          {},
          {
            VendorMasterUUID:  vendorDetails.vendorMasterUUId,
            VendorType: vendorDetails.vendorType,
            gstNo: gstNo,
            mobileNo: mobileNo,
            CompanyName: businessName,
            productCategory: productCategory,
            VendorSegment: vendorCategory,
            location: location,
            rating: rating,
            Status: 3,
            PageSize: rowsPerPage,
            PageNumber: page,
          }
        );
        if (res.data && res.data.suggestionDetails) {
          setData(res.data.suggestionDetails);
        }
        // console.log(res);
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    })();
  };
  const handleMinimize = () => {
    setshowModal(!showModal);
  };

  useEffect(() => {
    getCategories();
    getVendors();
    getLocations();
    getRatings();
  }, []);

  // product category api
  async function getCategories() {
    try {
      const res = await CommonApi.getData("Vendor/product/categories", {}, {});
      setProductCategoryData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // vendor category api
  async function getVendors() {
    try {
      const res = await CommonApi.getData("Vendor/segments", {}, {});
      setVendorCategoryData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // vendor location api
  async function getLocations() {
    try {
      const res = await CommonApi.getData("Vendor/locations", {}, {});
      setLoationsData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // vendor ratings api
  async function getRatings() {
    try {
      const res = await CommonApi.getData("Vendor/ratings", {}, {});
      setRatingsData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleGlobalSearch();
    }
  };
  return (
    <div>
      <div className="global__search">
        <div className="global__search__input">
          <select onChange={(e)=>setGlobalMatch(e.target.value)} >
          <option value="0">Select</option>
            <option value="1">Product Match</option>
            <option value="2">Service Match</option>
            <option value="3">Business Match</option>
          </select>
          <div className="input__group">
            <input
              type="text"
              placeholder="Search by name, mobile, location..."
              onChange={(e)=>setGlobalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            ></input>
            <SearchDarkIcon className="cursor-pointer" onClick={handleGlobalSearch}/>
          </div>
        </div>
        <button className="outer__btn" onClick={() => handleMinimize()}>Advance Filter</button>
      </div>
      {showModal?(
      <div className="advance__filter">
        <div className="advance__filter__header">
          <h1>Advance Filter</h1>
          <TimesIcon
            onClick={() => handleMinimize()}
            className={!showModal ? "rotate cursor-pointer" : "cursor-pointer"}
          />
          {/* &times; */}
        </div>
        <hr></hr>
       
          <div className="advance__filter__body grid grid-cols-12 gap-4">
            <div className="input__group col-span-3">
              <label htmlFor="gstSrchInpt">By GST No.</label>
              <input
                type="text"
                id="gstSrchInpt"
                value={gstNo}
                onChange={(e) => handleInputChange(e, setGstNo)}
              />
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="MobileInpt">By Mobile No.</label>
              <input
                type="text"
                id="MobileInpt"
                maxLength="10"
                value={mobileNo}
                onChange={(e) => handleInputChange(e, setMobileNo)}
              />
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="BusinessInpt">By Business Name</label>
              <input
                type="text"
                id="BusinessInpt"
                value={businessName}
                onChange={(e) => handleInputChange(e, setBusinessName)}
              />
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="ProductInpt">By Product Category</label>
              <select
                id="ProductInpt"
                value={productCategory}
                onChange={(e) => handleInputChange(e, setProductCategory)}
              >
                <option value="">Select from the list</option>

                {productCategoryData.map((item, index) => {
                  return (
                    <option value={item.categoryUUId} key={index}>
                      {item.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="VendorInpt">By Vendor Segement</label>
              <select
                id="VendorInpt"
                value={vendorCategory}
                onChange={(e) => handleInputChange(e, setVendorCategory)}
              >
                <option value="">Select from the list</option>
                {vendorCategoryData.map((item, index) => {
                  return (
                    <option value={item.segmentUUId} key={index}>
                      {item.segmentName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="LocationInpt">By Location</label>
              <select
                id="LocationInpt"
                value={location}
                onChange={(e) => handleInputChange(e, setLocation)}
              >
                <option value="">Select from the list</option>
                {locationsData.map((item, index) => {
                  return (
                    <option value={item.locationId} key={index}>
                      {item.location}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="RatingInpt">By Rating</label>
              <select
                id="RatingInpt"
                value={rating}
                onChange={(e) => handleInputChange(e, setRating)}
              >
                <option value="">Select from the list</option>
                {ratingsData.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input__group col-span-3">
              <p>&nbsp;</p>
              <button
                id="search_btn"
                className="primary__btn flex pl-20 pr-20 gap-1 justify-around"
                onClick={handleSearch}
              >
                Search Now
                <SearchIcon />
              </button>
            </div>
          </div>
       
      </div> ) : (
        ""
      )}
      <div className="filter__results">
        <div className="filter__results__header">
          <h1>Networks</h1>
        </div>
        <hr></hr>
        <div className="filter__results__body grid grid-cols-12 gap-4">
          {data.map((row, index) => (
            <BNcard
              key={index}
              name={row.companyName}
              gst_number={row.gstNo}
              contact={row.contactNumber}
              address={row.address}
              vendor={row.vendorType==1?"Seller":"Buyer"}
              buttonClick={handlebuttonClick}
              vendorUUID={row.vendorMasterUUId}
            />
          ))}
        </div>
      </div>
      <Popup showModal={connectClick} handleModalClose={handleModalClose} />
    </div>
  );
};

export default BusinessNetwork;
