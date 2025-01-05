/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Calendar({ dateState, setDateState }) {
    const containerRef = useRef();
    const [fromDate, setFromDate] = useState(dateState[0]?.startDate || null);
    const [toDate, setToDate] = useState(dateState[0]?.endDate || null);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0'); // Ensure 2 digits
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-based index, so add 1)
        const year = d.getFullYear();

        return `${day}-${month}-${year}`;
    };
    useEffect(() => {
        if (fromDate && toDate)
            setDateState([{ startDate: formatDate(fromDate), endDate: formatDate(toDate) }]);
        // setFromDate(fromDate);
        // setToDate(formatDate(toDate))
        console.log(fromDate, toDate, "from & to date")
    }, [fromDate, setDateState, toDate]);

    return (
        <div className="w-full"
            ref={containerRef}>
            <style>
                {`
        /* Custom styles for the DatePicker components */
        
        .custom-date-picker {
          width: 15vmax;
          height: 3vmax;
          cursor: pointer;
        //   background-color:white !important;
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
        }

        .MuiInputBase-root {
        height:3vmax;
        background-color:white;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Adds a shadow to the picker input */
          font-family: Poppins, sans-serif; /* Set font to Poppins */
        }

        .MuiOutlinedInput-notchedOutline {
          border-color: #C3C4C5 !important; /* Border styling */
        }

        .MuiPickersDay-root.Mui-selected {
          background-color: #1976d2 !important; /* Default blue background for selected dates */
          color: white !important; /* White text for selected dates */
        }

        .MuiPickersDay-root.Mui-selected:hover {
          background-color: #1565c0 !important; /* Slightly darker blue for hover effect */
        }

        .MuiPickersDay-root.Mui-disabled {
          color: rgba(0, 0, 0, 0.38) !important;
        }

        .MuiTypography-root {
          font-family: Poppins, sans-serif !important; /* Set font to Poppins */
        }
      `}
            </style>

            {/* FROM DatePicker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex gap-4 ">
                    <div>
                        <DatePicker
                            label="From"
                            value={fromDate}
                            onChange={(newDate) => setFromDate(newDate)}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <div
                                    ref={inputRef}
                                    {...inputProps}
                                    className="custom-date-picker"
                                >
                                    <span className="mr-2">
                                        {fromDate
                                            ? format(fromDate, "dd-MM-yyyy")
                                            : "Select Date"}
                                    </span>
                                    {InputProps?.endAdornment}
                                </div>
                            )}
                        />
                    </div>

                    {/* TO DatePicker */}
                    <div>
                        <DatePicker
                            label="To"
                            value={toDate}
                            onChange={(newDate) => setToDate(newDate)}
                            minDate={fromDate} // Prevent "To" date from being before "From"
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <div
                                    ref={inputRef}
                                    {...inputProps}
                                    className="custom-date-picker"
                                >
                                    <span className="mr-2">
                                        {toDate
                                            ? format(toDate, "dd-MM-yyyy")
                                            : "Select Date"}
                                    </span>
                                    {InputProps?.endAdornment}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </LocalizationProvider>
        </div>
    );
}

export default Calendar;
