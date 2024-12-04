"use client"
import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import Qrcard from '@/components/Qrcard';
import CommonApi from '@/api/CommonApi';
import Search from "../../../../public/assests/icons/search.svg";
import { setQuotation } from '@/store/quotationSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const OpenQuotation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [vendorDetails,setVendorDetails]=useState({});
  const [loading,setLoading]=useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
    const [data,setData]=useState([
    ]);
    const handleCardClick=async (uuid,vendorMasterUUId)=>{
        // console.log("forced into error code :143")
        setLoading(true);
        await dispatch(setQuotation({
          vendorMasterUUId,
          qrUuid:uuid
        }));
        router.push(`/quotationrequest/qrrecieved`);
    }
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
        fetchData();
      }
    }, [vendorDetails]); 
    const fetchData = async (reqData) => {
      try {
        setLoading(true);
        // console.log('req',reqDataStatus[reqData]);
        let skip=(Number(page)-1)*rowsPerPage;
        let data = await CommonApi.getData(
          `Quotation/vendor/requests`,
          {},
          {
            VendorMasterUUId : vendorDetails.vendorMasterUUId,
            Status: 2,
            Type:2,
            PageSize:rowsPerPage,
            PageNumber:page,
            Skip:skip,
            // searchString: '',
            // sortBy: ''
          }
        );
        if (!data.error) {
          setData(data.data.quotationDetails||[]);
          setTotalCount(data.data.totalCount);
          setRowsPerPage(data.data.pageSize)
        } else {
          setOpen(true)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., display error message to the user
      }finally{
        setLoading(false)
      }
    };

  return (
    <div className='table-container'>
        <div className="filter-group">
          <div className="form">
            {/* <Search className="fa fa-search"></Search>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            /> */}
            {/* &nbsp;&nbsp;
            <label className="dropdown-list" htmlFor="dropdown">
              Sort by
            </label>
            <select id="dropdown" className="dropdownSelect">
              <option value="" className="font-bold text-black">
                Choose
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select> */}
          </div>
        </div>
        <div className="quotationwraper grid grid-cols-12 gap-4 p-6">
          {data.map((row) => (
            <Qrcard
              key={row.quotationRequestUUId}
              mode={'send'}
              name={row.companyName}
              date={format(new Date(row.requestDate), "dd-MM-yyyy")}
              qritems={row.totalItems}
              status={row.status ? "Urgent" : ""}
              qrId={row.quotationRequestId}
              cardClick={handleCardClick}
              qrUUID={row.quotationRequestUUId}
              vMstrid={row.vendorMasterUUId}
            />
          ))}
          {data.length==0?
          <div className='col-span-12 flex align-center justify-center'>
            <h1 className='text-2xl font-medium'>No Open Quotation Found.</h1>
          </div>:""
        }
        </div>
    </div>
  )
}

export default OpenQuotation;