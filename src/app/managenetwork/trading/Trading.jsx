"use client";
import Buttons from "@/components/Buttons/Buttons";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import Businessname from"../../../../public/assests/icons/businessname.svg"
import Address from"../../../../public/assests/icons/address.svg"
import Contact from"../../../../public/assests/icons/contact.svg"
import Contactperson from"../../../../public/assests/icons/contactperson.svg"
import Email from"../../../../public/assests/icons/email.svg"
function Trading(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("approval");
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 1;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  console.log(props);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const renderTableData = () => {
    const theadContent =
      props.activeTab === "request" ? (
        <thead>
          <tr></tr>
        </thead>
      ) : (
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Qty</th>
            <th>Total Qty</th>
            <th>Remaining Qty</th>
            <th>Original Price</th>
            <th>Offer Price</th>
            <th>Action</th>
          </tr>
        </thead>
      );

    const tableBodyContent =
      props.activeTab === "approval" ? (
        <tbody className="text-left">
          <tr>
            <td>Onion</td>
            <td>
              <Typography variant="body2" sx={{ color: "orange" }}>
                {`${Math.round(progress)}%`}
              </Typography>

              <Box sx={{ width: "100%", height: "50%" }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: "10px",
                    width: "100px",
                    borderRadius: "10px",
                    backgroundColor: "#DEDFE3",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "orange",
                    },
                  }}
                />
              </Box>
            </td>

            <td>1000</td>
            <td>300</td>
            <td>
              <div className="trading-box">120</div>
            </td>
            <td>
              <div className="trading-box">120</div>
            </td>
            <td>
              <Buttons />
            </td>
          </tr>
        </tbody>
      ) : (
        <div className="flex flex-col ml-[4rem]  mr-[4rem]">
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
             <Businessname/>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold">
              Business Name
            </h2>
            <h3 className="text-md  w-[400px] text-lg">
              Earthly Delights Trading
            </h3>
          </div>

          <div className="flex flex-row  border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
             <Address/>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
              Address:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">123 457 2587</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
            <Contact/>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
              Contact No:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">123 457 2587</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
              
              <Contactperson/>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
              Contact Person:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">Zubin basher</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
             <Email/>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
            Email ID:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">supplier@mail.com</h3>
          </div>
        </div>
      );

    return (
      <table className="table w-full rounded-tr-lg">
        {theadContent}
        {tableBodyContent}
      </table>
    );
  };
  return (
    <>
      <div className="w-full table-container2">
        <div className="filter-group">
          <div className="form">
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search Product Name..."
            />
          </div>

          <div>
            <label className="dropdown-list">Sort by</label>
            <select
              id="dropdown"
              className="dropdownSelect"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="" className="font-bold text-black">
                Choose
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            {selectedOption && <p>You selected: {selectedOption}</p>}
          </div>
        </div>
        {renderTableData()}
      </div>
    </>
  );
}
export default Trading;
