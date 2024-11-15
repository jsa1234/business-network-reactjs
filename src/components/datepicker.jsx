import React, { useState, useEffect, useRef } from "react";

export default function Datepicker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const datepickerRef = useRef(null);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayString = day.toLocaleDateString("en-US");
      let className =
        "flex h-[36px] w-[36px] items-center justify-center rounded-full hover:bg-gray-200 mb-2";

      if (selectedStartDate && dayString === selectedStartDate) {
        className += " bg-[#FD9C49] text-white rounded-r-none";
      }
      if (selectedEndDate && dayString === selectedEndDate) {
        className += " bg-[#FD9C49] text-white rounded-l-none";
      }
      if (
        selectedStartDate &&
        selectedEndDate &&
        new Date(day) > new Date(selectedStartDate) &&
        new Date(day) < new Date(selectedEndDate)
      ) {
        className += " bg-gray-300 rounded-none";
      }

      daysArray.push(
        <div
          key={i}
          className={className}
          data-date={dayString}
          onClick={() => handleDayClick(dayString)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  const handleDayClick = (selectedDay) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDay);
      setSelectedEndDate(null);
    } else {
      if (new Date(selectedDay) < new Date(selectedStartDate)) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedDay);
      } else {
        setSelectedEndDate(selectedDay);
      }
    }
  };

  const updateInput = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${selectedStartDate} - ${selectedEndDate}`;
    } else if (selectedStartDate) {
      return selectedStartDate;
    } else {
      return "";
    }
  };

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  const handleApply = () => {
    console.log("Applied:", selectedStartDate, selectedEndDate);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setIsOpen(false);
  };

  const handleDocumentClick = (e) => {
    if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleMonthChange = (direction) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + direction))
    );
  };

  const handleYearChange = (direction) => {
    setCurrentDate(
      new Date(currentDate.setFullYear(currentDate.getFullYear() + direction))
    );
  };

  return (
    <div className="relative mx-auto max-w-fit text-black" ref={datepickerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Pick a date"
          className="form-control form-input mx-6 cursor-pointer"
          value={updateInput()}
          onClick={toggleDatepicker}
          readOnly
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-[280px] rounded-lg border border-stroke bg-white p-4 shadow-lg sm:p-6">
          <div className="flex items-center justify-between pb-2">
            <p className="text-base text-dark">
              {currentDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentDate.getFullYear()}
            </p>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleYearChange(-1)}
                className="flex items-center justify-center cursor-pointer rounded border border-stroke bg-gray-200 p-1 hover:bg-[#FD9C49] hover:text-white"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => handleMonthChange(-1)}
                className="flex items-center justify-center cursor-pointer rounded border border-stroke bg-gray-200 p-1 hover:bg-[#FD9C49] hover:text-white"
              >
                &lt;
              </button>
              <button
                onClick={() => handleMonthChange(1)}
                className="flex items-center justify-center cursor-pointer rounded border border-stroke bg-gray-200 p-1 hover:bg-[#FD9C49] hover:text-white"
              >
                &gt;
              </button>
              <button
                onClick={() => handleYearChange(1)}
                className="flex items-center justify-center cursor-pointer rounded border border-stroke bg-gray-200 p-1 hover:bg-[#FD9C49] hover:text-white"
              >
                &gt;&gt;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 pb-2 pt-4 font-normal text-gray-500">
            {["S", "M", "T", "W", "T", "F", "F"].map((day) => (
              <div key={day} className="flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          <div
            id="days-container"
            className="grid grid-cols-7 font-medium text-dark"
          >
            {renderCalendar()}
          </div>

          <div className="flex items-center justify-center space-x-3 pt-4">
            <button
              onClick={handleApply}
              className="rounded bg-[#FD9C49] text-white py-2 px-4"
            >
              Apply
            </button>
            <button
              onClick={handleCancel}
              className=" py-2 px-4 rounded bg-gray-200 text-dark"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
