/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Calendar({ dateState, setDateState }) {
    const containerRef = useRef();
    const [fromDate, setFromDate] = useState(dateState[0]?.startDate || "");
    const [toDate, setToDate] = useState(dateState[0]?.endDate || "");

    const formatDate = (date) => {
        if (!date) return "";
        return format(new Date(date), "dd-MM-yyyy");
    };

    const handleDateChange = (e, setDate) => {
        const parsedDate = parse(e.target.value, "yyyy-MM-dd", new Date());
        setDate(formatDate(parsedDate));
    };

    useEffect(() => {
        if (fromDate && toDate) {
            setDateState([{ startDate: fromDate, endDate: toDate }]);
        }
    }, [fromDate, toDate, setDateState]);

    return (
        <div className="w-full" ref={containerRef}>
            <style>
                {`
        .custom-date-picker {
          width: 15vmax;
          height: 3vmax;
          cursor: pointer;
          color: rgb(134, 134, 134);
          font-size: 1vmax;
          font-weight: 400;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-inline: 1vmax;
          border-radius: 5px;
          outline: none;
          border: 1px solid #C3C4C5;
          background-color: white;
        }
      `}
            </style>

            <div className="flex gap-4">
                <div>
                    <label>From:</label>
                    <input
                        type="date"
                        value={fromDate ? format(new Date(fromDate), "yyyy-MM-dd") : ""}
                        onChange={(e) => handleDateChange(e, setFromDate)}
                        className="custom-date-picker"
                    />
                </div>
                <div>
                    <label>To:</label>
                    <input
                        type="date"
                        value={toDate ? format(new Date(toDate), "yyyy-MM-dd") : ""}
                        onChange={(e) => handleDateChange(e, setToDate)}
                        className="custom-date-picker"
                        min={fromDate ? format(new Date(fromDate), "yyyy-MM-dd") : ""}
                    />
                </div>
            </div>
        </div>
    );
}

export default Calendar;
