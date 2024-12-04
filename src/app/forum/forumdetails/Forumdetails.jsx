"use client";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import React, { useEffect, useState } from "react";
import CommonApi from "@/api/CommonApi";

import { useSearchParams } from "next/navigation";

const Forumdetails = () => {
  const searchParams = useSearchParams();
  const forumId = searchParams.get("forumId");

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(forumId);
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));
    }
  }, []);

  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      fetchQueries();
    }
  }, [vendorDetails]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await CommonApi.getData(
        `Forum/vendor/get-all-comments-by-topic/${forumId}`,
        {},
        {}
      );
      setQueries(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching forum details:", error);
    } finally {
      setLoading(false);
    }
  };

  const Replay = async (forumTopicUUId, comment) => {
    try {
      if (!comment.trim()) {
        console.error("Comment is required.");
        return;
      }

      const response = await CommonApi.postData(
        "Forum/vendor/replay",
        {},
        {
          forumTopicUUId: forumTopicUUId,
          vendorMasterUUId: vendorDetails.vendorMasterUUId,
          comment: comment,
        }
      );

      if (response?.status === 200) {
        console.log("Replay added successfully:", response.data);
      } else {
        console.error("Failed to add replay:", response);
      }
    } catch (error) {
      console.error("Error adding replay:", error);
    }
  };

  const handleReplaySubmit = (forumTopicUUId) => {
    Replay(forumTopicUUId, comment);
    setComment(""); // Clear the input field after successful submission
  };

  return (
    <div className="table-container">
      {loading && <Loader />}
      <div  className="mb-8">
          <Message
            heading="Topic"
            description="Description"
            name="Company Name"
            date="Created at"
          />
          <div className="border-b-2 m-8">
            <button className="ml-4 text-orange-500 mt-8 mb-4">
              {queries.length} Replys
            </button>
          </div>
        </div>

      {/* Reply Section */}
      <div className="m-8">
        <textarea
          id="message"
          name="message"
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 bg-[#F9F9FC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your answer here!..."
        ></textarea>
        <button
          onClick={() => handleReplaySubmit(queries[0]?.forumTopicUUId)} // Pass forumTopicUUId dynamically
          className="self-start px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-700 mt-8"
        >
          Reply Now
        </button>
      </div>

      {/* Optional Section to Display Example Reply */}
      {queries.map((comm) => {
        return (
          
          <div key={comm.forumCommentsUUId} className="m-8 bg-[#f5f5f5] p-8 text-[737373] rounded-lg">
            <p className="text-[#313131] text-2xl mb-4">
              {comm.createdAt}
            </p>
            <p className="text-[12px]">
              {comm.comment}
            </p>
            <p className="text-2xl mt-4">{comm.commentedBy}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forumdetails;
