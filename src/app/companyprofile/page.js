"use client"
import Pagenavigation from "@/components/Pagenavigation"
import React, { useEffect, useState } from "react"
import CommonApi from "@/api/CommonApi"
import Image from "next/image"

const Page = () => {
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

  const [businessSegment, setBusinessSegment] = useState([])
  const [products, setProducts] = useState([])
  const [vendorLocation, setVendorLocation] = useState("")
  const [vendorDomain, setVendorDomain] = useState("")
  const [vendorDetails, setVendorDetails] = useState({})
  // const [vendorDomainUUId, setVendorDomainUUId] = useState("")
  const [vendorServices, setVendorSrvices] = useState([])
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails")
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails)) // Parse if it's a JSON string
    }
  }, [])
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      getVendorDetails()
    }
  }, [vendorDetails])
  const getVendorDetails = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${vendorDetails.vendorMasterUUId}/details`,
        {},
        {}
      )

      // console.log(res.data)

      setCompanyDetails((prev) => {
        return { ...prev, ...res.data }
      })

      getLocations(res.data.locationId)
      getBusinessDomains(res.data.vendorDomainUUId)
      // console.log("vendor", res.data.vendorDomainUUId)
      getProducts(res.data.vendorDomainUUId)
      getBusinessSegments()
    } catch (error) {
      console.error("Error fetching vendor details:", error)
    }
  }

  const getBusinessDomains = async (domainId) => {
    try {
      const res = await CommonApi.getData(`Vendor/business-domain`, {}, {})
      // console.log("Business Domains Response:", res.data)

      // Normalize to lowercase for comparison, handle undefined
      const normalizedDomainId = domainId?.toLowerCase?.() || ""
      const domain = res.data.find(
        (dom) => dom.domainUUId?.toLowerCase() === normalizedDomainId
      )

      setVendorDomain(domain ? domain.domainName : "Invalid domain")

      // console.log("domain", domain)

      // If domain is valid, fetch services
      if (domain) {
        getServices(domain.domainUUId)
      }
    } catch (error) {
      console.error("Error fetching business domains:", error)
    }
  }

  const getLocations = async (locationId) => {
    try {
      const res = await CommonApi.getData("Vendor/locations", {}, {})

      // Find the location based on the given locationId
      const location = res.data.find((loc) => loc.locationId === locationId)
      setVendorLocation(location ? location.location : "Location not found")
    } catch (error) {
      console.error("Error fetching locations:", error)
    }
  }

  const getBusinessSegments = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/business-segments`,
        {},
        { vendorMasterUUId: vendorDetails.vendorMasterUUId }
      )

      console.log("segments", res.data[0].vendorSegments)

      setBusinessSegment(res.data[0].vendorSegments)
    } catch (error) {
      console.error("Error fetching business segments:", error)
    }
  }

  const getProducts = async (domainId) => {
    try {
      const res = await CommonApi.getData(
        `Vendor/vendor-products`,
        {},
        {
          vendorMasterUUId: vendorDetails.vendorMasterUUId,
          domainUUId: domainId,
        }
      )

      console.log({
        vendorMasterUUId: vendorDetails.vendorMasterUUId,
        domainUUId: domainId,
      })

      console.log("products", res.data)

      setProducts(res.data[0].vendorProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const getServices = async (domain) => {
    try {
      const res = await CommonApi.getData(
        `Vendor/vendor-services`,
        {},
        { vendorMasterUUId: vendorDetails.vendorMasterUUId, domainUUId: domain }
      )

      // console.log("services", res.data[0].vendorServices)
      setVendorSrvices(res.data[0].vendorServices)
    } catch (error) {
      console.error("Error fetching business segments:", error)
    }
  }

  const urlList = ["/", "/editprofile"]

  return (
    <div className='bus__body w-full pl-9 mt-6 pr-3 pb-9'>
      <div className='flex justify-between'>
        <div className='w-full md:w-1/2'>
          <Pagenavigation pageName='Company Profile' urlList={urlList} />
          <p>Hi, MS Market. Welcome back to Olopo</p>
        </div>
      </div>
      <div className='w-full mt-6'>
        <section className='py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
          <div className='w-1/2 flex'>
            <div className='w-1/4 mr-10'>
              <img
                src='/assests/avatar.png'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='w-3/4 flex flex-col gap-y-10'>
              <div>
                <h2 className='text-5xl font-medium'>
                  {companyDetails.companyName}
                </h2>
                <p className='pt-2 text-2xl mb-8'>{companyDetails.gstNo}</p>
              </div>
              <div>
                {/* <a
                  href='companyprofile/editprofile'
                  className='text-2xl font-semibold bg-orange-500  px-6 py-4 text-white rounded-md hover:bg-orange-500'
                >
                  Edit Profile
                </a> */}
                <button className='text-2xl font-semibold bg-orange-500  px-6 py-4 text-white rounded-md hover:bg-orange-500'>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className='w-1/2 flex items-start justify-between gap-x-6'>
            <div className='w-1/2'>
              <div className=' text-2xl text-black'>
                <div className='flex mb-4'>
                  <div style={{ flex: 1 }} className='font-medium '>
                    Contact Person:
                  </div>
                  <div style={{ flex: 1 }}>{companyDetails.contactPerson}</div>
                </div>
                <div className='flex mb-4'>
                  <div style={{ flex: 1 }} className='font-medium'>
                    Contact Number:
                  </div>
                  <div style={{ flex: 1 }}>{companyDetails.contactNumber}</div>
                </div>
                <div className='flex mb-4'>
                  <p style={{ flex: 1 }} className='font-medium break-words'>
                    Email:
                  </p>
                  <p className='break-words' style={{ flex: 1 }}>
                    {companyDetails.email}
                  </p>
                </div>
                <div className='flex mb-4'>
                  <div style={{ flex: 1 }} className='font-medium'>
                    Location:
                  </div>
                  <div style={{ flex: 1 }}>{vendorLocation}</div>
                </div>
                <div className='flex mb-4'>
                  <div style={{ flex: 1 }} className='font-medium'>
                    Address:
                  </div>
                  <div style={{ flex: 1 }}>{companyDetails.address}</div>
                </div>
                <div className='flex mb-4'>
                  <div style={{ flex: 1 }} className='font-medium'>
                    Business Domain:
                  </div>
                  <div style={{ flex: 1 }}>{vendorDomain}</div>
                </div>
              </div>
            </div>

            <div className='w-1/2'>
              <h2 className='text-3xl font-medium mb-8'>Business Segments</h2>
              <div className='flex flex-wrap gap-6'>
                {businessSegment.length === 0 ? (
                  <p className='text-2xl font-semibold'>No Segments selected</p>
                ) : (
                  businessSegment.map((segment, index) => (
                    <div
                      key={index}
                      className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start '
                    >
                      <h3 className='text-xl font-semibold'>
                        {segment.segmentName}
                      </h3>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className='py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
          <div className='  rounded-2xl bg-white mb-8'>
            <h2 className='text-3xl font-medium mb-8'>Services</h2>
            <div className='flex flex-wrap gap-6'>
              {vendorServices.length === 0 ? (
                <p className='text-2xl font-semibold'>No services selected</p>
              ) : (
                vendorServices.map((service, index) => (
                  <div
                    key={index}
                    className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start '
                  >
                    <h3 className='text-xl font-semibold'>
                      {service.serviceName}
                    </h3>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <section className='py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
          <div className='  rounded-2xl bg-white mb-8'>
            <h2 className='text-3xl font-medium mb-8'>Products</h2>
            <div className='flex flex-wrap gap-6'>
              {products.length === 0 ? (
                <p className='text-2xl font-semibold'>No products</p>
              ) : (
                products.map((product, index) => (
                  <div
                    key={index}
                    className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start '
                  >
                    <h3 className='text-xl font-semibold'>
                      {product.productName}
                    </h3>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
