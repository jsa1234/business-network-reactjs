import React from "react";
import Delete from "../../public/assests/icons/delete.svg";
import Replay from "../../public/assests/icons/replay.svg";
const Message = ({heading,description,name,date,replayDelete}) => {
  return (
    <>
      <div className=" ">
        <div className="flex items-center">
          <h2 className="text-3xl mt-8  ml-8 font-bold flex-1">
           
            {heading}
            
          </h2>
          <h2 className="flex items-center gap-2 text-2xl  text-gray-500 mr-8 ">
            {replayDelete}
          
            {/* <Delete /> Delete */}
          </h2>
        </div>

        <p className="m-8 text-xl ">
         
          {description}
        </p>
        <p className="m-8 text-2xl  font-bold pt-4 ">
        
          {name}
          <span className="ml-2 font-normal text-gray-500">
            {date}
          
          </span>
        </p>
       
      </div>
    </>
  );
};

export default Message;
