import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/Modal';
import Calendar from './Calendar';

import * as XLSX from 'xlsx'; // Import xlsx library

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


const Income = ({ totalIncome, setTotalIncome, totalRounds, setTotalRounds }) => {
    const [vehicleData, setVehicleData] = useState(initialVehicleData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

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
            endDate: "", // Set a default endDate
            key: "selection",
        },
    ]);

    useEffect(() => {
        const incomeSum = filteredData.reduce((sum, row) => sum + row.weight * row.rate, 0);
        setTotalIncome(incomeSum);
        setTotalRounds(filteredData.length)
    }, [filteredData, setTotalIncome, setTotalRounds]);


    useEffect(() => {
        const filteredData = vehicleData?.filter((document) => {
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

        // Default to an empty array if vehicleData is null or undefined

        const firstVehicle = vehicleData?.[0];
        if (firstVehicle) {
            const { income, id, ...incomeStructure } = firstVehicle;
            const emptyIncomeStructure = Object.keys(incomeStructure).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
            setTableStructure(emptyIncomeStructure);
        }
        setFilteredData(filteredData);
    }, [vehicleData, selectedVehicle, selectedDate, selectedSource, selectedDestination, dateState]);


    const handleCalculatedIncome = (data) => {
        setCalculatedIncome(data);
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (row) => {
        console.log(row, "selected Row");
        // const { id, income, ...updatedVehicleRow } = row; // Exclude `id` and `income`
        setSelectedRow(row); // Set the remaining properties
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };
    const handleFilterChange = (event) => {
        setSelectedVehicle(event.target.value);
    };

    const handleSourceData = (event) => {
        setSelectedSource(event.target.value);
    };

    const handleDestinationData = (event) => {
        setSelectedDestination(event.target.value);
    };

    const handleUpdateDocument = (editedData) => {
        const updatedData = { ...editedData, income: editedData.weight * editedData.rate, }
        setVehicleData((prevVehicleData) =>
            prevVehicleData.map((v) => (v.id === updatedData.id ? updatedData : v))
        );
    };

    const handleDelete = (selectedData) => {
        const updatedData = vehicleData.filter((data) => data !== selectedData)

        setVehicleData(updatedData);
    }
    const handleSaveDocument = (newData) => {
        console.log(newData);
        const processedData = {
            ...newData,
            id: vehicleData.length + 1,               // Assign a unique id
            income: newData.weight * newData.rate,    // Calculate income dynamically
        };
        console.log(processedData, "processed data");
        setVehicleData((prevVehicleData) => [...prevVehicleData, processedData]);
    };


    const columns = [
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
                        onClick={() => setIsAddModalOpen(true)}
                        startIcon={<AddIcon className='w-[5vmax] h-[5vmax]' />}
                        sx={{ height: '100%', fontSize: ".9vmax" }}
                    >
                        Add data
                    </Button>
                </div>

                {
                    (selectedVehicle && selectedDate) && (<div className='flex items-center justify-between gap-4 pb-4'>

                        <FormControl fullWidth>
                            <InputLabel id="filter-source-label">Source</InputLabel>
                            <Select
                                sx={{ height: "3vmax", backgroundColor: "white", fontSize: ".9vmax" }}
                                labelId="filter-source-label"
                                value={selectedSource}
                                label="Source"
                                onChange={handleSourceData}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Jaipur">Jaipur</MenuItem>
                                <MenuItem value="Kolkata">Kolkata</MenuItem>
                                <MenuItem value="Chennai">Chennai</MenuItem>
                                <MenuItem value="Delhi">Delhi</MenuItem>
                                <MenuItem value="Lucknow">Lucknow</MenuItem>
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
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                                <MenuItem value="Noida">Noida</MenuItem>
                                <MenuItem value="Kanpur">Kanpur</MenuItem>
                                <MenuItem value="Howrah">Howrah</MenuItem>
                                <MenuItem value="Ajmer">Ajmer</MenuItem>
                            </Select>
                        </FormControl> </div>)
                }
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
                <ModalComponent
                    modalTitle="Edit Document"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    vehicle={selectedRow}
                    vehicles={['MH12AB1234', 'UP01RS4321', 'UP32GH5678']}
                    onSave={handleUpdateDocument}
                />
            )}

            {isAddModalOpen && (
                <ModalComponent
                    modalTitle="Add a New Document"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    structure={tableStructure}
                    vehicles={['MH12AB1234', 'UP01RS4321', 'UP32GH5678']}
                    onSave={handleSaveDocument}
                />
            )}
        </div>
    );
};

export default Income;
