import React, { useEffect, useState } from 'react';

import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import Calendar from './Calendar';
import * as XLSX from 'xlsx';


const initialVehicleData = [
    { id: 1, date: '2024-11-15', vehicleNumber: 'MH12AB1234', weight: 1500, rate: 120, source: 'Chennai', destination: 'Coimbatore', income: 180000 },
    { id: 2, date: '2024-11-16', vehicleNumber: 'UP01RS4321', weight: 1800, rate: 50, source: 'Delhi', destination: 'Noida', income: 90000 },
    { id: 3, date: '2024-11-17', vehicleNumber: 'UP32GH5678', weight: 2000, rate: 110, source: 'Lucknow', destination: 'Kanpur', income: 220000 },
    { id: 4, date: '2024-11-18', vehicleNumber: 'UP32GH5678', weight: 2200, rate: 110, source: 'Bangalore', destination: 'Mysore', income: 242000 },
    { id: 5, date: '2024-11-19', vehicleNumber: 'MH12AB1234', weight: 1700, rate: 120, source: 'Chennai', destination: 'Coimbatore', income: 204000 },
    { id: 6, date: '2024-11-20', vehicleNumber: 'MH12AB1234', weight: 1600, rate: 120, source: 'Chennai', destination: 'Coimbatore', income: 192000 },
    { id: 7, date: '2024-11-21', vehicleNumber: 'UP01RS4321', weight: 2100, rate: 50, source: 'Kolkata', destination: 'Howrah', income: 105000 },
    { id: 8, date: '2024-11-22', vehicleNumber: 'UP01RS4321', weight: 1900, rate: 50, source: 'Jaipur', destination: 'Ajmer', income: 95000 },
    { id: 9, date: '2024-11-23', vehicleNumber: 'UP01RS4321', weight: 2000, rate: 50, source: 'Jaipur', destination: 'Ajmer', income: 100000 },
    { id: 10, date: '2024-11-24', vehicleNumber: 'MH12AB1234', weight: 2200, rate: 50, source: 'Jaipur', destination: 'Ajmer', income: 110000 },
];
const initialExpenseData = [
    { id: 1, date: '2024-11-15', vehicleNumber: 'MH12AB1234', hsd: 50, hsdAmount: 5000, cash: 1000, totalAmount: 6050 },
    { id: 2, date: '2024-11-16', vehicleNumber: 'UP01RS4321', hsd: 40, hsdAmount: 4000, cash: 1500, totalAmount: 5500 },
    { id: 3, date: '2024-11-17', vehicleNumber: 'UP32GH5678', hsd: 60, hsdAmount: 6000, cash: 2000, totalAmount: 8000 },
];

const initialMiscellaneousData = [
    { id: 1, date: '2024-11-16', vehicleNumber: 'MH12AB1234', type: 'Insurance', amount: 5000 },
    { id: 2, date: '2024-11-17', vehicleNumber: 'UP01RS4321', type: 'Tax', amount: 3000 },
    { id: 3, date: '2024-11-18', vehicleNumber: 'UP32GH5678', type: 'Servicing', amount: 7000 },
];

const OverallReport = () => {
    const [finalExpenses, setFinalExpenses] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    const [vehicleData, setVehicleData] = useState(initialVehicleData);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [selectedSource, setSelectedSource] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const prevDues = 650000

    const [incomeFilteredData, setIncomeFilteredData] = useState([]);

    const [dateState, setDateState] = useState([
        {
            startDate: "",
            endDate: "", // Set a default endDate
            key: "selection",
        },
    ]);

    useEffect(() => {
        const incomeSum = incomeFilteredData.reduce((sum, row) => sum + row.weight * row.rate, 0);
        setTotalIncome(incomeSum);
        setTotalRounds(incomeFilteredData.length)
    }, [incomeFilteredData, setTotalIncome, setTotalRounds]);

    useEffect(() => {
        const incomeFilteredData = vehicleData?.filter((document) => {
            if (!selectedVehicle) return true; // If no vehicle is selected, include all rows

            const isVehicleNumberMatch = document.vehicleNumber === selectedVehicle;
            const isSourceDestinationMatch =
                selectedSource && selectedDestination
                    ? document.source === selectedSource && document.destination === selectedDestination
                    : true;

            const isDateInRange =
                (!dateState[0]?.startDate || // If startDate is not provided, ignore date range check
                    !dateState[0]?.endDate || // If endDate is not provided, ignore date range check
                    (new Date(document.date) >= new Date(dateState[0].startDate) &&
                        new Date(document.date) <= new Date(dateState[0].endDate)));

            return isVehicleNumberMatch && isSourceDestinationMatch && isDateInRange;
        }) || [];
        setIncomeFilteredData(incomeFilteredData);
    }, [vehicleData, selectedVehicle, selectedDate, selectedSource, selectedDestination, dateState]);

    const handleExportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        // Income sheet headers and data
        const incomeSheetHeaders = {
            date: "Date",
            vehicleNumber: "Vehicle Number",
            weight: "Weight (kg)",
            rate: "Rate (per kg)",
            source: "Source",
            destination: "Destination",
            income: "Income",
        };
        const incomeSheetData = [
            ...incomeFilteredData.map(({ id, ...rest }) => rest), // Exclude 'id' field
            {}, {}, // Empty rows
            { source: "Total Rounds: ", income: totalRounds },
            {},
            { source: "Total Income: ", income: totalIncome },
            {},
            { source: "Total Expense: ", income: finalExpenses },
            {},
            { source: "Total Profit: ", income: totalIncome - finalExpenses },
            {},
            { source: "Prev Dues: ", income: prevDues },
            {},
            { source: "Balance: ", income: prevDues + (totalIncome - finalExpenses) },
        ];

        // Correctly extract headers as an array of keys
        const incomeHeaders = Object.keys(incomeSheetHeaders);

        // Manually insert headers in the first row, and use skipHeader: true
        const incomeWorksheet = XLSX.utils.json_to_sheet(incomeSheetData, {
            header: incomeHeaders, // Use the array of headers
            skipHeader: true, // Skip default header generation
            origin: "A2", // Start from the second row
        });

        // Insert custom headers in the first row
        incomeHeaders.forEach((header, index) => {
            incomeWorksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
                v: incomeSheetHeaders[header],
                t: 's',
            };
        });

        // Style the custom headers (bold)
        incomeHeaders.forEach((header, index) => {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
            if (incomeWorksheet[cellRef]) {
                incomeWorksheet[cellRef].s = {
                    font: {
                        bold: true, // Make the font bold
                        sz: 14, // Font size
                    },
                };
            }
        });

        // Expense sheet headers and data
        const expenseSheetHeaders = {
            date: "Date",
            vehicleNumber: "Vehicle Number",
            hsd: "HSD (liters)",
            hsdAmount: "HSD Amount",
            cash: "Cash",
            totalAmount: "Total Amount",
        };
        const transformedMiscellaneousData = filteredMiscellaneousData.map(({ id, type, amount, ...rest }) => ({
            ...rest,
            cash: type,
            totalAmount: amount,
        }));
        const expenseSheetData = [
            ...filteredExpenseData.map(({ id, ...rest }) => rest), // Exclude 'id' field
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






    const handleFilterChange = (event) => {
        setSelectedVehicle(event.target.value);
    };

    const incomeColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'source', headerName: 'Source', flex: 1 },
        { field: 'destination', headerName: 'Destination', flex: 1 },
        {
            field: 'weight', headerName: 'Weight', flex: 0.8
        },
        { field: 'rate', headerName: 'Rate', flex: 0.8 },
        {
            field: 'income',
            headerName: 'Income',
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
        const filteredExpenses = expenseData.filter((expense) => {
            const isVehicleMatch = selectedVehicle ? expense.vehicleNumber === selectedVehicle : true;
            const isDateInRange =
                (!dateState[0]?.startDate ||
                    !dateState[0]?.endDate ||
                    (new Date(expense.date) >= new Date(dateState[0].startDate) &&
                        new Date(expense.date) <= new Date(dateState[0].endDate)));
            return isVehicleMatch && isDateInRange;
        });
        setFilteredExpenseData(filteredExpenses);

        const filteredMisc = miscellaneousData.filter((misc) => {
            const isVehicleMatch = selectedVehicle ? misc.vehicleNumber === selectedVehicle : true;
            const isDateInRange =
                (!dateState[0]?.startDate ||
                    !dateState[0]?.endDate ||
                    (new Date(misc.date) >= new Date(dateState[0].startDate) &&
                        new Date(misc.date) <= new Date(dateState[0].endDate)));
            return isVehicleMatch && isDateInRange;
        });
        setFilteredMiscellaneousData(filteredMisc);
    }, [expenseData, miscellaneousData, selectedVehicle, dateState]);

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
        { field: 'hsd', headerName: 'HSD (L)', flex: 1 },
        { field: 'hsdAmount', headerName: 'HSD Amount', flex: 1 },
        { field: 'cash', headerName: 'Cash', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
    ];

    const miscColumns = [
        { field: 'id', headerName: 'Sno.', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'amount', headerName: 'Amount', flex: 1 },
    ];


    return (

        <div className=" w-full bg-secondary text-primaryColor ">
            <div className='flex items-center justify-between p-[1vmax]'>
                <div className='w-[50%] flex items-center justify-between gap-4'>

                    <FormControl fullWidth>
                        <InputLabel id="filter-vehicle-label">Vehicles</InputLabel>
                        <Select
                            sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                            labelId="filter-vehicle-label"
                            value={selectedVehicle}
                            label="Vehicles"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="MH12AB1234">MH12AB1234</MenuItem>
                            <MenuItem value="UP01RS4321">UP01RS4321</MenuItem>
                            <MenuItem value="UP32GH5678">UP32GH5678</MenuItem>
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