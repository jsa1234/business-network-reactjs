import React, { useState, useEffect } from "react";
import Cross from "../../public/assests/icons/cross.svg";
import CommonApi from "@/api/CommonApi";
const Rejectpopup = ({ handleModalClose }) => {
  const [reason, setReason] = useState([]); 
  const [selectedReason, setselectedReason] = useState(''); 
  const [comments, setComments] = useState(""); 

  async function getReasons() {
    try {
      const res = await CommonApi.getData(
        "ManageNetwork/reject/1/reason",
        {},
        {}
      );
      
      setReason((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.error("Error fetching network data:", error);
      getApprovalPending();
    }
  }

  useEffect(() => {
    getReasons();
  }, []);

  // Handle reason selection
  const handleReasonChange = (e) => {
    setselectedReason(e.target.value);
  };

  // Handle comments input
  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };


  const handleReject = (e) => {
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 rounded-lg w-[55rem]  relative">
        <button
          onClick={handleModalClose}
          className="absolute top-2 right-4 text-4xl font-bold text-gray-500"
        >
          ×
        </button>
        <h2 className="text-4xl font-semibold text-center">
          Business Network Reject
        </h2>
        <p className="text-center mt-2 text-gray-600 text-2xl">
          Enter the reason for rejection.
        </p>

        {/* Reason Dropdown */}
        <label
          htmlFor="reason"
          className="block  font-medium text-gray-700 mt-6 text-xl"
        >
          Reason
        </label>
        <select
          id="reason"
          value={selectedReason}
          onChange={handleReasonChange}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        >
            <option value="">Select a Reason</option>
          {
            reason.length&&reason.map((x,i)=>{
                return <option key={i} value={x.reasonId}>{x.reason}</option>
            })
          }
        </select>

        {/* Comments Textarea */}
        <label
          htmlFor="comments"
          className="block text-xl font-medium text-gray-700 mt-4"
        >
          Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={handleCommentsChange}
          placeholder="Enter here"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg h-24"
        ></textarea>

        {/* Reject Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleReject}
            className="border border-gray-300 rounded-[15px] px-[30px] py-[10px] bg-[#fef6f6]"
          >
            <div className="flex items-center space-x-2">
              <Cross />
              <span className="buttonText">Reject</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rejectpopup;
