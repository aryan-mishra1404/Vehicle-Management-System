import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';
import IncomeModal from './IncomeModal';

const initialVehicleData = [
    { id: 1, date: '15-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 1500, unloadingWeight: 1495, rate: 120, source: 'Sakhoti', destination: 'Jain', amount: 180000, owner: 'Gopal Logistic' },
    { id: 2, date: '16-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 1800, unloadingWeight: 1795, rate: 50, source: 'Raipura', destination: 'Bareily', amount: 90000, owner: 'Sheetal Meel' },
    { id: 3, date: '17-11-2024', vehicleNumber: 'MH12AB1234', loadingWeight: 2000, unloadingWeight: 1992, rate: 110, source: 'KKRI', destination: 'BKT', amount: 220000, owner: 'RK Sharma' },
    { id: 4, date: '18-11-2024', vehicleNumber: 'DL12EF9876', loadingWeight: 2200, unloadingWeight: 2195, rate: 110, source: 'Chandanber', destination: 'SBT', amount: 242000, owner: 'Anil Mishra' },
    { id: 5, date: '19-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 1700, unloadingWeight: 1690, rate: 120, source: 'Sakhoti', destination: 'Jain', amount: 204000, owner: 'Gopal Logistic' },
    { id: 6, date: '20-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 1600, unloadingWeight: 1595, rate: 120, source: 'Raipura', destination: 'Bareily', amount: 192000, owner: 'Sheetal Meel' },
    { id: 7, date: '21-11-2024', vehicleNumber: 'MH12AB1234', loadingWeight: 2100, unloadingWeight: 2095, rate: 50, source: 'KKRI', destination: 'BKT', amount: 105000, owner: 'RK Sharma' },
    { id: 8, date: '22-11-2024', vehicleNumber: 'DL12EF9876', loadingWeight: 1900, unloadingWeight: 1892, rate: 50, source: 'Chandanber', destination: 'SBT', amount: 95000, owner: 'Anil Mishra' },
    { id: 9, date: '23-11-2024', vehicleNumber: 'UP01RS4321', loadingWeight: 2000, unloadingWeight: 1995, rate: 50, source: 'Sakhoti', destination: 'Jain', amount: 100000, owner: 'Gopal Logistic' },
    { id: 10, date: '24-11-2024', vehicleNumber: 'UP32GH5678', loadingWeight: 2200, unloadingWeight: 2190, rate: 50, source: 'Raipura', destination: 'Bareily', amount: 110000, owner: 'Sheetal Meel' },
];


const Income = ({ totalIncome, setTotalIncome, totalRounds, setTotalRounds }) => {

    const { vehicleData } = useSelector((state) => state.vehicleData);
    const [incomeData, setIncomeData] = useState(initialVehicleData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDate, setSelectedDate] = useState(false);

    const [selectedSource, setSelectedSource] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [tableStructure, setTableStructure] = useState(null);
    const [calculatedIncome, setCalculatedIncome] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);

    const [filteredData, setFilteredData] = useState([]);

    const [dateState, setDateState] = useState([
        {
            startDate: "",
            endDate: "",
        },
    ]);



    useEffect(() => {
        const incomeSum = filteredData.reduce((sum, row) => sum + row.unloadingWeight * row.rate, 0);
        setTotalIncome(incomeSum);
        setTotalRounds(filteredData.length)
    }, [filteredData, setTotalIncome, setTotalRounds]);

    useEffect(() => {
        console.log(dateState, "date")
        if (dateState[0].startDate && dateState[0].endDate) setSelectedDate(true);
    }, [dateState])

    useEffect(() => {
        const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('-');
            return new Date(`${year}-${month}-${day}`); // Converts to yyyy-mm-dd format
        };

        const filteredData = incomeData?.filter((income) => {
            if (!selectedVehicle) return true; // If no vehicle is selected, include all rows

            const isVehicleNumberMatch = selectedVehicle === "All" || income.vehicleNumber === selectedVehicle;
            const isSourceDestinationMatch =
                selectedSource && selectedDestination
                    ? income.source === selectedSource && income.destination === selectedDestination
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
            return isVehicleNumberMatch && isSourceDestinationMatch && isDateInRange;
        }) || [];

        // Default to an empty array if incomeData is null or undefined

        const firstVehicle = incomeData?.[0];
        if (firstVehicle) {
            const { amount, id, ...incomeStructure } = firstVehicle;
            const emptyIncomeStructure = Object.keys(incomeStructure).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
            setTableStructure(emptyIncomeStructure);
        }

        const updatedFilteredDataWithId = filteredData.map((data, index) => ({
            ...data,
            id: index + 1, // Set custom id based on index
        }));
        setFilteredData(updatedFilteredDataWithId);
    }, [incomeData, selectedVehicle, selectedDate, selectedSource, selectedDestination, dateState]);


    const handleCalculatedIncome = (data) => {
        setCalculatedIncome(data);
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (row) => {
        console.log(row, "selected Row");
        const { dateValue, ...restRow } = row;
        console.log(dateValue, "DATE VALUE To EDiT");
        const { id, amount, ...updatedIncomeRow } = row; // Exclude `id` and `income`
        setSelectedRow(updatedIncomeRow); // Set the remaining properties
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };
    const handleFilterChange = (event) => {
        // console.log(event.target.value)
        setSelectedVehicle(event.target.value);
    };

    const handleSourceData = (event) => {
        setSelectedSource(event.target.value);
    };

    const handleDestinationData = (event) => {
        setSelectedDestination(event.target.value);
    };

    const handleUpdateDocument = (editedData) => {
        const updatedData = { ...editedData, amount: editedData.unloadingWeight * editedData.rate, }
        setIncomeData((prevVehicleData) =>
            prevVehicleData.map((v) => (v.id === updatedData.id ? updatedData : v))
        );
    };

    const handleDelete = (selectedData) => {
        const updatedData = incomeData.filter((data) => data !== selectedData)

        setIncomeData(updatedData);
    }
    const handleSaveDocument = (newData) => {
        console.log(newData);
        const processedData = {
            ...newData,
            id: incomeData.length + 1,               // Assign a unique id
            amount: newData.unloadingWeight * newData.rate,    // Calculate income dynamically
        };
        console.log(processedData, "processed data");
        setIncomeData((prevVehicleData) => [...prevVehicleData, processedData]);
    };


    const columns = [
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
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => { console.log("params: ", params); handleEdit(params.row) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { console.log("params: ", params); handleDelete(params.row) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div className="w-[100%] box-border">
            {
                filteredData && (
                    <div className='flex items-center justify-between bg-white shadow-lg p-4 border rounded-md'>

                        <h3 className='text-base font-normal'>No. of Rounds: <span className='text-xl font-medium'>{totalRounds}
                        </span></h3>
                        <h3 className='text-base font-normal'>Total Income Generated: <span className='text-xl font-medium'>
                            ₹{totalIncome}
                        </span> </h3>
                    </div>
                )
            }

            <div className=' '>
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

                        <Calendar dateState={dateState} setDateState={setDateState} />
                    </div>

                    <Button
                        variant="contained"
                        onClick={() => setIsAddModalOpen(true)}
                        startIcon={<AddIcon className='w-[5vmax] h-[5vmax]' />}
                        sx={{ height: '100%', fontSize: ".9vmax" }}
                    >
                        Add data
                    </Button>
                </div>

                {/* {
                    (selectedVehicle && selectedDate) && (<div className='flex items-center justify-between gap-4 pb-4 w-[60%]'>

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
                } */}
                <Box sx={{ width: '100%', height: "auto", maxHeight: "60vh", overflow: "auto" }}>

                    <DataGrid
                        rows={filteredData || []}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                        sx={{
                            fontSize: '.9vmax !important',
                            '& .MuiDataGrid-root': {
                                border: 0, // Removes the outer border
                                fontSize: "0.9vmax ", // Scales font size for responsiveness
                                fontFamily: "Inter, sans-serif", // Consistent font family
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f5f5', // Light gray header background
                                color: '#333', // Dark text for better readability
                                fontSize: "1vmax",
                                fontWeight: 'bold', // Makes headers stand out
                                borderBottom: '1px solid #ddd', // 


                            },
                            '& .MuiDataGrid-columnSeparator': {
                                display: 'none', // Removes separators between column headers
                            },
                            '& .MuiDataGrid-row': {
                                '&:hover': {
                                    backgroundColor: '#fafafa', // Subtle row hover effect
                                },
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #eee', // Light bottom border for rows

                                padding: '0 .5vmax', // Adds cell padding
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#f9f9f9', // Footer background
                                borderTop: '1px solid #ddd', // Top border for separation
                            },
                            '& .MuiCheckbox-root': {
                                color: '#333', // Checkbox color
                                width: "1vmax",
                                height: "1vmax"
                            },
                            '& .MuiDataGrid-toolbarContainer': {
                                padding: '0.5vmax', // Toolbar padding
                            },
                        }}
                    />

                </Box>
            </div>

            {selectedRow && (
                <IncomeModal
                    modalTitle="Edit Document"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleUpdateDocument}
                    structure={selectedRow}
                    optionList={vehicleData}
                />
            )}

            {isAddModalOpen && (
                <IncomeModal
                    modalTitle="Add a New Income"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    structure={tableStructure}
                    optionList={vehicleData}
                    onSave={handleSaveDocument}
                />
            )}


        </div>
    );
};

export default Income;
