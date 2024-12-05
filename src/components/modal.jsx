"use client";
import { useState } from "react";
import CommonApi from "@/api/CommonApi";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const NewQuery = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }
  
    try {
      const requestBody = {
        vendorMasterUUId: "B197579F-DCC5-4B75-82FD-2FE5ECFC9C43",
        domainUUId: "032F564F-1A9C-4657-BD20-47923E0A5EA9",
        topic: title,
        description: description,
      };
  
      console.log("Request Body:", requestBody);
  
      const response = await CommonApi.postData("Forum/vendor/new-topic", {}, requestBody);
  
      console.log("Response:", response);
  
      if (response.success) {
        alert("Query created successfully!");
        onClose();
      } else {
        console.error("Failed to create query:", response.message);
        alert(response.message || "Failed to create query. Please try again.");
      }
    } catch (error) {
      if (error.response) {
      
        console.error("Server Error:", error.response.data);
        alert(error.response.data.message || "Server error occurred. Please try again.");
      } else {
       
        console.error("Error:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-[90%] md:w-[600px]">
          <h2 className="text-4xl font-semibold mb-4">Create New Query</h2>
          <form>
            <div className="mb-4">
              <input
                id="title"
                type="text"
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                id="description"
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xl"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-start gap-3">
              <button
                type="button"
                className="px-10 py-4 bg-white border text-xl border-gray-300 text-orange-500 rounded-lg hover:bg-gray-100 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button" 
                className="px-4 py-4 bg-orange-500 text-white rounded-lg text-xl"
                onClick={NewQuery} 
              >
                Replay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
