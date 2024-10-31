"use client"
import { useRouter } from "next/navigation";
import React from "react";
import  ChevronRight from "../../public/assests/icons/chevron-right.svg";

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
                  <ChevronRight/>
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
