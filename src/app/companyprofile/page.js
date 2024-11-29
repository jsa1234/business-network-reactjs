"use client"
import Pagenavigation from "@/components/Pagenavigation"
import React, { useEffect, useState } from "react"
import CommonApi from "@/api/CommonApi"
import Image from "next/image"

const Page = () => {
  const VendorMasterUUID = "C34E50DF-6B95-4228-85F0-14D7B7AC778B"

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
  const [vendorDomainUUId, setVendorDomainUUId] = useState("")

  const getVendorDetails = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/details`,
        {},
        {}
      )

      setCompanyDetails((prev) => {
        return { ...prev, ...res.data }
      })

      getLocations(res.data.locationId)
      getBusinessDomains(res.data.domainUUId)
    } catch (error) {
      console.error("Error fetching vendor details:", error)
    }
  }

  const getBusinessDomains = async (
    domainId 
  ) => {
    try {
      const res = await CommonApi.getData(`Vendor/business-domain`, {}, {})

      // Normalize to lowercase for comparison
      const normalizedDomainId = domainId.toLowerCase()
      const domain = res.data.find(
        (dom) => dom.domainUUId.toLowerCase() === normalizedDomainId
      )

      setVendorDomainUUId(domain ? domain.domainUUId : "")
      setVendorDomain(domain ? domain.domainName : "Invalid domain")

      getServices(domain.domainUUId)
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
        { vendorMasterUUId: VendorMasterUUID }
      )

      setBusinessSegment(res.data[0]?.vendorSegments || [])
    } catch (error) {
      console.error("Error fetching business segments:", error)
    }
  }

  const getProducts = async () => {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/products`,
        {},
        {}
      )

      setProducts(res.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const getServices = async (domain) => {
    try {
      const res = await CommonApi.getData(
        `Vendor/vendor-services`,
        {},
        { vendorMasterUUId: VendorMasterUUID, domainUUId: domain }
      )

      console.log(res.data)
    } catch (error) {
      console.error("Error fetching business segments:", error)
    }
  }

  useEffect(() => {
    getVendorDetails()
    getBusinessSegments()
    getProducts()
    getBusinessDomains()
  }, [])

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
                <a
                  href='companyprofile/editprofile'
                  className='text-2xl font-semibold bg-gray-950 px-6 py-4 text-white rounded-md hover:bg-black'
                >
                  Edit Profile
                </a>
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
                  <div style={{ flex: 1 }} className='font-medium'>
                    Email:
                  </div>
                  <div style={{ flex: 1 }}>{companyDetails.email}</div>
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
        </section>

        <section className='py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
          <div className='  rounded-2xl bg-white mb-8'>
            <h2 className='text-3xl font-medium mb-8'> Services</h2>
            <div className='flex flex-wrap gap-6'>
              {products.map((product, index) => (
                <div
                  key={index}
                  className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start '
                >
                  <h3 className='text-xl font-semibold'>{product.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8'>
          <div className='  rounded-2xl bg-white mb-8'>
            <h2 className='text-3xl font-medium mb-8'>Products</h2>
            <div className='flex flex-wrap gap-6'>
              {products.map((product, index) => (
                <div
                  key={index}
                  className='p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start '
                >
                  <h3 className='text-xl font-semibold'>
                    {product.productName}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
