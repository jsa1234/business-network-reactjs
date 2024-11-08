import React, { useState, useEffect, useRef } from "react";

export default function DatePicker() {
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
        "flex h-[46px] w-[46px] items-center justify-center rounded-full hover:bg-gray-2 dark:hover:bg-dark mb-2";

      if (selectedStartDate && dayString === selectedStartDate) {
        className += " bg-primary text-white dark:text-white rounded-r-none";
      }
      if (selectedEndDate && dayString === selectedEndDate) {
        className += " bg-primary text-white dark:text-white rounded-l-none";
      }
      if (
        selectedStartDate &&
        selectedEndDate &&
        new Date(day) > new Date(selectedStartDate) &&
        new Date(day) < new Date(selectedEndDate)
      ) {
        className += " bg-dark-3 rounded-none";
      }

      daysArray.push(
        <div
          key={i}
          className={className}
          data-date={dayString}
          onClick={() => handleDayClick(dayString)}
        >
          {i}
        </div>,
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

  return (
    <section className="bg-white dark:bg-dark">
      <div className="container">
        <div className="mx-auto max-w-[380px]" ref={datepickerRef}>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Pick a date"
              className="h-12 w-[100px] appearance-none rounded-lg border border-stroke bg-white pl-12 pr-4 text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              value={updateInput()}
              onClick={toggleDatepicker}
              readOnly
            />
            <span
              onClick={toggleDatepicker}
              className="absolute inset-y-0 flex h-12 w-10 items-center justify-center text-dark-5"
            >
             
            </span>
          </div>

          {isOpen && (
            <div className="shadow-xs flex w-full flex-col rounded-lg border border-stroke  px-4 py-6 sm:px-6 sm:py-[30px] dark:border-dark-3 dark:bg-dark-2">
              <div className="flex items-center justify-between pb-2">
                <p className="text-base font-medium text-dark dark:text-white">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {currentDate.getFullYear()}
                </p>
                <div className="flex items-center justify-end space-x-[10px]">
                  <span
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.setMonth(currentDate.getMonth() - 1),
                        ),
                      )
                    }
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:bg-dark dark:text-white"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M10.825 14.325C10.675 14.325 10.525 14.275 10.425 14.15L4.77501 8.40002C4.55001 8.17502 4.55001 7.82502 4.77501 7.60002L10.425 1.85002C10.65 1.62502 11 1.62502 11.225 1.85002C11.45 2.07502 11.45 2.42502 11.225 2.65002L5.97501 8.00003L11.25 13.35C11.475 13.575 11.475 13.925 11.25 14.15C11.1 14.25 10.975 14.325 10.825 14.325Z" />
                    </svg>
                  </span>
                  <span
                    onClick={() =>
                      setCurrentDate(
                        new Date(
                          currentDate.setMonth(currentDate.getMonth() + 1),
                        ),
                      )
                    }
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:bg-dark dark:text-white"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M5.17501 14.325C5.02501 14.325 4.90001 14.275 4.77501 14.175C4.55001 13.95 4.55001 13.6 4.77501 13.375L10.025 8.00003L4.77501 2.65002C4.55001 2.42502 4.55001 2.07502 4.77501 1.85002C5.00001 1.62502 5.35001 1.62502 5.57501 1.85002L11.225 7.60002C11.45 7.82502 11.45 8.17502 11.225 8.40002L5.57501 14.15C5.47501 14.25 5.32501 14.325 5.17501 14.325Z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-7 pb-2 pt-4 text-sm font-normal capitalize text-body-color dark:text-dark-6">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="flex h-[38px] w-[38px] items-center justify-center"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div
                id="days-container"
                className="grid grid-cols-7 text-sm font-medium text-dark dark:text-white"
              >
                {renderCalendar()}
              </div>

              <div className="flex items-center justify-center space-x-3 pt-4 sm:space-x-4">
                <button className="h-[37px] rounded border border-stroke bg-transparent px-5 text-sm font-medium text-body-color hover:border-primary focus:border-primary dark:border-dark-3 dark:text-dark-6">
                  {selectedStartDate}
                </button>
                <button className="h-[37px] rounded border border-stroke bg-transparent px-5 text-sm font-medium text-body-color hover:border-primary focus:border-primary dark:border-dark-3 dark:text-dark-6">
                  {selectedEndDate}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}