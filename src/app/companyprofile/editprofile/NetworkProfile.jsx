"use client";
import React, { useState, useEffect } from "react";
import CommonApi from "@/api/CommonApi";
import { useSelector } from "react-redux";

const NetworkProfile = () => {
  const [businessSegment, setBusinessSegment] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [vendorDetails, setVendorDetails] = useState({});

  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));
    }
  }, []);

  const [vendorLocation, setVendorLocation] = useState("");
  const [vendorDomain, setVendorDomain] = useState("");
  const [locations, setLocations] = useState([]);
  const [domains, setDomains] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    contactPerson: "",
    gstNo: "",
    contactNumber: "",
    email: "",
    address: "",
    vendorType: "",
    locationId: "",
    logo: "",
  });

  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      getVendorDetails();
    }
  }, [vendorDetails]);
  //end//

  // get vendor details api
  const getVendorDetails = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${vendorDetails.vendorMasterUUId}/details`,
        {},
        {}
      );

      setCompanyDetails((prev) => {
        return { ...prev, ...res.data };
      });

      getLocations(res.data.locationId);
      getBusinessDomains(res.data.vendorDomainUUId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getLocations = async (locationId) => {
    try {
      const res = await CommonApi.getData("Vendor/locations", {}, {});

      setLocations(res.data);

      // Find the location based on the given locationId
      const location = res.data.find((loc) => loc.locationId === locationId);
      setVendorLocation(location ? location.locationId : "");
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Fetch business domain
  const getBusinessDomains = async (domainId) => {
    try {
      const res = await CommonApi.getData(`Vendor/business-domain`, {}, {});

      const domain = res.data.find((dom) => dom.domainUUId === domainId);

      setVendorDomain(domain ? domain.domainUUId : "");
      setDomains(res.data);
    } catch (error) {
      console.error("Error fetching business domains:", error);
    }
  };

  // Handle selection toggle
  const handleSegmentClick = (segmentName) => {
    setSelectedSegments(
      (prevSelected) =>
        prevSelected.includes(segmentName)
          ? prevSelected.filter((name) => name !== segmentName) // Remove if already selected
          : [...prevSelected, segmentName] // Add to selected if not already
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "vendorType" ? parseInt(value, 10) : value, // Convert to number for vendorType
    }));
  };

  const handleDomainChange = (val) => {
    setVendorDomain(val);
    setCompanyDetails((prevState) => {
      return { ...prevState, vendorDomainUUId: val };
    });
  };

  const handleLocationChange = (val) => {
    setVendorLocation(val);
    setCompanyDetails((prevState) => {
      return { ...prevState, locationId: val };
    });
  };

  const saveDetails = async () => {
    console.log(companyDetails);
    // return
    // Extract only the necessary fields
    const {
      vendorMasterUUId,
      companyName,
      contactPerson,
      gstNo,
      contactNumber,
      email,
      address,
      vendorType,
      locationId,
      vendorERPStockAPIUrl,
    } = companyDetails;

    // Create a FormData object
    const formData = new FormData();
    formData.append("VendorMasterUUId", vendorMasterUUId);
    formData.append("CompanyName", companyName);
    formData.append("ContactPerson", contactPerson);
    formData.append("GstNo", gstNo);
    formData.append("ContactNumber", contactNumber);
    formData.append("Email", email);
    formData.append("Address", address);
    formData.append("VendorType", vendorType);
    formData.append("LocationId", locationId);
    formData.append("VendorERPStockAPIUrl", vendorERPStockAPIUrl);

    try {
      // Set the headers for form-data
      const headers = { "Content-Type": "multipart/form-data" };

      // Send the request using the FormData object
      const res = await CommonApi.putData(
        `Vendor/company-details`,
        { headers },
        formData
      );

      console.log("Response from saveDetails:", res);
    } catch (error) {
      console.error("Error saving company details:", error);
    }
  };

  return (
    <>
      {/* form actions */}
      <section className="py-4 px-8 rounded-2xl flex items-start justify-end gap-x-6 mb-8">
        {/* save button */}
        <button
          className="text-[14px] w-[150px] bg-orange-500  px-4 py-4 text-white rounded-md hover:bg-orange-500 "
          onClick={() => saveDetails()}
        >
          Save
        </button>

        {/* cancel button */}
        <button className="px-4 py-4 text-[14px] w-[150px] text-gray-950 rounded-md hover:bg-gray-300 border border-gray-950">
          Cancel
        </button>
      </section>

      {/* section 1 */}
      <section className="pt-16 pb-8 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
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
              <p className="block text-[14px] text-xl font-medium text-black mb-10">
                Are you a seller or buyer?
              </p>
              <div className="flex items-center justify-start gap-x-4">
                <input
                  type="radio"
                  id="buyer"
                  name="vendorType"
                  value={2}
                  checked={companyDetails.vendorType === 2}
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
                  value={1}
                  checked={companyDetails.vendorType === 1}
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
            <div className="mb-8 w-1/2">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Business Domain
              </label>
              <select
                id="businessDomain"
                value={vendorDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="mt-1 w-full px-3 py-4 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              >
                <option value="" disabled>
                  Select a business domain
                </option>
                {domains.length > 0 ? (
                  domains.map((domain, index) => (
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
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="pt-16 pb-8 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
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
            <div className="mb-8 w-1/2">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                value={companyDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-8 w-1/2">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Location
              </label>
              <select
                id="businessDomain"
                value={vendorLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="mt-1 w-full px-3 py-4 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              >
                <option value="" disabled>
                  Select your location
                </option>
                {locations.length > 0 ? (
                  locations.map((loc, index) => (
                    <option key={index} value={loc.locationId}>
                      {loc.location}
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
            {/* address */}
            <div className="mb-8 w-full">
              <label
                htmlFor="businessDomain"
                className="block text-[14px] text-xl font-medium text-black mb-2"
              >
                Address
              </label>

              <textarea
                onChange={handleInputChange}
                rows={4}
                value={companyDetails.address}
                className="mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="pt-16 pb-8 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold">Company Details</h2>
        </div>
        <div className="w-2/3">
          <div className="w-full flex items-start justify-center gap-x-6">
            <div className="mb-8 w-full">
              <h2 className="text-3xl font-medium mb-8">Business Segments</h2>
              <div className="flex flex-wrap gap-6">
                {businessSegment.map((segment, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg shadow-sm flex flex-col items-start cursor-pointer ${
                      selectedSegments.includes(segment.segmentName)
                        ? "bg-blue-200" // Highlight for selected items
                        : "bg-gray-50"
                    }`}
                    onClick={() => handleSegmentClick(segment.segmentName)}
                  >
                    <h3 className="text-xl font-semibold">
                      {segment.segmentName}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex items-start justify-center gap-x-6">
            <div className="mb-8 w-full">
              <h2 className="text-3xl font-medium mb-8">Products</h2>
              <div className="flex flex-wrap gap-6"></div>
            </div>
          </div>
          <div className="w-full flex items-start justify-center gap-x-6">
            <div className="mb-8 w-full">
              <h2 className="text-3xl font-medium mb-8">Services</h2>
              <div className="flex flex-wrap gap-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* <button
        className='px-6 py-2 text-[14px] w-[150px] bg-orange-500 h-[30px] text-white rounded-md hover:bg-orange-600'
        onClick={() => handleSegment()}
      >
        Save
      </button> */}
      {/*   <button className="px-6 py-2 text-[14px] w-[150px] h-[30px] text-orange-500 rounded-md hover:bg-gray-300 border border-orange-500">
            Cancel
          </button> */}
    </>
  );
};

export default NetworkProfile;
