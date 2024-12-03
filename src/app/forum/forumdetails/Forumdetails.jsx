"use client";

import Message from "@/components/Message";

const Forumdetails = () => {
  return (
    <div className="table-container">
      <Message
        heading=" Looking for High-Quality Organic Apples"
        description=" I am in search of fresh, organic apples for bulk purchase. Preferred
          quantity is 500 kg per month, and I'm looking for suppliers who can
          provide consistent quality at a competitive price."
        name=" GreenLeaf Distributors"
        date="  23 Nov 2025, 10:30 AM"
        replayMessages="Replay 12"
      />
      <div className="  border-b-2 m-8">
        <button className="ml-4 text-orange-500   mt-8 mb-4">
          12 Replays
        </button>
      </div>
      <div className="m-8">
        <textarea
          id="message"
          name="message"
          rows="5"
          className="w-full p-3 bg-[#F9F9FC] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your answer here!..."
        ></textarea>
        <button className="self-start px-6 py-2 bg-orange-500 text-white rounded-lg  hover:bg-blue-700 mt-8">
          Replay Now
        </button>
      </div>
      <div className="m-8 bg-[#f5f5f5] p-8 text-[737373] rounded-lg">
        <p className="text-[#313131] text-2xl mb-4">23 Nov 2025, 11:15 AM</p>
        <p className="text-[12px]">Hi! We are Orchard Fresh Suppliers, specializing in organic apples. We can provide 500 kg per month with consistent quality. Let us know if you'd like a quote or need more details. Phone: 9895456772</p>
        <p className="text-2xl mt-4">GreenLeaf Distributors</p>
      </div>
    </div>
  );
};
export default Forumdetails;
