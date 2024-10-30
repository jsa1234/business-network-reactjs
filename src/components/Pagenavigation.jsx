"use client"
import { useRouter } from "next/navigation";
import React from "react";

function Pagenavigation(props) {
    const router=useRouter();
    const handleClick=(url)=>{
        router.push(url);
    }
  return (
    <div className="page_nav">
      <h1>{props.pageName}</h1>

      {props.message != "" ? <h4>{props.message}</h4> : ""}

      {props.navList && props.navList.length > 0 ? (
        <li className="flex items-center">
          {props.navList.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="mx-2">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_4859)">
                      <path
                        d="M6 4.5L10 8.5L6 12.5"
                        stroke="#4A4A4A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_4859">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              )}{" "}
              {/* Show '>' separator */}
              <p onClick={() => handleClick(props.urlList[index])}>{item}</p>
            </React.Fragment>
          ))}
        </li>
      ) : (
        ""
      )}
    </div>
  );
}

export default Pagenavigation;
