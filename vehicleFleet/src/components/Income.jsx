import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/Modal';
import Calendar from './Calendar';

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
    const [selectedDate, setSelectedDate] = useState('h');

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
    }, [filteredData]);


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
            const emptyVehicle = Object.keys(firstVehicle).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
            setTableStructure(emptyVehicle);
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
        setSelectedRow(row);
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
        setVehicleData((prevVehicleData) =>
            prevVehicleData.map((v) => (v.id === editedData.id ? editedData : v))
        );
    };

    const handleDelete = (selectedData) => {
        const updatedData = vehicleData.filter((data) => data !== selectedData)

        setVehicleData(updatedData);
    }
    const handleSaveDocument = (newData) => {
        const newDocument = { ...newData, id: vehicleData.length + 1 }; // Add a unique id
        setVehicleData((prevVehicleData) => [...prevVehicleData, newDocument]);
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
                        startIcon={<AddIcon />}
                        sx={{ height: '100%' }}
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

            {selectedRow && (
                <ModalComponent
                    modalTitle="Edit Document"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    vehicle={selectedRow}
                    onSave={handleUpdateDocument}
                />
            )}

            {isAddModalOpen && (
                <ModalComponent
                    modalTitle="Add a New Document"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    vehicle={tableStructure}
                    onSave={handleSaveDocument}
                />
            )}
        </div>
    );
};

export default Income;
