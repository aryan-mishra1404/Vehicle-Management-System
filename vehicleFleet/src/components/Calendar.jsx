/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";



function Calendar({ dateState, setDateState }) {

    const containerRef = useRef();
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const isClickedOutside = e => {
            if (showDatePicker && containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDatePicker(false);
            }
        }

        document.addEventListener("mousedown", isClickedOutside);

        return () => {
            document.removeEventListener("mousedown", isClickedOutside);
        }

    }, [showDatePicker])
    const handleDateInputClick = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateChange2 = (item) => {
        const { startDate, endDate } = item.selection;

        console.log("endDate ", endDate)
        console.log("startDate ", startDate)

        setDateState((prevState) => [
            {
                ...prevState[0],
                startDate: startDate && (startDate < prevState[0].endDate || prevState[0].endDate == "") ? startDate : prevState[0].startDate,
                endDate: endDate && endDate > startDate ? endDate : prevState[0].endDate,
            },
        ]);

        setShowDatePicker(false);
    };

    return (
        <div ref={containerRef}>
            <style>
                {`
        .rdrDefinedRangesWrapper {
          display: none; /* Hides predefined ranges */
        }
        .rdrCalendarWrapper.rdrDateRangeWrapper {
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Adds a shadow to the calendar */
        }
        .rdrWeekDay, .rdrDayNumber {
          font-family: Poppins, sans-serif; /* Sets the font */
        }
        /* Custom styles for the selected date range */
        .rdrDaySelected, .rdrDayStartOfMonth .rdrDaySelected, .rdrDayEndOfMonth .rdrDaySelected {
          background-color: #ffcccc !important; /* Custom background color */
          color: white !important; /* Custom text color for better contrast */
        }
        .rdrDayInRange {
          background-color: #ffd9d9 !important; /* Custom background for in-range dates */
        }
           .rdrDateDisplayItemActive{
          border-color:#F2840C !important
          }
          .rdrInRange,.rdrStartEdge, .rdrEndEdge{
          color:#F2840C !important}

          .rdrDay, .rdrDayWeekend, .rdrDayStartOfWeek, .rdrDayStartOfMonth{
          color:#F2840C !important}
      `}
            </style>

            <input
                type="text"
                value={
                    dateState[0]?.startDate
                        ? `${format(dateState[0]?.startDate, "MM-dd-yyyy")} - ${dateState[0]?.endDate
                            ? format(dateState[0]?.endDate, "MM-dd-yyyy")
                            : "Select End Date"
                        }`
                        : "Select Date"
                }
                readOnly
                onClick={handleDateInputClick}
                style={{
                    width: "15vmax",
                    height: "3vmax",
                    cursor: "pointer",
                    color: "rgb(134, 134, 134)",
                    fontSize: "1vmax",
                    fontWeight: 400,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingInline: "1vmax",
                    borderRadius: "5px",
                    outline: "none",
                    border: "1px solid #C3C4C5",
                }}
            />

            {showDatePicker && (
                <div style={{ position: "absolute", zIndex: 1000 }}>
                    <DateRangePicker
                        editableDateInputs={true}
                        onChange={handleDateChange2}
                        moveRangeOnFirstSelection={false}
                        ranges={dateState}
                        staticRanges={[]} // Remove predefined static ranges
                        inputRanges={[]} // Remove input ranges
                    />
                </div>
            )}
        </div>
    );
}

export default Calendar;
