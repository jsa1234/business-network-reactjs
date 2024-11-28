"use client";
import { useState, useEffect } from "react";
import ChevronIcon from "../../../public/assests/icons/chevron-right.svg";
import SearchIcon from "../../../public/assests/icons/search_btn.svg";
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
          requestFromVendorUUId: VendorMasterUUID,
          requestedToVendorUUId: vendorUUID,
        }
      );
      setconnectClick(!connectClick);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  };

  const handleModalClose = () => {
    hasQueryParam && searchKeyword !== "" ? basicSearch() : fetchData();

    setconnectClick(!connectClick);
  };
  useEffect(() => {
    hasQueryParam && searchKeyword !== "" ? basicSearch() : fetchData();
  }, [page, rowsPerPage, searchKeyword]);

  const fetchData = async () => {
    try {
      const res = await CommonApi.getData(
        "BusinessNetwork/vendor/suggestions",
        {},
        {
          VendorMasterUUID: VendorMasterUUID,
          gstNo: gstNo,
          mobileNo: mobileNo,
          businessName: businessName,
          productCategory: productCategory,
          vendorCategory: vendorCategory,
          location: location,
          rating: rating,
          VendorType: VendorType,
          Status: 3,
          PageSize: rowsPerPage,
          PageNumber: page,
        }
      );
      // console.log("suggestion: ", res);
      setData(res.data.suggestionDetails);
      setTotalCount(5);
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
          VendorMasterUUID: VendorMasterUUID,
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

  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );

  const VendorType = useSelector((state) => state.vendor.VendorType);

  const [gstNo, setGstNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [vendorCategory, setVendorCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [showModal, setshowModal] = useState(true);
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
            VendorMasterUUID: VendorMasterUUID,
            gstNo: gstNo,
            mobileNo: mobileNo,
            businessName: businessName,
            productCategory: productCategory,
            vendorCategory: vendorCategory,
            location: location,
            rating: rating,
            VendorType: VendorType,
            Status: 3,
            PageSize: rowsPerPage,
            PageNumber: page,
          }
        );
        if(res.data && res.data.suggestionDetails){

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
      const res = await CommonApi.getData(
        "Vendor/segments",
        {},
        {}
      );
      setProductCategoryData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // vendor category api
  async function getVendors() {
    try {
      const res = await CommonApi.getData(
        "Vendor/segments",
        {},
        {}
      );
      setVendorCategoryData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // vendor location api
  async function getLocations() {
    try {
      const res = await CommonApi.getData(
        "Vendor/locations",
        {},
        {}
      );
      setLoationsData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  // vendor ratings api
  async function getRatings() {
    try {
      const res = await CommonApi.getData(
        "Vendor/ratings",
        {},
        {}
      );
      setRatingsData((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
    }
  }

  return (
    <div>
      <div className="advance__filter">
        <div className="advance__filter__header">
          <h1>Advance Filter</h1>
          <ChevronIcon
            onClick={() => handleMinimize()}
            className={!showModal ? "rotate" : ""}
          />
        </div>
        <hr></hr>
        {showModal ? (
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
                    <option value={item.segmentUUId} key={index}>
                      {item.segmentName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input__group col-span-3">
              <label htmlFor="VendorInpt">By Vendor Category</label>
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
        ) : (
          ""
        )}
      </div>
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
              vendor={mapVendorCategory(row.vendorType)}
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
