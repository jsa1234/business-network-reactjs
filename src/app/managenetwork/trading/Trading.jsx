"use client";
import Buttons from "@/components/Buttons/Buttons";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 9H11M8 13H11"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 22H22"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 2C16.8706 2 21 6.03298 21 10.9258C21 15.8965 16.8033 19.3847 12.927 21.7567C12.6445 21.9162 12.325 22 12 22C11.675 22 11.3555 21.9162 11.073 21.7567C7.2039 19.3616 3 15.9137 3 10.9258C3 6.03298 7.12944 2 12 2Z"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                />
              </svg>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
              Address:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">123 457 2587</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.15826 5.71223L8.7556 4.80625C8.49232 4.21388 8.36068 3.91768 8.16381 3.69101C7.91708 3.40694 7.59547 3.19794 7.23568 3.08785C6.94859 3 6.62446 3 5.97621 3C5.02791 3 4.55376 3 4.15573 3.18229C3.68687 3.39702 3.26344 3.86328 3.09473 4.3506C2.95151 4.76429 2.99254 5.18943 3.07458 6.0397C3.94791 15.0902 8.90982 20.0521 17.9603 20.9254C18.8106 21.0075 19.2358 21.0485 19.6494 20.9053C20.1368 20.7366 20.603 20.3131 20.8178 19.8443C21 19.4462 21 18.9721 21 18.0238C21 17.3755 21 17.0514 20.9122 16.7643C20.8021 16.4045 20.5931 16.0829 20.309 15.8362C20.0824 15.6393 19.7862 15.5077 19.1938 15.2444L18.2878 14.8417C17.6463 14.5566 17.3255 14.4141 16.9996 14.3831C16.6876 14.3534 16.3731 14.3972 16.0811 14.5109C15.776 14.6297 15.5064 14.8544 14.967 15.3038C14.4302 15.7512 14.1618 15.9749 13.8338 16.0947C13.543 16.2009 13.1586 16.2403 12.8524 16.1951C12.5069 16.1442 12.2424 16.0029 11.7133 15.7201C10.0673 14.8405 9.15953 13.9328 8.27987 12.2867C7.99714 11.7577 7.85578 11.4931 7.80487 11.1477C7.75974 10.8414 7.79908 10.457 7.9053 10.1663C8.02512 9.83828 8.24881 9.56986 8.69619 9.033C9.14562 8.49368 9.37034 8.22402 9.48915 7.91891C9.60285 7.62694 9.64662 7.3124 9.61695 7.00048C9.58594 6.67452 9.44338 6.35376 9.15826 5.71223Z"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
              Contact No:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">123 457 2587</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <h2 className="text-lg  w-[100px] text-lg font-semibold pr-4">
              Contact Person:{" "}
            </h2>
            <h3 className="text-md  w-[400px] text-lg">Zubin basher</h3>
          </div>
          <div className="flex flex-row border-b border-gray-300 p-4 ">
            <h1 className="text-xl w-[100px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                  stroke="#BD6112"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
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
