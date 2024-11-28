import Pagenavigation from "@/components/Pagenavigation";
import React from "react";
import Image from "next/image";

const Page = () => {
  const urlList = ["/", "/editprofile"];

  const products = [
    { name: "Product 1" },
    { name: "Product 2" },
    { name: "Product 3" },
    { name: "Product 4" },
    { name: "Product 3" },
    { name: "Product 4" },
    { name: "Product 3" },
    { name: "Product 4" },
    { name: "Product 3" },
    { name: "Product 4" },
    { name: "Product 3" },
    { name: "Product 4" },
    { name: "Product 3" },
    { name: "Product 4" },
  ];

  return (
    <div className="bus__body w-full pl-9 mt-6 pr-3 pb-9">
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          <Pagenavigation pageName="My Network Profile" urlList={urlList} />
          <p>Hi, MS Market. Welcome back to Olopo</p>
        </div>
      </div>
      <div className="w-full mt-6">
        <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
          <div className="w-2/3 flex">
            <div className="w-1/4">
              <img src="/assests/header-icons.png" className="mr-10" />
            </div>
            <div className="w-3/4 ">
              <h2 className="text-5xl font-medium">Company Name</h2>
              <p className="pt-2 text-2xl mb-8"> GST No.</p>
              <a
                href="companyprofile/editprofile"
                className="text-[14px] w-[150px] bg-gray-950 px-4 py-4 mt-4 text-white rounded-md hover:bg-black"
              >
                Edit Profile
              </a>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className=" text-2xl  text-black">
              <div className="flex">
                <div style={{ flex: 1 }} className=" font-medium ">
                  Contact Person:
                </div>
                <div style={{ flex: 1 }}>ggggg</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} className=" font-medium ">
                  Contact Number:
                </div>
                <div style={{ flex: 1 }}>666666666</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} className=" font-medium ">
                  Email:
                </div>
                <div style={{ flex: 1 }}>test@gmail.com</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} className=" font-medium ">
                  Address:
                </div>
                <div style={{ flex: 1 }}>test@gmail.com</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} className=" font-medium ">
                  Business Domain:
                </div>
                <div style={{ flex: 1 }}>test@gmail.com</div>
              </div>
              

              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }} className=" font-medium ">
                  Services:
                </div>
                <div style={{ flex: 1 }}>test@gmail.com</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
          <div className="  rounded-2xl bg-white mb-8">
            <h2 className="text-3xl font-medium mb-8"> Business Segment</h2>
            <div className="flex flex-wrap gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start "
                >
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
          <div className="  rounded-2xl bg-white mb-8">
            <h2 className="text-3xl font-medium mb-8"> Services</h2>
            <div className="flex flex-wrap gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start "
                >
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 px-16 rounded-2xl bg-white flex items-start justify-between mb-8">
          <div className="  rounded-2xl bg-white mb-8">
            <h2 className="text-3xl font-medium mb-8">Products</h2>
            <div className="flex flex-wrap gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-start "
                >
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>


       
      </div>
    </div>
  );
};

export default Page;
