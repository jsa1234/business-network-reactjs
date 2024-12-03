"use client";
import React, { useState } from "react";
import Loader from "@/components/Loader";

import Message from "@/components/Message";
import Replay from "../../../public/assests/icons/replay.svg";
import Delete from "../../../public/assests/icons/delete.svg";
const Forum = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All Queries");

  return (
    <div >
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

      <div className=" table-container2">
        {activeTab === "All Queries" && (
          <>
            <Message
              heading="Looking for High-Quality Organic Apples"
              description="I am in search of fresh, organic apples for bulk purchase. Preferred quantity is 500 kg per month, and I'm looking for suppliers who can provide consistent quality at a competitive price."
              name="GreenLeaf Distributors"
              date="23 Nov 2025, 10:30 AM"
            />
            <div className="bg-[#f5f5f5] p-4 flex justify-between mb-4 ml-4 mr-4">
              <a href='forum/forumdetails'>
              <button className="flex items-center ml-2 text-xl gap-x-2 border p-2 bg-[white]">
                <Replay /> 12 Replays
              </button>
              </a>
              <button className="flex items-center justify-end gap-2 pl-8 pr-8 bg-[#5C5956] text-[white] rounded-[5px]">
                Replay Now
              </button>
            </div>
          </>
        )}

        {activeTab === "My Queries" && (
          
          <Message
            heading=" Looking for High-Quality Organic Apples"
            description=" I am in search of fresh, organic apples for bulk purchase. Preferred
          quantity is 500 kg per month, and I'm looking for suppliers who can
          provide consistent quality at a competitive price."
            name=" GreenLeaf Distributors"
            date="  23 Nov 2025, 10:30 AM"
            replayDelete={
              <>
            <Delete /> Delete
            </>

            }
           
          />
        )}
      </div>
    </div>
  );
};

export default Forum;
