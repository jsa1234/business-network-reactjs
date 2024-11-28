"use client";
import React, { useState, useEffect } from "react";
import CommonApi from "@/api/CommonApi";
import { useSelector } from "react-redux";

const NetworkProfile = () => {
  const [businessDomain, setBusinessDomain] = useState([]);
  const [businessSegment, setBusinessSegment] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [previousData, setPreviousData] = useState({});
  const [isDropdownOpenService, setIsDropdownOpenService] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );

  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    contactPerson: "",
    gstNo: "",
    contactNumber: "",
    email: "",
    address: "",
    vendorType: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDomainChange = (val) => {
    setSelectedDomain(val);
    console.log(val);
  };

  // Fetch business domain
  const getBusinessDomain = async () => {
    try {
      const res = await CommonApi.getData("Vendor/business-domain", {}, {});
      console.log("Business Domain Response:", res.data); // Debugging
      const domain = res.data.flatMap((item) => item);
      setBusinessDomain(domain);
    } catch (error) {
      console.error("Error fetching business domains:", error);
    }
  };

  // Fetch business segments
  const getBusinessSegment = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/business-segments`, // Use vendorMasterUUId here
        {},
        { VendorMasterUUID }
      );
      console.log("Business Segment Response:", res.data);
      const segments = res.data.flatMap((item) => item.segmentDetails);
      setBusinessSegment(segments);
    } catch (error) {
      console.error("Error fetching business segments:", error);
    }
  };

  // Fetch products based on the selected segment
  const getProducts = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/vendor-products`,
        {}, // Additional payload if necessary
        {}
      );
  
     
      const productsData = res.data; 
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  // Toggles the visibility of the dropdown
  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handles checkbox selection
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  //services//
  const getServices = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/vendor-services`,
        {}, // Additional payload if necessary
        {}
      );

      const serviceData = res.data.flatMap((item) => item.serviceMasterDetails);
      setServices(serviceData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  const handleToggleDropdownServices = () => {
    setIsDropdownOpenService((prevState) => !prevState);
  };
  const handleCheckboxChangeServices = (servicesId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(servicesId)
        ? prevSelected.filter((id) => id !== servicesId)
        : [...prevSelected, servicesId]
    );
  };
  //end//
  useEffect(() => {
    getBusinessDomain();
    getBusinessSegment();
    let data = handleSegment();
    // setPreviousData(data);
    setSelectedDomain(data.domain);
    setSelectedSegment(data.segments);
    setProducts(data.productsData);
    setServices(data.productsData);
  }, []);
  //submit//

  const handleSegment = async () => {
    try {
      const response = await CommonApi.putData(
        "Vendor/preferences",
        {},
        {
          vendorMasterUUId,
          domainUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          vendorSegmentsDetail: [
            {
              vendorDomainUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              segmentUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
          ],
          vendorProductDetail: [
            {
              productUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
          ],
          vendorServiceDetail: [
            {
              serviceUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
          ],
        }
      );

      if (response) {
        console.log("Vendor Master UUID:", response.vendorMasterUUId);
        console.log("Domain UUID:", response.domainUUId);

        if (response.vendorSegmentsDetail) {
          response.vendorSegmentsDetail.forEach((segment) => {
            console.log("Vendor Domain UUID:", segment.vendorDomainUUId);
            console.log("Segment UUID:", segment.segmentUUId);
          });
        }

        if (response.vendorProductDetail) {
          response.vendorProductDetail.forEach((product) => {
            console.log("Product UUID:", product.productUUId);
          });
        }

        if (response.vendorServiceDetail) {
          response.vendorServiceDetail.forEach((service) => {
            console.log("Service UUID:", service.serviceUUId);
          });
        }
      } else {
        console.log("No response data received.");
      }
    } catch (error) {
      console.error("Error while updating preferences:", error);
    }
  };
  //company details//

  //new//
  /*  const handleCompanyDetails = async () => {
    try {
      const response = await CommonApi.putData(
        "Vendor/company-details",
        {
          vendorMasterUUId,
          companyName: "string",
          contactPerson: "string",
          gstNo: "string",
          contactNumber: "string",
          email: "string",
          address: "string",
          rating: 0,
          locationId: 0,
          vendorERPStockAPIUrl: "string",
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  useEffect(() => {
    // Create a wrapper function to handle async calls
    const fetchData = async () => {
      await handleCompanyDetails();
    };
  
    fetchData();
  }, []);
   */

  //end//
  const handleCompanyDetails = async () => {
    try {
      const res = await CommonApi.postData(
        "Vendor/register",
        {},
        {
          vendorUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          vendorType: 2,
          branchUUId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          businessType: 0,
          isOlopoUser: 0,
          companyName: companyDetails.companyName,
          contactPerson: companyDetails.contactPerson,
          gstNo: companyDetails.gstNo,
          contactNumber: companyDetails.contactNumber,
          email: "string",
          address: companyDetails.address,
          rating: 0,
          password: "string",
          vendorERPStockAPIUrl: "string",
        }
      );

      console.log("Response:", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };




  return (
    <>
      {/* form actions */}
      <section className="py-4 px-8 rounded-2xl flex items-start justify-end gap-x-6 mb-8">
        {/* save button */}
        <button
          className="text-[14px] w-[150px] bg-gray-950 px-4 py-4 text-white rounded-md hover:bg-black"
          onClick={() => handleCompanyDetails()}
        >
          Save
        </button>

        {/* cancel button */}
        <button className="px-4 py-4 text-[14px] w-[150px] text-gray-950 rounded-md hover:bg-gray-300 border border-gray-950">
          Cancel
        </button>
      </section>

      {/* section 1 */}
      <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold">Company Details</h2>
        </div>
        <div className="w-2/3">
          <div className="w-full flex items-start justify-center gap-x-6">
            {/* company name */}
            <div className="mb-8 w-1/2">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                value={companyDetails.companyName}
                onChange={handleInputChange}
              />
            </div>

            {/* gst no. */}
            <div className="mb-8 w-1/2">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                GST No.
              </label>
              <input
                type="                                                                                          text"
                name="gstNo"
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                value={companyDetails.gstNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full flex items-start justify-start gap-x-6 mt-6">
            <div className="mb-8 w-1/2">
              <p className="block text-[14px] text-xl font-medium text-black mb-2">
                Are you a seller or buyer?
              </p>
              <div className="flex items-center justify-start gap-x-4">
                <input
                  type="radio"
                  id="buyer"
                  name="vendorType"
                  value="buyer"
                  checked={companyDetails.vendorType === "buyer"}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="buyer"
                  className="block text-[14px] text-xl font-medium text-black"
                >
                  Buyer
                </label>

                <input
                  type="radio"
                  id="seller"
                  name="vendorType"
                  value="seller"
                  checked={companyDetails.vendorType === "seller"}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="seller"
                  className="block text-[14px] text-xl font-medium text-black"
                >
                  Seller
                </label>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold">Contact Details</h2>
        </div>
        <div className="w-2/3">
          <div className="w-full flex items-start justify-center gap-x-6">
            {/* contact person */}
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                value={companyDetails.contactPerson}
                onChange={handleInputChange}
              />
            </div>

            {/* contact number */}
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                value={companyDetails.contactNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full flex items-start justify-center gap-x-6">
            {/* email */}
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="mt-1 w-1/2 px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                value={companyDetails.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full flex items-start justify-center gap-x-6">
            {/* address */}
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Address
              </label>

              <textarea
                rows={4}
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              ></textarea>
              {/* <input
              name="address"
              type="text"
              className=""
              value={companyDetails.address}
              onChange={handleInputChange}
            /> */}
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold">Company Details</h2>
        </div>
        <div className="w-2/3">
          <div className="w-full flex items-start justify-center gap-x-6">
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Business Domain
              </label>
              <select
                id="businessDomain"
                value={selectedDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="mt-1 w-full px-3 py-4 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              >
                <option value="" disabled>
                  Select a business domain
                </option>
                {businessDomain.length > 0 ? (
                  businessDomain.map((domain, index) => (
                    <option key={index} value={domain.domainUUId}>
                      {domain.domainName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading...
                  </option>
                )}
              </select>
            </div>
            <div className="mb-8 w-full">
              <label
                htmlFor="businessSegment"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Business Segment
              </label>
              <select
                id="businessSegment"
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="mt-1 w-full px-3 py-4 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              >
                <option value="" disabled>
                  Select a segment
                </option>
                {businessSegment.length > 0 ? (
                  businessSegment.map((segment, index) => (
                    <option key={index} value={segment.segmentUUId}>
                      {segment.segmentName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading...
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="w-full flex items-start justify-center gap-x-6">
            <div className="mb-8 w-full">
              <label
                htmlFor="products"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Products
              </label>
              <div
                onClick={handleToggleDropdown}
                className="mt-1 w-full px-3 py-4 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              >
                {selectedProducts.length > 0
                  ? `Selected: ${selectedProducts.length} product(s)`
                  : "Click to select products"}
              </div>

              {/* Dropdown with checkboxes */}
              {isDropdownOpen && (
                <div className=" mt-2 w-full border border-gray-300 rounded-md bg-white shadow-lg max-h-64 overflow-y-auto">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div
                        key={product.productUUId}
                        className="flex items-center px-4 py-2"
                      >
                        <input
                          type="checkbox"
                          id={product.productUUId}
                          value={product.productUUId}
                          checked={selectedProducts.includes(
                            product.productUUId
                          )}
                          onChange={() =>
                            handleCheckboxChange(product.productUUId)
                          }
                          className="mr-2 h-6 w-6 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label
                          htmlFor={product.productUUId}
                          className="text-gray-700 cursor-pointer"
                        >
                          {product.productName}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 px-4 py-2">
                      No products available
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Services
              </label>
              <div
                onClick={handleToggleDropdownServices}
                className="mt-1 w-full px-3 py-4 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              >
                {selectedServices.length > 0
                  ? `Selected: ${selectedServices.length} product(s)`
                  : "Click to select services"}
              </div>

              {isDropdownOpenService && (
                <div className=" mt-2 w-full border border-gray-300 rounded-md bg-white shadow-lg max-h-64 overflow-y-auto">
                  {services.length > 0 ? (
                    services.map((services) => (
                      <div
                        key={services.serviceUUId}
                        className="flex items-center px-4 py-2"
                      >
                        <input
                          type="checkbox"
                          id={services.serviceUUId}
                          value={services.serviceUUId}
                          checked={selectedServices.includes(
                            services.serviceUUId
                          )}
                          onChange={() =>
                            handleCheckboxChangeServices(services.serviceUUId)
                          }
                          className="mr-2 h-6 w-6 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label
                          htmlFor={services.serviceUUId}
                          className="text-gray-700 cursor-pointer"
                        >
                          {services.serviceName}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 px-4 py-2">
                      No services available
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <button
        className="px-6 py-2 text-[14px] w-[150px] bg-orange-500 h-[30px] text-white rounded-md hover:bg-orange-600"
        onClick={() => handleSegment()}
      >
        Save
      </button>
      {/*   <button className="px-6 py-2 text-[14px] w-[150px] h-[30px] text-orange-500 rounded-md hover:bg-gray-300 border border-orange-500">
            Cancel
          </button> */}
    </>
  );
};

export default NetworkProfile;
