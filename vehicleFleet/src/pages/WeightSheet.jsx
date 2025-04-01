import React, { useEffect, useState } from 'react';

import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import Calendar from '../components/Calendar';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';

const initialVehicleData = [
    { id: 1, date: '15-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 1500, unloadingWeight: 1495, rate: 120, source: 'Sakhoti', destination: 'Jain', amount: 180000, owner: 'Gopal Logistic', weightDifference: 5 },
    { id: 2, date: '16-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 1800, unloadingWeight: 1795, rate: 50, source: 'Raipura', destination: 'Bareily', amount: 90000, owner: 'Sheetal Meel', weightDifference: 5 },
    { id: 3, date: '17-11-2024', vehicleNumber: 'MH12AB1234', loadingWeight: 2000, unloadingWeight: 1992, rate: 110, source: 'KKRI', destination: 'BKT', amount: 220000, owner: 'RK Sharma', weightDifference: 8 },
    { id: 4, date: '18-11-2024', vehicleNumber: 'DL12EF9876', loadingWeight: 2200, unloadingWeight: 2195, rate: 110, source: 'Chandanber', destination: 'SBT', amount: 242000, owner: 'Anil Mishra', weightDifference: 5 },
    { id: 5, date: '19-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 1700, unloadingWeight: 1690, rate: 120, source: 'Sakhoti', destination: 'Jain', amount: 204000, owner: 'Gopal Logistic', weightDifference: 10 },
    { id: 6, date: '20-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 1600, unloadingWeight: 1595, rate: 120, source: 'Raipura', destination: 'Bareily', amount: 192000, owner: 'Sheetal Meel', weightDifference: 5 },
    { id: 7, date: '21-11-2024', vehicleNumber: 'MH12AB1234', loadingWeight: 2100, unloadingWeight: 2095, rate: 50, source: 'KKRI', destination: 'BKT', amount: 105000, owner: 'RK Sharma', weightDifference: 5 },
    { id: 8, date: '22-11-2024', vehicleNumber: 'DL12EF9876', loadingWeight: 1900, unloadingWeight: 1892, rate: 50, source: 'Chandanber', destination: 'SBT', amount: 95000, owner: 'Anil Mishra', weightDifference: 8 },
    { id: 9, date: '23-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 2000, unloadingWeight: 1995, rate: 50, source: 'Sakhoti', destination: 'Jain', amount: 100000, owner: 'Gopal Logistic', weightDifference: 5 },
    { id: 10, date: '24-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 2200, unloadingWeight: 2190, rate: 50, source: 'Raipura', destination: 'Bareily', amount: 110000, owner: 'Sheetal Meel', weightDifference: 10 },
];


const initialExpenseData = [
    { id: 1, date: "15-11-2024", vehicleNumber: "MH12AB1234", owner: "Gopal Logistic", hsd: 50, hsdAmount: 5000, cash: 1000, totalAmount: 6050, petrolPump: "Puri P.Pump" },
    { id: 2, date: "16-11-2024", vehicleNumber: "UP01RS4321", owner: "Sheetal Meel", hsd: 40, hsdAmount: 4000, cash: 1500, totalAmount: 5500, petrolPump: "S.B P.Pump" },
    { id: 3, date: "17-11-2024", vehicleNumber: "UP32GH5678", owner: "RK Sharma", hsd: 60, hsdAmount: 6000, cash: 2000, totalAmount: 8000, petrolPump: "Sambhal P.Pump" },
    { id: 4, date: "18-11-2024", vehicleNumber: "DL04EF1234", owner: "Anil Mishra", hsd: 55, hsdAmount: 5500, cash: 1800, totalAmount: 7300, petrolPump: "Delhi P.Pump" },
];

const initialMiscellaneousData = [
    { id: 1, date: "16-11-2024", vehicleNumber: "MH12AB1234", owner: "Gopal Logistic", type: "Insurance", amount: 5000 },
    { id: 2, date: "17-11-2024", vehicleNumber: "UP01RS4321", owner: "Sheetal Meel", type: "Tax", amount: 3000 },
    { id: 3, date: "18-11-2024", vehicleNumber: "UP32GH5678", owner: "RK Sharma", type: "Servicing", amount: 7000 },
    { id: 4, date: "19-11-2024", vehicleNumber: "DL04EF1234", owner: "Anil Mishra", type: "Permit Renewal", amount: 4500 },
];

const prevDues = 650000;

const WeightSheet = () => {

    const { vehicleData } = useSelector((state) => state.vehicleData);
    const [finalExpenses, setFinalExpenses] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    const [incomeData, setIncomeData] = useState(initialVehicleData);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');

    const [selectedDate, setSelectedDate] = useState(false);

    const [selectedSource, setSelectedSource] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');

    const [incomeFilteredData, setIncomeFilteredData] = useState([]);

    const [dateState, setDateState] = useState([
        {
            startDate: "",
            endDate: "", // Set a default endDate
            key: "selection",
        },
    ]);
    useEffect(() => {
        console.log(dateState, "date")
        if (dateState[0].startDate && dateState[0].endDate) setSelectedDate(true);
    }, [dateState])

    useEffect(() => {
        const incomeSum = incomeFilteredData.reduce((sum, row) => sum + row.unloadingWeight * row.rate, 0);
        setTotalIncome(incomeSum);
        setTotalRounds(incomeFilteredData.length)
    }, [incomeFilteredData, setTotalIncome, setTotalRounds]);

    useEffect(() => {
        const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('-');
            return new Date(`${year}-${month}-${day}`); // Converts to yyyy-mm-dd format
        };

        const filteredData = incomeData?.filter((income) => {

            const isVehicleNumberMatch = selectedVehicle === "" || selectedVehicle === "All" || income.vehicleNumber === selectedVehicle;

            const isOwnerMatch = selectedOwner === "" || selectedOwner === "All" || income.owner === selectedOwner;

            const isSourceDestinationMatch =
                selectedSource && selectedDestination
                    ? (selectedSource === "All" && selectedDestination === "All") ||
                    (selectedSource === "All" && income.destination === selectedDestination) ||
                    (selectedDestination === "All" && income.source === selectedSource) ||
                    (income.source === selectedSource && income.destination === selectedDestination)
                    : true;

            // Ensure the dates are in correct Date object format for comparison
            const incomeDate = parseDate(income.date);
            const startDate = parseDate(dateState[0]?.startDate);
            const endDate = parseDate(dateState[0]?.endDate);

            // console.log(incomeDate, typeof (incomeDate))
            // console.log(startDate, typeof (startDate))
            // console.log(endDate, typeof (endDate))
            const isDateInRange =
                (!dateState[0]?.startDate || !dateState[0]?.endDate || // If startDate or endDate are not provided, ignore date range check
                    (incomeDate >= startDate && incomeDate <= endDate)); // Compare the incomeDate with the range

            // Apply the filtering logic (return true if all conditions are met)
            return ((isVehicleNumberMatch && isOwnerMatch) && isSourceDestinationMatch && isDateInRange);
        }) || [];

        // Default to an empty array if incomeData is null or undefined

        const updatedFilteredDataWithId = filteredData.map((data, index) => ({
            ...data,
            id: index + 1, // Set custom id based on index
        }));
        setIncomeFilteredData(updatedFilteredDataWithId);
    }, [incomeData, selectedVehicle, selectedOwner, selectedDate, selectedSource, selectedDestination, dateState]);

    const handleExportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        // Income sheet headers and data
        const incomeSheetHeaders = {
            date: "Date",
            vehicleNumber: "Vehicle Number",
            unloadingWeight: "Weight (kg)",
            rate: "Rate (per kg)",
            source: "Source",
            destination: "Destination",
            amount: "Income",
        };
        const incomeSheetData = [
            ...incomeFilteredData.map(({ id, loadingWeight, owner, ...rest }) => rest), // Exclude 'id' field
            {}, {}, // Empty rows
            { source: "Total Rounds: ", amount: totalRounds },
            {},
            { source: "Total Income: ", amount: totalIncome },
            {},
            { source: "Total Expense: ", amount: finalExpenses },
            {},
            { source: "Total Profit: ", amount: totalIncome - finalExpenses },
            {},
            { source: "Prev Dues: ", amount: prevDues },
            {},
            { source: "Balance: ", amount: prevDues + (totalIncome - finalExpenses) },
        ];

        // Correctly extract headers as an array of keys
        const incomeHeaders = Object.keys(incomeSheetHeaders);

        // Create a worksheet and manually insert the headers
        const incomeWorksheet = XLSX.utils.json_to_sheet(incomeSheetData, {
            header: incomeHeaders,
            skipHeader: true,
            origin: "A5", // Start from the 5th row for the main table
        });

        // Insert the selected owner at the top row (centered)
        const ownerCellRef = XLSX.utils.encode_cell({ r: 0, c: Math.floor(incomeHeaders.length / 2) });
        incomeWorksheet[ownerCellRef] = {
            v: selectedOwner || "All", // Display the selected owner or "All" if not selected
            t: "s",
        };

        // Apply styling to the owner cell (bold, yellow background, and centered)
        incomeWorksheet[ownerCellRef].s = {
            alignment: {
                horizontal: "center", // Center horizontally
                vertical: "center", // Center vertically
            },
            font: {
                bold: true, // Bold font
                sz: 16, // Slightly larger font size
            },
            fill: {
                fgColor: { rgb: "FFFF00" }, // Yellow background color
            },
        };

        // Insert custom headers in the third row (two-row gap)
        incomeHeaders.forEach((header, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 3, c: index }); // Start from row 3
            incomeWorksheet[cellRef] = {
                v: incomeSheetHeaders[header],
                t: "s",
            };
        });

        // Style the custom headers (bold)
        incomeHeaders.forEach((header, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 3, c: index }); // Start from row 3
            if (incomeWorksheet[cellRef]) {
                incomeWorksheet[cellRef].s = {
                    font: {
                        bold: true, // Make the font bold
                        sz: 14, // Font size
                    },
                    alignment: {
                        horizontal: "center", // Center align the headers
                    },
                };
            }
        });

        // Expense sheet headers and data
        const expenseSheetHeaders = {
            date: "Date",
            vehicleNumber: "Vehicle Number",
            // petrolPump: "Petrol Pump",
            hsd: "HSD (liters)",
            hsdAmount: "HSD Amount",
            cash: "Cash",
            others: "Others",
            // salary: "Salary",
            // fitness: "Fitness",
            // tax: "Tax",
            // tyre: "Tyre",
            // installment: "Installments",
            // permit: "Permit",
            totalAmount: "Amount",
            // finalExpense:"Total Amount"
        };
        const transformedMiscellaneousData = filteredMiscellaneousData.map(({ id, petrolPump, owner, type, amount, ...rest }) => ({
            ...rest,
            others: type,
            // salary: type === 'Driver Salary',
            // insura: type === 'Vehicle Insurance',
            // salary: type === 'Driver Salary',
            // salary: type === 'Driver Salary',
            // salary: type === 'Driver Salary',
            totalAmount: amount,
        }));
        const expenseSheetData = [
            ...filteredExpenseData.map(({ id, petrolPump, owner, ...rest }) => rest), // Exclude 'id' field
            ...transformedMiscellaneousData, // Transformed Miscellaneous Data
            {}, {}, // Empty rows
            { cash: "Total Expenses: ", totalAmount: finalExpenses },
        ];

        // Correctly extract headers as an array of keys
        const expenseHeaders = Object.keys(expenseSheetHeaders);

        // Manually insert headers in the first row, and use skipHeader: true
        const expenseWorksheet = XLSX.utils.json_to_sheet(expenseSheetData, {
            header: expenseHeaders, // Use the array of headers
            skipHeader: true, // Skip default header generation
            origin: "A2", // Start from the second row
        });

        // Insert custom headers in the first row
        expenseHeaders.forEach((header, index) => {
            expenseWorksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
                v: expenseSheetHeaders[header],
                t: 's',
            };
        });

        // Style the custom headers (bold)
        expenseHeaders.forEach((header, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
            if (expenseWorksheet[cellRef]) {
                expenseWorksheet[cellRef].s = {
                    font: {
                        bold: true, // Make the font bold
                        sz: 14, // Font size
                    },
                };
            }
        });

        // Set column widths for both sheets
        const setColumnWidths = (worksheet) => {
            const columnsCount = XLSX.utils.decode_range(worksheet['!ref']).e.c + 1; // Total columns
            worksheet['!cols'] = Array(columnsCount).fill({ wch: 18 }); // Set each column to width 18
        };
        setColumnWidths(incomeWorksheet);
        setColumnWidths(expenseWorksheet);

        // Append worksheets to the workbook
        XLSX.utils.book_append_sheet(workbook, incomeWorksheet, 'Monthly Income');
        XLSX.utils.book_append_sheet(workbook, expenseWorksheet, 'Monthly Expenses');

        // Trigger download
        XLSX.writeFile(workbook, 'VehicleData.xlsx');
    };

    const handleSourceData = (event) => {
        setSelectedSource(event.target.value);
    };

    const handleDestinationData = (event) => {
        setSelectedDestination(event.target.value);
    };

    const handleFilterChange = (event) => {
        setSelectedVehicle(event.target.value);
    };
    const handleOwnerFilterChange = (event) => {
        setSelectedOwner(event.target.value);
    };

    const incomeColumns = [
        { field: 'id', headerName: 'S No.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'owner', headerName: 'Owners', flex: 1 },
        { field: 'source', headerName: 'Source', flex: 1 },
        { field: 'destination', headerName: 'Destination', flex: 1 },
        {
            field: 'loadingWeight', headerName: 'Loading Weight', flex: 1
        },
        {
            field: 'unloadingWeight', headerName: 'Unloading Weight', flex: 1
        },
        {
            field: 'weightDifference', headerName: 'Difference Weight', flex: 1
        },
        { field: 'rate', headerName: 'Rate', flex: 0.8 },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1,
        },
    ];


    // Expenses 
    const [expenseData, setExpenseData] = useState(initialExpenseData);
    const [miscellaneousData, setMiscellaneousData] = useState(initialMiscellaneousData);

    const [filteredExpenseData, setFilteredExpenseData] = useState([]);
    const [filteredMiscellaneousData, setFilteredMiscellaneousData] = useState([]);

    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalMiscellaneousAmount, setTotalMiscellaneousAmount] = useState(0);


    useEffect(() => {
        const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('-');
            return new Date(`${year}-${month}-${day}`); // Converts to yyyy-mm-dd format
        };

        const filteredExpenses = expenseData.filter((expense) => {
            const isVehicleNumberMatch = selectedVehicle === "" || selectedVehicle === "All" || expense.vehicleNumber === selectedVehicle;

            const isOwnerMatch = selectedOwner === "" || selectedOwner === "All" || expense.owner === selectedOwner;

            const expenseDate = parseDate(expense.date);
            const startDate = parseDate(dateState[0]?.startDate);
            const endDate = parseDate(dateState[0]?.endDate);

            const isDateInRange =
                (!dateState[0]?.startDate || !dateState[0]?.endDate || // If startDate or endDate are not provided, ignore date range check
                    (expenseDate >= startDate && expenseDate <= endDate));

            // const isDateInRange =
            //     (!dateState[0]?.startDate ||
            //         !dateState[0]?.endDate ||
            //         (new Date(expense.date) >= new Date(dateState[0].startDate) &&
            //             new Date(expense.date) <= new Date(dateState[0].endDate)));
            return ((isVehicleNumberMatch && isOwnerMatch) && isDateInRange);
        }) || [];
        const updatedFilteredDataWithId = filteredExpenses.map((data, index) => ({
            ...data,
            id: index + 1, // Set custom id based on index
        }));
        setFilteredExpenseData(updatedFilteredDataWithId);

        const filteredMisc = miscellaneousData.filter((misc) => {
            const isVehicleNumberMatch = selectedVehicle === "" || selectedVehicle === "All" || misc.vehicleNumber === selectedVehicle;

            const isOwnerMatch = selectedOwner === "" || selectedOwner === "All" || misc.owner === selectedOwner;

            const miscDate = parseDate(misc.date);
            const startDate = parseDate(dateState[0]?.startDate);
            const endDate = parseDate(dateState[0]?.endDate);

            const isDateInRange =
                (!dateState[0]?.startDate || !dateState[0]?.endDate || // If startDate or endDate are not provided, ignore date range check
                    (miscDate >= startDate && miscDate <= endDate));

            return ((isVehicleNumberMatch && isOwnerMatch) && isDateInRange);
        }) || [];

        const updatedFilteredMiscDataWithId = filteredMisc.map((data, index) => ({
            ...data,
            id: index + 1, // Set custom id based on index
        }));
        setFilteredMiscellaneousData(updatedFilteredMiscDataWithId);
    }, [expenseData, miscellaneousData, selectedVehicle, selectedOwner, dateState]);

    useEffect(() => {
        const totalExpense = filteredExpenseData.reduce((sum, row) => sum + row.totalAmount, 0);
        const totalMisc = filteredMiscellaneousData.reduce((sum, row) => sum + row.amount, 0);
        setTotalExpenses(totalExpense);
        setTotalMiscellaneousAmount(totalMisc);
    }, [filteredExpenseData, filteredMiscellaneousData]);

    useEffect(() => {
        setFinalExpenses(totalExpenses + totalMiscellaneousAmount)
    }, [totalExpenses, totalMiscellaneousAmount])


    const expenseColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'owner', headerName: 'Owners', flex: 1 },
        { field: 'petrolPump', headerName: 'Petrol Pump', flex: 1 },
        { field: 'hsd', headerName: 'HSD (L)', flex: 1 },
        { field: 'hsdAmount', headerName: 'HSD Amount', flex: 1 },
        { field: 'cash', headerName: 'Cash', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
    ];

    const miscColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'owner', headerName: 'Owners', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
    ];



    return (
        <div className="px-[6vmax] w-[86%] pt-4 bg-secondary text-primaryColor h-[92vh] overflow-hidden box-border">
            <div className='flex items-center justify-between py-4'>
                <div className='w-[60%] flex items-center justify-between gap-4'>

                    <FormControl sx={{ width: "50%" }}>
                        <InputLabel id="filter-vehicle-label">Vehicles</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-vehicle-label"
                            value={selectedVehicle}
                            label="Vehicles"
                            onChange={handleFilterChange}
                        >
                            {vehicleData?.Vehicles.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <FormControl sx={{ width: "50%" }}>
                        <InputLabel id="filter-vehicle-label">Owners</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-vehicle-label"
                            value={selectedOwner}
                            label="Vehicles"
                            onChange={handleOwnerFilterChange}
                        >
                            {vehicleData?.Owners.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}

                    <Calendar dateState={dateState} setDateState={setDateState} />
                </div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleExportToExcel}
                    startIcon={<GetAppIcon />}
                    sx={{ height: '100%' }}
                >
                    Export to Excel
                </Button>


            </div>

            {/* source and destination filters */}
            {
                (<div className='flex items-center justify-between gap-4 pb-4 w-[60%]'>

                    <FormControl fullWidth>
                        <InputLabel id="filter-source-label">Source</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-source-label"
                            value={selectedSource}
                            label="Source"
                            onChange={handleSourceData}
                        >
                            {vehicleData?.Sources.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>

                        <InputLabel id="filter-destination-label">Destination</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-destination-label"
                            value={selectedDestination}
                            label="Destination"
                            onChange={handleDestinationData}
                        >
                            {vehicleData?.Destinations.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> </div>)
            }

            <div className='h-[75vh] py-[2vmax] overflow-auto'>

                {/* Income */}
                <div className='w-full'>
                    <h3 className="text-lg font-medium pb-2 w-fit mx-auto">Weight Sheet</h3>

                    {
                        incomeFilteredData && (
                            <div className='flex items-center justify-between bg-white shadow-lg p-4 border rounded-md'>

                                <h3 className='text-base font-normal'>No. of Rounds: <span className='text-xl font-medium'>{totalRounds}
                                </span></h3>
                                <h3 className='text-base font-normal'>Total Income Generated: <span className='text-xl font-medium'>
                                    ₹{totalIncome}
                                </span> </h3>
                            </div>
                        )
                    }
                    <div className='shadow-lg '>

                        <Box sx={{}}>

                            <DataGrid
                                rows={incomeFilteredData || []}
                                columns={incomeColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                                sx={{
                                    '& .MuiDataGrid-root': {
                                        border: 0, // Removes unnecessary borders for a cleaner look
                                    },
                                    '& .MuiDataGrid-columnHeader': {
                                        backgroundColor: '#f5f5f5', // Optional: Add header background styling
                                    },
                                }}
                            />
                        </Box>
                    </div>
                </div>

                {/* Expense */}

                {/* <div className="w-full ">
                    <h3 className="text-lg font-medium pb-2 w-fit mx-auto mt-[4vmax]">Main Expenses</h3>
                    <div className="flex items-center justify-between bg-white shadow-lg p-4 border rounded-md">
                        <h3 className="text-base font-normal">
                            No. of Records: <span className="text-xl font-medium">{filteredExpenseData.length + filteredMiscellaneousData.length}</span>
                        </h3>
                        <h3 className="text-base font-normal">
                            Total Expenses: ₹<span className="text-xl font-medium">{finalExpenses}</span>
                        </h3>
                    </div>

                    <div className=' '>

                        <Box className="shadow-lg" sx={{ width: '100%', height: 'auto', maxHeight: '50vh', boxShadow: "" }}>

                            <DataGrid rows={filteredExpenseData} columns={expenseColumns} pageSize={5} />
                        </Box>


                        <h3 className="text-lg font-medium pb-2 w-fit mx-auto mt-[4vmax]">Miscellaneous Expenses</h3>
                        <Box sx={{ width: '100%', height: 'auto', maxHeight: '50vh' }}>

                            <DataGrid rows={filteredMiscellaneousData} columns={miscColumns} pageSize={5} />
                        </Box>


                    </div>
                </div> */}
            </div>


        </div >
    )
}

export default WeightSheet;