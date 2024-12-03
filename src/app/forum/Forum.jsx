"use client";
import React, { useState } from "react";
import Loader from "@/components/Loader";

import Message from "@/components/Message";

const Forum = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All Queries");

  return (
    <div>
      {loading ? <Loader /> : ""}
      <div className="flex mt-6 background">
        <button
          className={`tab flex items-center justify-center gap-2 p-2 rounded-md relative ${
            activeTab === "All Queries"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("All Queries")} // Added onClick handler for this tab
        >
          <span className="relative">All Queries</span>
        </button>

        <button
          className={`tab flex items-center justify-center p-2 rounded-md gap-2 relative ${
            activeTab === "My Queries"
              ? "bg-white text-orange-500 border-b-2 border-b-orange-500 active"
              : ""
          }`}
          onClick={() => setActiveTab("My Queries")}
        >
          <span className="relative">My Queries</span>
        </button>
      </div>

      {/* Content based on the active tab */}

      <div className="forumwraper ">
        <div className="mt-6">
          {activeTab === "All Queries" && (
            <Message/>
           
          )}
          {activeTab === "My Queries" && <p>Showing my queries...</p>}
        </div>
      </div>
    </div>
  );
};

export default Forum;
