"use client";
import { useState } from "react";

const Buttons = ({name}) => {
    const [showText, setShowText] = useState(true);

    const handleClick = () => {
      setShowText(!showText);
    };
  return (
    <>
       <button className={`check__btn ${!showText ? "clicked" : ""}`} onClick={handleClick}>
      <div className="iconTextContainer">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          className={showText ? "icon" : "icon clicked"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.875 10.5703L4.5 13.3203L5.26802 12.5157M12.375 5.07031L7.82775 9.83409"
           
            stroke="currentColor"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.625 10.5703L8.25 13.3203L16.125 5.07031"
            stroke="currentColor"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {showText && <span className="buttonText">{name}</span>}
      </div>
    </button>
    </>
  );
};
export default Buttons;
