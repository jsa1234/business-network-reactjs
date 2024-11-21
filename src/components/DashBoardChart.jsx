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
  const data = {
    labels: [
      "Red",
      "Blue",
      "Yellow",
      "Green",
      "Purple",
      "Orange",
      "Apple",
      "Orange",
      "Pineapple",
      "Lemon",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [9, 12, 3, 5, 2, 3, 7, 5, 9, 4],
        backgroundColor: [
          "#46332E",
          "#46332E",
          "#46332E",
          "#46332E",
          "#46332E",
          "#46332E",
        ],
        borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hides vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 10, // Add border radius to all bars
      },
    },
    barPercentage: 0.5, // Controls the width of bars inside each category
    categoryPercentage: 0.3, // Controls the spacing between bars
  }

  const dataLine = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Yearly Sales",
        data: [10, 20, 30, 15, 40, 50], // Data points for each label
        borderColor: "rgba(70, 51, 46, 1)", // Line color
        tension: 0.5, // Smoothness of the line
        borderWidth: 2, // Line width
        fill: true,
        backgroundColor: "rgba(70, 51, 46, 0.45)", // Color of the fill under the line
      },
      {
        label: "Monthly Sales",
        data: [10, 30, 57, 50, 56, 50], // Data points for each label
        borderColor: "rgba(252, 129, 24, 1)", // Line color
        tension: 0.5, // Smoothness of the line
        borderWidth: 2, // Line width
        fill: "origin",
        backgroundColor: "rgba(253, 154, 70, 0.42)", // Color of the fill under the line
      },
    ],
  }

  // Options for the line chart
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
        title: {
          display: true,
          text: "",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "",
        },
        beginAtZero: true, // Ensure the y-axis starts at 0
      },
    },
  }

  const [saleByProductData, setSaleByProductData] = useState([])

  const VendorMasterUUID = useSelector((state) => state.vendor.VendorMasterUUID)
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])

  const [productUUID, setProductUUID] = useState()
  const [supplierUUID, setSupplierUUID] = useState()

  useEffect(() => {
    getSuppliers()
    getProducts()
  }, [])

  useEffect(() => {
    getSaleByProduct()
  }, [productUUID])

  useEffect(() => {
    getSaleByBuyer()
  }, [supplierUUID])

  // get sales by product api
  async function getSaleByProduct() {
    try {
      const res = await CommonApi.getData(
        `Stock/get-sale-by-product`,
        {},
        { VendorMasterUUID, productUUID }
      )
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  // get sales by suppliers api
  async function getSaleByBuyer() {
    try {
      const res = await CommonApi.getData(
        `Stock/get-sales-by-buyer`,
        {},
        { VendorMasterUUID, supplierUUID }
      )
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  // get suppliers api
  async function getSuppliers() {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/suppliers`,
        {},
        {}
      )
      // console.log(res.data)
      setSuppliers(res.data)
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  // get products api
  async function getProducts() {
    try {
      const res = await CommonApi.getData(
        `Vendor/${VendorMasterUUID}/products`,
        {},
        {}
      )
      // console.log(res.data)
      setProducts(res.data)
    } catch (error) {
      console.error("Error fetching network data:", error)
    }
  }

  return (
    <div className='charts grid grid-cols-12 gap-4 h-full'>
      <div className='charts-item col-span-6'>
        <Line data={dataLine} options={optionsLine} />
        <select
          id='dropdown'
          className='dropdownSelect capitalize'
          onChange={(e) => setProductUUID(e.target.value)}
        >
          <option value='' className='font-bold text-black'>
            Choose
          </option>
          {products.map((item, index) => {
            return (
              <option
                key={index}
                className='capitalize'
                value={item.productUUId}
              >
                {item.productName}
              </option>
            )
          })}
        </select>
      </div>
      <div className='charts-item col-span-6'>
        <Bar data={data} options={options} />
        <select
          id='dropdown'
          className='dropdownSelect capitalize'
          onChange={(e) => setSupplierUUID(e.target.value)}
        >
          <option value='' className='font-bold text-black'>
            Choose
          </option>
          {suppliers.map((item, index) => {
            return (
              <option
                key={index}
                className='capitalize'
                value={item.supplierUUId}
              >
                {item.supplierName}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default DashBoardChart
