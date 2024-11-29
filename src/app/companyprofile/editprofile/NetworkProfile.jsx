"use client"
import React, { useState, useEffect } from "react"
import CommonApi from "@/api/CommonApi"
import { useSelector } from "react-redux"

const NetworkProfile = () => {
  const [businessDomain, setBusinessDomain] = useState([])
  const [businessSegment, setBusinessSegment] = useState([])
  const [selectedDomain, setSelectedDomain] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("")
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [previousData, setPreviousData] = useState({})
  const [isDropdownOpenService, setIsDropdownOpenService] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  // const VendorMasterUUID = useSelector(
  //   (state) => state.vendor.VendorMasterUUID
  // );

  const [vendorDetails, setVendorDetails] = useState({})

  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails")
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails)) // Parse if it's a JSON string
    }
  }, [])

  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    contactPerson: "",
    gstNo: "",
    contactNumber: "",
    email: "",
    address: "",
    vendorType: "",
    locationId: "",
    domainUUId: "",
    logo: "",
  })

  const [vendorLocation, setVendorLocation] = useState("")
  const [vendorDomain, setVendorDomain] = useState("")
  // const [vendorDomainUUId, setVendorDomainUUId] = useState("")
  const [vendorServices, setVendorSrvices] = useState([])

  const [locations, setLocations] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "vendorType" ? parseInt(value, 10) : value, // Convert to number for vendorType
    }))
  }

  const handleDomainChange = (val) => {
    setSelectedDomain(val)
    console.log(val)
  }

  // Fetch business domain
  const getBusinessDomains = async (domainId) => {
    try {
      const res = await CommonApi.getData(`Vendor/business-domain`, {}, {})
      // console.log("Business Domains Response:", res.data)

      // Normalize to lowercase for comparison, handle undefined
      const normalizedDomainId = domainId?.toLowerCase?.() || ""
      const domain = res.data.find(
        (dom) => dom.domainUUId?.toLowerCase() === normalizedDomainId
      )

      setVendorDomain(domain ? domain.vendorDomainName : "Invalid domain")
      console.log

      // If domain is valid, fetch services
      // if (domain) {
      //   getServices(domain.domainUUId)
      // }
    } catch (error) {
      console.error("Error fetching business domains:", error)
    }
  }

  // Fetch business segments
  const getBusinessSegment = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/business-segments`, // Use vendorMasterUUId here
        {},
        { vendorMasterUUId: vendorDetails.vendorMasterUUId }
      )
      // console.log("Business Segment Response:", res.data[0].segmentDetails)
      
      setBusinessSegment(res.data[0].segmentDetails)
    } catch (error) {
      console.error("Error fetching business segments:", error)
    }
  }

  // Fetch products based on the selected segment
  const getProducts = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/vendor-products`,
        {}, // Additional payload if necessary
        {}
      )

      const productsData = res.data
      console.log(res.data)
      // setProducts(productsData)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // Fetch products on component mount
  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      getProducts()
    }
  }, [vendorDetails])

  // Toggles the visibility of the dropdown
  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  // Handles checkbox selection
  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    )
  }

  // get vendor details api
  const getVendorDetails = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${vendorDetails.vendorMasterUUId}/details`,
        {},
        {}
      )

      console.log("vendordetails", res.data)

      setCompanyDetails((prev) => {
        return { ...prev, ...res.data }
      })

      getLocations(res.data.locationId)
      getBusinessDomains(res.data.vendorDomainUUId)

      console.log("companydetails", companyDetails)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const getLocations = async (locationId) => {
    try {
      const res = await CommonApi.getData("Vendor/locations", {}, {})

      setLocations(res.data)

      // Find the location based on the given locationId
      const location = res.data.find((loc) => loc.locationId === locationId)
      setVendorLocation(location ? location.location : "Location not found")
    } catch (error) {
      console.error("Error fetching locations:", error)
    }
  }

  //services//
  const getServices = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/vendor-services`,
        {}, // Additional payload if necessary
        {}
      )

      const serviceData = res.data
      console.log(serviceData)
      // setServices(serviceData)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      getServices()
      getVendorDetails()
    }
  }, [vendorDetails])

  const handleToggleDropdownServices = () => {
    setIsDropdownOpenService((prevState) => !prevState)
  }
  const handleCheckboxChangeServices = (servicesId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(servicesId)
        ? prevSelected.filter((id) => id !== servicesId)
        : [...prevSelected, servicesId]
    )
  }
  //end//
  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      getBusinessSegment()
      let data = handleSegment()
      // setPreviousData(data);
      setSelectedDomain(data.domain)
      setSelectedSegment(data.segments)
      setProducts(data.productsData)
      setServices(data.productsData)
    }
  }, [vendorDetails])
  //submit//

  const handleSegment = async () => {
    try {
      const response = await CommonApi.putData(
        "Vendor/preferences",
        {},
        {
          vendorMasterUUId: vendorDetails.vendorMasterUUId,
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
      )

      if (response) {
        console.log("Vendor Master UUID:", response.vendorMasterUUId)
        console.log("Domain UUID:", response.domainUUId)

        if (response.vendorSegmentsDetail) {
          response.vendorSegmentsDetail.forEach((segment) => {
            console.log("Vendor Domain UUID:", segment.vendorDomainUUId)
            console.log("Segment UUID:", segment.segmentUUId)
          })
        }

        if (response.vendorProductDetail) {
          response.vendorProductDetail.forEach((product) => {
            console.log("Product UUID:", product.productUUId)
          })
        }

        if (response.vendorServiceDetail) {
          response.vendorServiceDetail.forEach((service) => {
            console.log("Service UUID:", service.serviceUUId)
          })
        }
      } else {
        console.log("No response data received.")
      }
    } catch (error) {
      console.error("Error while updating preferences:", error)
    }
  }

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
      )

      console.log("Response:", res)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      {/* form actions */}
      <section className='py-4 px-8 rounded-2xl flex items-start justify-end gap-x-6 mb-8'>
        {/* save button */}
        <button
          className='text-[14px] w-[150px] bg-gray-950 px-4 py-4 text-white rounded-md hover:bg-black'
          onClick={() => handleCompanyDetails()}
        >
          Save
        </button>

        {/* cancel button */}
        <button className='px-4 py-4 text-[14px] w-[150px] text-gray-950 rounded-md hover:bg-gray-300 border border-gray-950'>
          Cancel
        </button>
      </section>

      {/* section 1 */}
      <section className='pt-16 pb-8 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
        <div className='w-1/3'>
          <h2 className='text-2xl font-bold'>Company Details</h2>
        </div>
        <div className='w-2/3'>
          <div className='w-full flex items-start justify-center gap-x-6'>
            {/* company name */}
            <div className='mb-8 w-1/2'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Company Name
              </label>
              <input
                type='text'
                name='companyName'
                className='mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
                value={companyDetails.companyName}
                onChange={handleInputChange}
              />
            </div>

            {/* gst no. */}
            <div className='mb-8 w-1/2'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                GST No.
              </label>
              <input
                type='                                                                                          text'
                name='gstNo'
                className='mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
                value={companyDetails.gstNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='w-full flex items-start justify-start gap-x-6 mt-6'>
            <div className='mb-8 w-1/2'>
              <p className='block text-[14px] text-xl font-medium text-black mb-10'>
                Are you a seller or buyer?
              </p>
              <div className='flex items-center justify-start gap-x-4'>
                <input
                  type='radio'
                  id='buyer'
                  name='vendorType'
                  value={2}
                  checked={companyDetails.vendorType === 2}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor='buyer'
                  className='block text-[14px] text-xl font-medium text-black'
                >
                  Buyer
                </label>

                <input
                  type='radio'
                  id='seller'
                  name='vendorType'
                  value={1}
                  checked={companyDetails.vendorType === 1}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor='seller'
                  className='block text-[14px] text-xl font-medium text-black'
                >
                  Seller
                </label>
              </div>
            </div>
            <div className='mb-8 w-1/2'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Business Domain
              </label>
              <select
                id='businessDomain'
                value={vendorDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className='mt-1 w-full px-3 py-4 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
              >
                <option value='' disabled>
                  Select a business domain
                </option>
                {businessDomain.length > 0 ? (
                  businessDomain.map((domain, index) => (
                    <option key={index} value={domain.domainUUId}>
                      {domain.domainName}
                    </option>
                  ))
                ) : (
                  <option value='' disabled>
                    Loading...
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className='pt-16 pb-8 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
        <div className='w-1/3'>
          <h2 className='text-2xl font-bold'>Contact Details</h2>
        </div>
        <div className='w-2/3'>
          <div className='w-full flex items-start justify-center gap-x-6'>
            {/* contact person */}
            <div className='mb-8 w-full'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Contact Person
              </label>
              <input
                type='text'
                name='contactPerson'
                className='mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
                value={companyDetails.contactPerson}
                onChange={handleInputChange}
              />
            </div>

            {/* contact number */}
            <div className='mb-8 w-full'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Contact Number
              </label>
              <input
                type='text'
                name='contactNumber'
                className='mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
                value={companyDetails.contactNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='w-full flex items-start justify-center gap-x-6'>
            {/* email */}
            <div className='mb-8 w-1/2'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Email
              </label>
              <input
                type='text'
                name='email'
                className='mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
                value={companyDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-8 w-1/2'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Location
              </label>
              <select
                id='businessDomain'
                value={vendorLocation}
                onChange={(e) => handleDomainChange(e.target.value)}
                className='mt-1 w-full px-3 py-4 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
              >
                <option value='' disabled>
                  Select your location
                </option>
                {locations.length > 0 ? (
                  locations.map((loc, index) => (
                    <option key={index} value={loc.locationUUId}>
                      {loc.location}
                    </option>
                  ))
                ) : (
                  <option value='' disabled>
                    Loading...
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className='w-full flex items-start justify-center gap-x-6'>
            {/* address */}
            <div className='mb-8 w-full'>
              <label
                htmlFor='businessDomain'
                className='block text-[14px] text-xl font-medium text-black mb-2'
              >
                Address
              </label>

              <textarea
                onChange={handleInputChange}
                rows={4}
                value={companyDetails.address}
                className='mt-1 w-full px-3 py-3 text-[14px]  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100'
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className='pt-16 pb-8 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
        <div className='w-1/3'>
          <h2 className='text-2xl font-bold'>Company Details</h2>
        </div>
        <div className='w-2/3'>
          <div className='w-full flex items-start justify-center gap-x-6'>
            <div className='mb-8 w-full'>
              <h2 className='text-3xl font-medium mb-8'>Business Segments</h2>
              <div className='flex flex-wrap gap-6'>
                {businessSegment.map((segment, index) => (
                  <div
                    key={index}
                    className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start '
                  >
                    <h3 className='text-xl font-semibold'>
                      {segment.segmentName}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='w-full flex items-start justify-center gap-x-6'>
            <div className='mb-8 w-full'>
              <h2 className='text-3xl font-medium mb-8'>Products</h2>
              <div className='flex flex-wrap gap-6'></div>
            </div>
          </div>
          <div className='w-full flex items-start justify-center gap-x-6'>
            <div className='mb-8 w-full'>
              <h2 className='text-3xl font-medium mb-8'>Services</h2>
              <div className='flex flex-wrap gap-6'></div>
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
  )
}

export default NetworkProfile
