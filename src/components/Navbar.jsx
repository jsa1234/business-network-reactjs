"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Navbar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const router = useRouter();
  const [vendorDetails,setVendorDetails]=useState({});
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  useEffect(() => {
    // Function to update state with sessionStorage data
    const updateVendorDetails = () => {
      const storedVendorDetails = sessionStorage.getItem("vendorDetails");
      if (storedVendorDetails) {
        setVendorDetails(JSON.parse(storedVendorDetails));  // Parse the string to an object
      }
    };

    // Set initial vendor details when the component mounts
    updateVendorDetails();

    // Add event listener to listen for changes in sessionStorage
    window.addEventListener("storage", updateVendorDetails);

    // Clean up the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener("storage", updateVendorDetails);
    // };
  }, []);
  const toggleDropdown = (e) => {
      setIsDropdownOpen(!isDropdownOpen);
    
  };

  const handleLogout = () => {
    toggleDropdown();
    sessionStorage.removeItem("vendorDetails");
    router.push("/login");
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {pathname !== "/login" ? (
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
                    width={80}
                    height={30}
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
                       {vendorDetails.companyName}
                      </span>
                    </p>
                  </div>
                  <div className="relative">
                    <div className="cursor-pointer" onClick={toggleDropdown}>
                      <Image
                        src="/assests/header-icons.png"
                        alt="header-icon"
                        width={40}
                        height={40}
                      />
                    </div>
                    {isDropdownOpen && (
                      <div
                        ref={dropdownRef} // Attach the ref here
                        className="absolute right-0 mt-4 mb-4 bg-white rounded-[20px] w-[250px] text-center  profile-header"
                      >
                        <ul className="text-lg">
                          <li className="px-4 py-2 pt-4 hover:bg-gray-100">
                            <Link href="/companyprofile" className="block p-6 flex align-center justify-between">
                            <AccountCircleOutlinedIcon color="warning"fontSize="large"/>
                              <h1>Company Profile</h1>
                            </Link>
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100">
                            <button
                              className="block w-full text-center p-6 flex align-center justify-between"
                              onClick={() => handleLogout()}
                            >
                              <LogoutIcon color="warning"fontSize="large"/>
                              <h1>Logout</h1>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
