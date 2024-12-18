"use client";
import React, { useEffect, useState } from "react";
import DocIcon from "../../../public/assests/icons/google-doc.svg";
import NavIcon from "../../../public/assests/icons/navigation.svg";
import HoldIcon from "../../../public/assests/icons/hold.svg";
import CancelIcon from "../../../public/assests/icons/cancel-icon.svg";
import TablePaginationActions from "@/components/TablePagination";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Qrcard from "@/components/Qrcard";
import Search from "../../../public/assests/icons/search.svg";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CommonApi from "@/api/CommonApi";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { setQuotation } from "@/store/quotationSlice";  // Adjust the path as needed

const QuotationRequest = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [vendorDetails,setVendorDetails]=useState({});

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // Load vendorDetails from sessionStorage when the component mounts
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));  // Parse if it's a JSON string
    }
  }, []);

  let routingList = {
    request: "/quotationrequest/qrrecieved",
    send: "/quotationrequest/quotationsend",
    hold: "/quotationrequest/qrhold",
    reject: "/quotationrequest/quotationrejected",
  };
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("request");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy,setSortBy]=useState(0)
  const [reqCount, setreqCount] = useState({
    requestCount: 0,
    sendCount: 0,
    holdCount: 0,
    rejectCount: 0,
  });
  const [loading,setLoading]=React.useState(false);
  const reqDataStatus = {
    request: 2,
    send: 3,
    hold: 4,
    reject: 5,
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  // useEffect(() => {
  //   fetchData(activeTab);
  //   fetchReqCount();
  // }, [activeTab]);
  useEffect(() => {
    // This effect will run when vendorDetails is updated
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      fetchData(activeTab);
      fetchReqCount();
    }
  }, [vendorDetails,activeTab,searchTerm]); 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const fetchReqCount = async () => {
    let data = await CommonApi.getData(
      `Quotation/vendor/${vendorDetails.vendorMasterUUId}/quotation-count`,
      {},
      {}
    );
    setreqCount(data.data);
  };
  const fetchData = async (reqData) => {
    try {
      setLoading(true);
      console.log('req',reqDataStatus[reqData]);
      let skip=(Number(page)-1)*rowsPerPage;
      let data = await CommonApi.getData(
        `Quotation/vendor/requests`,
        {},
        {
          VendorMasterUUId : vendorDetails.vendorMasterUUId,
          Status: reqDataStatus[reqData],
          Type:1,
          PageSize:rowsPerPage,
          PageNumber:page,
          Skip:skip,
          CompanyName: searchTerm,
          sortBy: sortBy
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
  
  const handleCardClick = async (uuid,vendorMasterUUId) => {
    setLoading(true);
    await dispatch(setQuotation({
      vendorMasterUUId,
      qrUuid:uuid
    }));
    router.push(`${routingList[activeTab]}`);
  };
  return (
    <div>
      {
      loading?<Loader/>:''
    }    
      <div className="flex mt-6 background">
        <button
          className={`tab flex items-center justify-center gap-2 p-2 rounded-md relative ${
            activeTab === "request"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("request")}
        >
          <DocIcon />
          <span className="relative">  
            QR Recived{" "}
            <span className="badge-count">{reqCount.requestCount}</span>
          </span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2 relative ${
            activeTab === "send"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("send")}
        >
          <NavIcon />
          <span className="relative">
            QR Send
            {/* Badge Count */}
            <span className="badge-count">{reqCount.sendCount}</span>
          </span>
        </button>

        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2 relative  ${
            activeTab === "hold"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("hold")}
        >
          <HoldIcon />
          <span className="relative">
            QR Hold <span className="badge-count">{reqCount.holdCount}</span>
          </span>
        </button>
        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2 relative  ${
            activeTab === "reject"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("reject")}
        >
          <CancelIcon />
          <span className="relative">
            QR Reject{" "}
            <span className="badge-count">{reqCount.rejectCount}</span>
          </span>
        </button>
      </div>
      <div className="filter-group">
        <div className="form">
          <Search className="fa fa-search"></Search>
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search Company Name..."
            onChange={(e)=>setSearchTerm(e.target.value)}
            
          />
          {/* <label className="dropdown-list" htmlFor="dropdown">
            Sort by
          </label> */}
          {/* <select id="dropdown" className="dropdownSelect">
            <option value="" className="font-bold text-black">
              Choose
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select> */}
        </div>
      </div>
      <div>
        <div className="quotationwraper grid grid-cols-12 gap-4 p-6">
          {data.map((row) => (
            <Qrcard
              key={row.quotationRequestUUId}
              mode={activeTab}
              name={row.companyName}
              date={format(new Date(row.requestDate), "dd-MM-yyyy")}
              qritems={row.totalItems}
              status={row.status ? "Urgent" : ""}
              qrId={row.quotationRequestId}
              cardClick={handleCardClick}
              qrUUID={row.quotationRequestUUId}
              vMstrid={row.vendorMasterUUId}
            />
          ))
        }
          {
            data.length==0?<h1 className="col-span-12 text-center text-2xl font-medium">No Data Available</h1>:""
          }
        </div>
        <TableContainer>
          <Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{
            width: "100%",
            // Increase font size here
            fontSize: "1.2rem",
          }}
        >
          Something Went Wrong. Try Again Later
        </Alert>
      </Snackbar>
    </div>
  );
};

export default QuotationRequest;
