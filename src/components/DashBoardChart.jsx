"use client"

import React, { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { useSelector } from "react-redux"
import CommonApi from "@/api/CommonApi"

// Registering the chart elements
ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const DashBoardChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales by Buyers",
        data: [],
        backgroundColor: "#46332E",
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  })

  const [dataLine, setDataLine] = useState({
    labels: [],
    datasets: [
      {
        label: "Weekly Sales",
        data: [],
        borderColor: "rgba(252, 129, 24, 1)",
        tension: 0.5,
        borderWidth: 2,
        fill: "origin",
        backgroundColor: "rgba(253, 154, 70, 0.42)",
      },
    ],
  })

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
    barPercentage: 0.5,
    categoryPercentage: 0.3,
  }

  const optionsLine = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sales By Product",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  }

  const [saleByProductData, setSaleByProductData] = useState([])
  const [saleByBuyersData, setSaleByBuyersData] = useState([])

  const VendorMasterUUID = useSelector((state) => state.vendor.VendorMasterUUID)
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])

  const [productUUID, setProductUUID] = useState()
  const [supplierUUID, setSupplierUUID] = useState()
  const [vendorDetails,setVendorDetails]=useState({});
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
      getSuppliers();
      getProducts();
      async function fetchInitialData() {
        try {
          // Fetch suppliers and set the first one as the default
          const supplierRes = await CommonApi.getData(
            `Vendor/${vendorDetails.vendorMasterUUId}/suppliers`,
            {},
            {}
          )
          setSuppliers(supplierRes.data)
          if (supplierRes.data.length > 0) {
            setSupplierUUID(supplierRes.data[0].supplierUUId)
          }
  
          // Fetch products and set the first one as the default
          const productRes = await CommonApi.getData(
            `Vendor/${vendorDetails.vendorMasterUUId}/products`,
            {},
            {}
          )
          setProducts(productRes.data)
          if (productRes.data.length > 0) {
            setProductUUID(productRes.data[0].productUUId)
          }
        } catch (error) {
          console.error("Error fetching initial data:", error)
        }
      }
  
      fetchInitialData()
    }
  }, [vendorDetails]); 
  // useEffect(() => {
  //   getSuppliers()
  //   getProducts()
  // }, [])

  useEffect(() => {
    if (productUUID) getSaleByProduct()
  }, [productUUID])

  useEffect(() => {
    if (supplierUUID) getSaleByBuyer()
  }, [supplierUUID])

  useEffect(() => {
    const labels = saleByBuyersData.map((item) => item.x)
    const data = saleByBuyersData.map((item) => item.y)

    setData((prev) => ({
      ...prev,
      labels,
      datasets: [
        {
          ...prev.datasets[0],
          data,
        },
      ],
    }))
  }, [saleByBuyersData])

  useEffect(() => {
    const labels = saleByProductData.map((item) => item.x)
    const data = saleByProductData.map((item) => item.y)

    setDataLine((prev) => ({
      ...prev,
      labels,
      datasets: [
        {
          ...prev.datasets[0],
          data,
        },
      ],
    }))
  }, [saleByProductData])

  async function getSaleByProduct() {
    try {
      const res = await CommonApi.getData(
        `Stock/get-sale-by-product`,
        {},
        { VendorMasterUUID:vendorDetails.vendorMasterUUId, productUUID }
      )
      setSaleByProductData(res.data || [])
    } catch (error) {
      console.error("Error fetching sale by product data:", error)
    }
  }

  async function getSaleByBuyer() {
    try {
      const res = await CommonApi.getData(
        `Stock/get-sales-by-buyer`,
        {},
        { VendorMasterUUID:vendorDetails.vendorMasterUUId, supplierUUID }
      )
      setSaleByBuyersData(res.data || [])
    } catch (error) {
      console.error("Error fetching sale by buyer data:", error)
    }
  }

  async function getSuppliers() {
    try {
      const res = await CommonApi.getData(
        `Vendor/${vendorDetails.vendorMasterUUId}/suppliers`,
        {},
        {}
      )
      setSuppliers(res.data)
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    }
  }

  async function getProducts() {
    try {
      const res = await CommonApi.getData(
        `Vendor/${vendorDetails.vendorMasterUUId}/products`,
        {},
        {}
      )
      setProducts(res.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // select first product and first supplier in charts on initial load
  // useEffect(() => {
    
  // }, [vendorDetails])
  // if (Object.keys(vendorDetails).length==0) {
  //   return <div>Loading...</div>;  // Handle loading state or error
  // }
  return (
    <div className='charts grid grid-cols-12 gap-4 h-full'>
      <div className='charts-item col-span-6'>
        <Line data={dataLine} options={optionsLine} />
        <select
          id='dropdown'
          className='dropdownSelect capitalize'
          value={productUUID || ""}
          onChange={(e) => setProductUUID(e.target.value)}
        >
          {products.map((item, index) => (
            <option key={index} className='capitalize' value={item.productUUId}>
              {item.productName}
            </option>
          ))}
        </select>
      </div>
      <div className='charts-item col-span-6'>
        <Bar data={data} options={options} />
        <select
          id='dropdown'
          className='dropdownSelect capitalize'
          value={supplierUUID || ""}
          onChange={(e) => setSupplierUUID(e.target.value)}
        >
          {suppliers.map((item, index) => (
            <option
              key={index}
              className='capitalize'
              value={item.supplierUUId}
            >
              {item.supplierName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default DashBoardChart
