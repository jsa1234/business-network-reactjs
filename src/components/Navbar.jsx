"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import Buttons from "./Buttons/Buttons";

const Navbar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const router=useRouter()
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout=()=>{
    toggleDropdown();
    sessionStorage.removeItem("vendorDetails");
    router.push("/login");
  }

  return (
    <>
    {pathname!='/login'?
    <div className="bg-white">
      <nav>
        <div className="container">
          <div className="flex justify-between uppercase items-center mt-0 pt-6 pb-6 ml-6 mr-6">
            <Link href="/" className="flex items-center text-5xl font-bold">
              <div className="mr-[40px] ">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1L0.999999 7L7 13"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Image
                src="/assests/olopo-logo.png"
                alt="Logo"
                width={120}
                height={45}
              />
            </Link>

            <div className="gap-5 items-center md:flex hidden">
              <Link href="/" className="notification mr-10">
                <div className="bg-[#2DDBA726] rounded-3xl p-3.5">
                  <Image
                    src="/assests/icons/notifications.svg"
                    alt="notifications"
                    width={20}
                    height={23}
                  />
                </div>
                <div className="count">
                  <span>27</span>
                </div>
              </Link>
              <div className="w-[2px] h-14 flex-shrink-0 rounded bg-[#dedfe3] mr-10"></div>
              <div className="text-[#464255] text-lg font-normal leading-normal mr-4">
                <p>
                  Hello,{" "}
                  <span className="text-[#464255] text-lg font-semibold leading-normal">
                    MS Market
                  </span>
                </p>
              </div>
              <div className="relative">
                <div
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <Image
                    src="/assests/header-icons.png"
                    alt="header-icon"
                    width={40}
                    height={40}
                  />
                </div>
                {isDropdownOpen && (
                 <div className="absolute right-0 mt-4 mb-4 bg-white  rounded-[10px] w-[300px] text-center  profile-header">
                 <ul className="text-lg">
                   <li className="px-4 py-2 pt-4  hover:bg-gray-100">
                     <Link href="/companyprofile" className="block">
                       Company Profile
                     </Link>
                   </li>
                   <li className="px-4 py-2 hover:bg-gray-100">
                     <button
                       className="block w-full text-center"
                       onClick={() => handleLogout()}
                     >
                       Logout
                     </button>
                   </li>
                  {/*  <li className="px-4 py-2 hover:bg-gray-100 pb-4">
                     <button
                       className="block w-full text-center  text-white py-2 rounded header-button"
                     >
                       Update
                     </button>
                   </li> */}
                 </ul>
               </div>
               
                )}
              </div>
            </div>

          </div>
        </div>
      </nav>
    </div>
    :''}
    </>
  );
};

export default Navbar;
