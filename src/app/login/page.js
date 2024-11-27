"use client";

import React, { useState } from "react";
import "../styles/login.scss";
import Image from "next/image";
import Link from "next/link";
import LoginApi from "@/api/LoginApi";
import { useDispatch, useSelector } from 'react-redux';
import { setVendorMasterUUID } from '../../store/vendorSlice';
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({});
  const [fieldTextType, setFieldTextType] = useState(false);
  const dispatch = useDispatch();
  const router=useRouter();
  const VendorMasterUUID = useSelector(
    (state) => state.vendor.VendorMasterUUID
  );
  // const handleVendorChange = (newVendorId) => {
  //     dispatch(setVendorMasterUUID(newVendorId));
  // };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) {
      newErrors.userName = "Vendor ID is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // setErrors({});
    console.log("Vendor ID:", formData.userName);
    console.log("Password:", formData.password);
    let data = await LoginApi.login(
      "Vendor/login",
      {},
      {
        username: "super@mail.com",
        password: "123456",
      }
    );
    if(data.success &&data.message=='success'){
      console.log(data.data);
      // await dispatch(setVendorMasterUUID(data.data));
      sessionStorage.setItem("vendorDetails",JSON.stringify(data.data));
      router.push('/');
    }
  };

  return (
    <section className="flex items-center justify-between h-screen w-full bg-white">
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="w-[400px] mb-20">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={45}
            className="mb-10"
          />
          <h1 className="font-bold text-5xl mb-10">
            Login to Business Network
          </h1>
          <p className="text-2xl font-medium">Provide your login credentials</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-y-6"
        >
          <div className="w-[400px] mb-8">
            <label className="text-xl font-bold">Vendor ID</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter your login ID"
              className="rounded-lg px-4 py-5 w-full border-b-4 border-transparent focus:border-[#54e28d] outline-none bg-[#f8f8f8] text-xl mt-4"
            />
            {errors.userName && (
              <span className="text-red-500 text-sm">{errors.userName}</span>
            )}
          </div>
          <div className="w-[400px]">
            <label className="text-xl font-bold">Password</label>
            <div className="flex items-center mt-4 rounded-lg bg-[#f8f8f8] border-b-4 border-transparent focus-within:border-[#54e28d]">
              <input
                type={fieldTextType ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="flex-grow px-4 py-5 text-xl outline-none bg-transparent"
              />
              <span
                className="cursor-pointer px-4"
                onClick={() => setFieldTextType(!fieldTextType)}
              >
                {fieldTextType ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-500 hover:text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-500 hover:text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div className="w-[400px] flex justify-end my-4">
            <Link href="#">
              <span className="text-[#fc8118] font-bold text-xl">
              {VendorMasterUUID}
              </span>
            </Link>
          </div>
          <div className="w-[400px]">
            <button
              type="submit"
              className="rounded-lg px-4 py-5 w-full bg-[#fc8118] text-white text-2xl font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 h-full">
        <img
          src="/assests/login-screen-image.png"
          className="absolute right-0 top-0 max-w-full max-h-full object-contain"
        />
      </div>
    </section>
  );
};

export default Page;
