import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import ReplayIcon from "../../../public/assests/icons/replay.svg";
import Delete from "../../../public/assests/icons/delete.svg";
import CommonApi from "@/api/CommonApi";

const Forum = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All Queries");
  const [queries, setQueries] = useState([]);
  const [myQueries, setMyQueries] = useState([]);
  const [vendorDetails, setVendorDetails] = useState({});
  const [replyForm, setReplyForm] = useState(false);
  const [selectedForumId, setSelectedForumId] = useState(null); // State to track selected forum ID
  const [comment, setComment] = useState(""); // State for textarea input

  useEffect(() => {
    const storedVendorDetails = sessionStorage.getItem("vendorDetails");
    if (storedVendorDetails) {
      setVendorDetails(JSON.parse(storedVendorDetails));
    }
  }, []);

  useEffect(() => {
    if (vendorDetails && vendorDetails.vendorMasterUUId) {
      fetchMyQueries();
      fetchQueries();
    }
  }, [vendorDetails]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await CommonApi.getData(
        `Forum/vendor/get-all-forum-topics-by-domain/${vendorDetails.vendorMasterUUId}`,
        {},
        { VendorMasterUUId: vendorDetails.vendorMasterUUId }
      );
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyQueries = async () => {
    try {
      setLoading(true);
      const response = await CommonApi.getData(
        `Forum/vendor/get-all-forum-topics-by-UUId/${vendorDetails.vendorMasterUUId}`,
        {},
        { VendorMasterUUId: vendorDetails.vendorMasterUUId }
      );
      setMyQueries(response.data);
    } catch (error) {
      console.error("Error fetching my queries:", error);
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
        // Refresh the queries or perform additional actions if needed
      } else {
        console.error("Failed to add replay:", response);
      }
    } catch (error) {
      console.error("Error adding replay:", error);
    }
  };

  const handleReplayClick = (forumTopicUUId) => {
    setReplyForm(!replyForm);
    setSelectedForumId(forumTopicUUId);
  };

  const handleReplaySubmit = async (forumTopicUUId) => {
    await Replay(forumTopicUUId, comment);
    setComment("");
    setSelectedForumId(null);
  };

  //length//

  return (
    <div>
      {loading && <Loader />}
      <div className="flex mt-6 background">
        {/* Tab buttons */}
        <button
          className={`tab ${activeTab === "All Queries" ? "active" : ""}`}
          onClick={() => setActiveTab("All Queries")}
        >
          All Queries
        </button>
        <button
          className={`tab ${activeTab === "My Queries" ? "active" : ""}`}
          onClick={() => setActiveTab("My Queries")}
        >
          My Queries
        </button>
      </div>

      {/* Display queries */}
      <div className="table-container2">
        {activeTab === "All Queries" &&
          queries.map((query) => (
            <div key={query.forumTopicUUId}>
              <Message
                heading={query.topic}
                description={query.description}
                name={query.companyName}
                date={new Date(query.createdAt).toLocaleString()}
              />
              <div className="bg-[#F5F5F5] p-4 flex justify-between mb-4 ml-4 mr-4">
                <a href={`forum/forumdetails?forumId=${query.forumTopicUUId}`}>
                  <button className="flex items-center ml-2 text-xl gap-x-2 border p-2 bg-[white]">
                    <ReplayIcon /> {query.totalComments} Replays
                  </button>
                </a>
                <button
                  className="flex items-center justify-end gap-2 pl-8 pr-8 bg-[#5C5956] text-[white] rounded-[5px]"
                  onClick={() => handleReplayClick(query.forumTopicUUId)}
                >
                  Reply Now
                </button>
              </div>
              {replyForm && selectedForumId === query.forumTopicUUId && (
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
                    onClick={() => handleReplaySubmit(query.forumTopicUUId)}
                    className="self-start px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-700 mt-8"
                  >
                    Reply Now
                  </button>
                </div>
              )}
            </div>
          ))}

        {activeTab === "My Queries" &&
          myQueries.map((myQuery) => (
            <div key={myQuery.forumTopicUUId}>
              <Message
                heading={myQuery.topic}
                description={myQuery.description}
                name={myQuery.companyName}
                date={new Date(myQuery.createdAt).toLocaleString()}
                replayDelete={
                  <button className="flex items-center gap-2 text-gray-500">
                    <Delete /> Delete
                  </button>
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forum;
