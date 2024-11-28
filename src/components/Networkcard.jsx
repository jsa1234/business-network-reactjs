import Image from "next/image";
import { useEffect, useState } from "react";
import CommonApi from "@/api/CommonApi";
import ChevronIcon from "../../public/assests/icons/chevron-right-icon.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setmyNetwork } from "@/store/manageNetworkSlice";
const Networkcard = ({ vendorMstrUID,name, gst, contact, address, vender }) => {
  const dispatch = useDispatch();
  const router=useRouter();
  const [value, setValue] = useState(null);
  // const VendorType = useSelector(
  //   (state) => state.vendor.VendorType
  // );
  const [vendorDetails,setVendorDetails]=useState({});
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  const handleClick = async () => {
// href={VendorType==1 ? `/managenetwork/trading?uuid=${vendorMstrUID}` : `/managenetwork/stock-details-buyer?uuid=${vendorMstrUID}`}

    // setValue(gst);
    if(vendorDetails.vendorType==2){
      await dispatch(setmyNetwork({
        vendorMstrUID,
      }));
      router.push(`/managenetwork/trading`)
    }else{
      await dispatch(setmyNetwork({
        vendorMstrUID,
      }));
      router.push(`/managenetwork/stock-details-buyer`)
    }
  };

  return (
    <div className="netcard col-span-4 mt-4 mb-4">
      <div className="bncard__header mb-4">
        <div className="qrcard__img">
          <Image
            src="/assests/trading.png"
            alt="trading"
            width={45}
            height={45}
            className="mr-4"
          />
        </div>
        <div className="vll"></div>
        <div className="flex items-center gap-3">
          <h1>{name}</h1>
          <div className="qrcard__details_2">
            <button
              // href={VendorType==1 ? `/managenetwork/trading?uuid=${vendorMstrUID}` : `/managenetwork/stock-details-buyer?uuid=${vendorMstrUID}`}
              onClick={handleClick}
            >
              <ChevronIcon />
            </button>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="container mt-4 text-lg font-normal flex flex-col">
        <div className="flex justify-between">
          <div className="text-left w-[150px] text-[#777777]">GST No.:</div>
          <div className="text-left flex-1">{gst}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-left w-[150px] text-[#777777]">Contact No.:</div>
          <div className="text-left flex-1">{contact}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-left w-[150px] text-[#777777]">Address:</div>
          <div className="text-left flex-1">{address}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-left w-[150px] text-[#777777]">Vendor Type:</div>
          <div className="text-left flex-1">{vender}</div>
        </div>
      </div>
    </div>
  );
};
export default Networkcard;
