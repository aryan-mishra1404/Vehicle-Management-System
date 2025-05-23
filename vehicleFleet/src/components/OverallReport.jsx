import React, { useEffect, useState } from 'react';

import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import Calendar from './Calendar';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';

const initialVehicleData = [
    { id: 1, date: '15-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 1500, unloadingWeight: 1495, rate: 120, source: 'Sakhoti', destination: 'Jain', amount: 180000, owner: 'Gopal Logistic' },
    { id: 2, date: '15-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 1800, unloadingWeight: 1795, rate: 50, source: 'Raipura', destination: 'Bareily', amount: 90000, owner: 'Sheetal Meel' },
    { id: 3, date: '17-11-2024', vehicleNumber: 'MH12AB1234', loadingWeight: 2000, unloadingWeight: 1992, rate: 110, source: 'KKRI', destination: 'BKT', amount: 220000, owner: 'RK Sharma' },
    { id: 4, date: '18-11-2024', vehicleNumber: 'DL12EF9876', loadingWeight: 2200, unloadingWeight: 2195, rate: 110, source: 'Chandanber', destination: 'SBT', amount: 242000, owner: 'Anil Mishra' },
    { id: 5, date: '19-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 1700, unloadingWeight: 1690, rate: 120, source: 'Sakhoti', destination: 'Jain', amount: 204000, owner: 'Gopal Logistic' },
    { id: 6, date: '20-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 1600, unloadingWeight: 1595, rate: 120, source: 'Raipura', destination: 'Bareily', amount: 192000, owner: 'Sheetal Meel' },
    { id: 7, date: '21-11-2024', vehicleNumber: 'MH12AB1234', loadingWeight: 2100, unloadingWeight: 2095, rate: 50, source: 'KKRI', destination: 'BKT', amount: 105000, owner: 'RK Sharma' },
    { id: 8, date: '22-11-2024', vehicleNumber: 'DL12EF9876', loadingWeight: 1900, unloadingWeight: 1892, rate: 50, source: 'Chandanber', destination: 'SBT', amount: 95000, owner: 'Anil Mishra' },
    { id: 9, date: '23-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 2000, unloadingWeight: 1995, rate: 50, source: 'Sakhoti', destination: 'Jain', amount: 100000, owner: 'Gopal Logistic' },
    { id: 10, date: '24-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 2200, unloadingWeight: 2190, rate: 50, source: 'Raipura', destination: 'Bareily', amount: 110000, owner: 'Sheetal Meel' },
];

const initialExpenseData = [
    { id: 1, date: "15-11-2024", vehicleNumber: "MH12AB1234", owner: "Gopal Logistic", hsd: 50, hsdAmount: 5000, cash: 1000, totalAmount: 6050, petrolPump: "Puri P.Pump" },
    { id: 2, date: "15-11-2024", vehicleNumber: "UP32GH5678", owner: "Sheetal Meel", hsd: 40, hsdAmount: 4000, cash: 1500, totalAmount: 5500, petrolPump: "S.B P.Pump" },
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

const OverallReport = () => {

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

        // Define headers with exact order
        const headers = [
            "S No.",
            "Date",
            "Vehicle Number",
            "Owners",
            "Source",
            "Destination",
            "Loading Weight",
            "Unloading Weight",
            "Rate",
            "Income Amount",
            "Petrol Pump",
            "HSD (L)",
            "HSD Amount",
            "Cash",
            "Expense Amount",
            "Miscellaneous Type",
            "Miscellaneous Amount"
        ];

        // Function to create an empty row with all columns
        const createEmptyRow = () => {
            return headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {});
        };

        // Create a map to hold combined data
        const combinedDataMap = new Map();

        // Process income data
        incomeFilteredData.forEach(entry => {
            const key = `${entry.date}_${entry.vehicleNumber}`;
            const newRow = {
                ...createEmptyRow(),
                "Date": entry.date,
                "Vehicle Number": entry.vehicleNumber,
                "Owners": entry.owner,
                "Source": entry.source,
                "Destination": entry.destination,
                "Loading Weight": entry.loadingWeight,
                "Unloading Weight": entry.unloadingWeight,
                "Rate": entry.rate,
                "Income Amount": entry.amount
            };
            combinedDataMap.set(key, newRow);
        });

        // Process expense data
        filteredExpenseData.forEach(entry => {
            const key = `${entry.date}_${entry.vehicleNumber}`;
            let row = combinedDataMap.get(key) || {
                ...createEmptyRow(),
                "Date": entry.date,
                "Vehicle Number": entry.vehicleNumber,
                "Owners": entry.owner
            };

            row = {
                ...row,
                "Petrol Pump": entry.petrolPump || row["Petrol Pump"],
                "HSD (L)": entry.hsd || row["HSD (L)"],
                "HSD Amount": entry.hsdAmount || row["HSD Amount"],
                "Cash": entry.cash || row["Cash"],
                "Expense Amount": entry.totalAmount || row["Expense Amount"]
            };

            combinedDataMap.set(key, row);
        });

        // Process miscellaneous data
        filteredMiscellaneousData.forEach(entry => {
            const key = `${entry.date}_${entry.vehicleNumber}`;
            let row = combinedDataMap.get(key) || {
                ...createEmptyRow(),
                "Date": entry.date,
                "Vehicle Number": entry.vehicleNumber,
                "Owners": entry.owner
            };

            row = {
                ...row,
                "Miscellaneous Type": entry.type || row["Miscellaneous Type"],
                "Miscellaneous Amount": entry.amount || row["Miscellaneous Amount"]
            };

            combinedDataMap.set(key, row);
        });

        // Convert map to array and sort by date
        const allData = Array.from(combinedDataMap.values())
            .sort((a, b) => {
                const dateA = new Date(a["Date"].split('-').reverse().join('-'));
                const dateB = new Date(b["Date"].split('-').reverse().join('-'));
                return dateA - dateB;
            })
            .map((row, index) => ({
                ...row,
                "S No.": index + 1
            }));

        // Add summary rows
        const allDataWithSummary = [
            ...allData,
            createEmptyRow(),
            createEmptyRow(),
            {
                ...createEmptyRow(),
                "Source": "Total Rounds:",
                "Income Amount": totalRounds
            },
            createEmptyRow(),
            {
                ...createEmptyRow(),
                "Source": "Total Income:",
                "Income Amount": totalIncome
            },
            createEmptyRow(),
            {
                ...createEmptyRow(),
                "Source": "Total Expense:",
                "Income Amount": finalExpenses
            },
            createEmptyRow(),
            {
                ...createEmptyRow(),
                "Source": "Total Profit:",
                "Income Amount": totalIncome - finalExpenses
            },
            createEmptyRow(),
            {
                ...createEmptyRow(),
                "Source": "Prev Dues:",
                "Income Amount": prevDues
            },
            createEmptyRow(),
            {
                ...createEmptyRow(),
                "Source": "Balance:",
                "Income Amount": prevDues + (totalIncome - finalExpenses)
            }
        ];

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet([headers]);

        // Add data rows
        XLSX.utils.sheet_add_json(worksheet, allDataWithSummary, {
            origin: 'A2',
            skipHeader: true
        });

        // Style configuration
        const headerStyle = {
            font: { bold: true },
            alignment: { horizontal: 'center', vertical: 'center' },
            fill: { fgColor: { rgb: "E6E6E6" } },
            border: {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
        };

        // Set column widths and apply styles
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        worksheet['!cols'] = headers.map(() => ({ wch: 15 }));

        // Apply header styles
        headers.forEach((_, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
            worksheet[cellRef].s = headerStyle;
        });

        // Add the worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicle Report");

        // Save the file
        XLSX.writeFile(workbook, `VehicleReport_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`);
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

        <div className=" w-full bg-secondary text-primaryColor ">

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
                    <FormControl sx={{ width: "50%" }}>
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
                    </FormControl>

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
                ((selectedVehicle || selectedOwner) && selectedDate) && (<div className='flex items-center justify-between gap-4 pb-4 w-[60%]'>

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
                    <h3 className="text-lg font-medium pb-2 w-fit mx-auto">Total Income</h3>

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

                <div className="w-full ">
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
                </div>
            </div>


        </div >
    )
}

export default OverallReport;