"use client";
import { useEffect, useState } from "react";
import Prcard from "@/components/Prcard";
import Search from "../../../public/assests/icons/search.svg";
import Datepicker from "@/components/Datepicker";
import { useRouter } from "next/navigation";
import CommonApi from "@/api/CommonApi";
import { useDispatch } from "react-redux";
import { setPurchase } from "@/store/purchaseSlice";

const PurchaseRequest = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [purchaseRequest, setPurchaseRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy,setSortBy]=useState('')
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [vendorDetails,setVendorDetails]=useState({});
  const dateProps = {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
  };

  // Error handling function
  const handleError = (error) => {
    console.error("Error fetching purchase requests:", error);
  };
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);
  // useEffect(() => {
  //   // This effect will run when vendorDetails is updated
  //   if (vendorDetails && vendorDetails.vendorMasterUUId) {

  //   fetchData();
  //   }
  // }, [vendorDetails]); 

  useEffect(() => {
    
    const fetchPurchaseRequests = async () => {
      try {
        const data = await CommonApi.getData(
          "Purchase/vender/requests",
          {},
          {
            VendorMasterUUId : vendorDetails.vendorMasterUUId,
            searchString: searchTerm,
            expectedDeliveryFromDate: selectedStartDate,
            expectedDeliveryToDate: selectedEndDate,
            sortBy: sortBy, // Assuming sortBy is a state or prop
            PageSize: 5, // need to be dynamic
            PageNumber: 1 // need to be dynamic
          }
        );
        setPurchaseRequest(data.data.purchaseRequests || []);
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    };
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
    fetchPurchaseRequests(); // Call the async function here without passing data
    }
  }, [vendorDetails,searchTerm, selectedStartDate, selectedEndDate, sortBy]); // Dependencies that will trigger the effect
  

  const handleClick = async(row) => {
    await dispatch(setPurchase({
      vendorMasterUUId:vendorDetails.vendorMasterUUId,
      ...row
    }));
    router.push("/purchaserequest/purchasedetails");
  };

  const filteredRequests = purchaseRequest.filter((request) => {
    return (
      request.companyName &&
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="filter-group">
        <div className="form">
          <Search className="fa fa-search" />
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          <label className="dropdown-list">Sort by</label>
          <select id="dropdown" className="dropdownSelect" onChange={(e)=>setSortBy(e.target.value)}>
            <option value="" className="font-bold text-black">
              Choose
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <Datepicker {...dateProps} />
        </div>
      </div>

      {/* Dynamic Cards Rendering */}
      <div className="quotationwraper grid grid-cols-12 gap-4 p-5 mt-0">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((purchaseRequests, index) => (
            <Prcard               
              key={index}
              name={purchaseRequests.companyName}
              deliverydate={purchaseRequests.expectedDeliveryDate}
              prdate={purchaseRequests.purchaseRequestedDate}
             /*  status={request.status} */
              cardClick={()=>handleClick(purchaseRequests)}
            />
          ))
        ) : (
          <p className="col-span-12 text-center">No Purchase Requests Found</p>
        )}
      </div>
      
    </>
  );
};

export default PurchaseRequest;
