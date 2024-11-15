"use client";
import { useEffect, useState } from "react";
import Prcard from "@/components/Prcard";
import Search from "../../../public/assests/icons/search.svg";
import Datepicker from "@/components/Datepicker";
import { useRouter } from "next/navigation";
import CommonApi from "@/api/CommonApi";

const PurchaseRequest = () => {
  const router = useRouter();
  const [purchaseRequest, setPurchaseRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy,setSortBy]=useState(0)
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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
    const fetchPurchaseRequests = async () => {
      try {
        const response = await CommonApi.postData(
          "Purchase/vender/requests",
          {},
          {
            vendorUUId: "21C7586F-9F29-457B-8E3D-4C75213183DF",
            searchString: searchTerm,
            expectedDeliveryFromDate: selectedStartDate,
            expectedDeliveryToDate: selectedEndDate,
            sortBy: 0,
          }
        );
        console.log("API Data:", response);
        setPurchaseRequest(response || []);
      } catch (error) {
        handleError(error);
      }
    };

    fetchPurchaseRequests();
  }, [searchTerm,selectedStartDate,selectedEndDate,sortBy]);

  const handleClick = () => {
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
            placeholder="Search Product Name..."
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
          filteredRequests.map((request, index) => (
            <Prcard
              key={index}
              name={request.productName}
              deliverydate={request.expectedDeliveryFromDate}
              prdate={request.prdate}
              status={request.status}
              cardClick={handleClick}
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
