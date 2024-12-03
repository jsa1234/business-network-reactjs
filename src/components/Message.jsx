import React from 'react'
import Delete from "../../public/assests/icons/delete.svg"
import Replay from "../../public/assests/icons/replay.svg"
const Message = () => {
    return (
        <>
         <div className="">
              <div className="flex items-center">
                <h2 className="text-3xl m-4 font-bold flex-1">
                  Looking for High-Quality Organic Apples
                </h2>
                <button className="flex items-center gap-2 text-3xl  text-gray-500 ">
                  <Delete /> Delete
                </button>
              </div>

              <p className="m-4 text-xl ">
                I am in search of fresh, organic apples for bulk purchase.
                Preferred quantity is 500 kg per month, and I'm looking for
                suppliers who can provide consistent quality at a competitive
                price.
              </p>
              <p className="m-4 text-2xl  font-bold pt-4 ">GreenLeaf Distributors<span className="ml-2 font-normal text-gray-500">23 Nov 2025, 10:30 AM</span></p>
              <button className='flex ml-2 text-xl gap-x-2' >
                <Replay/> 12 Replays

              </button>

            </div>
        </>
    );
};

export default Message;