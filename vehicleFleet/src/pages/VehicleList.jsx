import { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    IconButton,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/Modal';
const initialVehicleData = [
    {
        id: 1,
        date: "2024-12-01",
        vehicle: "UP01RS4321",
        chassisNumber: "XYZ5678",
        ownership: "Self",
    },
    {
        id: 2,
        date: "2024-12-02",
        vehicle: "UP32GH5678",
        chassisNumber: "LMN1234",
        ownership: "Sheetal Meel",
    },
    {
        id: 3,
        date: "2024-12-03",
        vehicle: "MH12AB1234",
        chassisNumber: "OPQ3456",
        ownership: "SM Sharma",
    },

];
const VehicleList = () => {
    // const navigate = useNavigate();
    const [vehicles, setVehicles] = useState(initialVehicleData);
    const [vehicleStructure, setVehicleStructure] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const vehicleOptions = ['MH12AB1234', 'UP01RS4321', 'UP32GH5678'];
    useEffect(() => {
        // Take the first vehicle object from the state
        const firstVehicle = vehicles[0];

        // If there's a vehicle in the state
        if (firstVehicle) {
            // Create a new object where all the fields of the first vehicle are set to ""
            const emptyVehicle = Object.keys(firstVehicle).reduce((acc, key) => {
                acc[key] = "";  // Set each key's value to an empty string
                return acc;
            }, {});
            console.log(emptyVehicle)

            // Update vehicle structure with the modified first vehicle (with empty values)
            setVehicleStructure(emptyVehicle);
        }
    }, [vehicles]);  // Run this effect whenever `vehicles` state changes
    // Re-run this effect whenever the vehicles array changes

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterDepartment(event.target.value);
    };

    const filteredVehicles = vehicles.filter((vehicle) => { return vehicle; }
        // vehicle?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
        // &&
        //     (filterDepartment === '' || vehicle.department === filterDepartment)
    );

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVehicle(null);
    };

    const handleSaveVehicle = (editedVehicle) => {
        setVehicles((prevVehicles) =>
            prevVehicles.map((v) => (v.id === editedVehicle.id ? editedVehicle : v))
        );
    };

    const columns = [
        { field: 'id', headerName: 'Sl', flex: .5 },
        { field: 'date', headerName: 'Registration Date', flex: 1 },
        {
            field: 'vehicle', headerName: 'Vehicle Number', flex: 1, renderCell: (params) => (
                <span
                    style={{ cursor: 'pointer' }}
                // onClick={() => navigate(`/vehicle/${params.row.id}`)}
                >
                    {params.value}
                </span>
            ),
        },
        { field: 'chassisNumber', headerName: 'Chassis Number', flex: 1 },

        { field: 'ownership', headerName: 'Ownership', flex: 1 },
        {
            field: 'actions',
            headerName: 'Action',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <div className="px-[6vmax] w-[86%] pt-[2vmax] bg-secondary text-primaryColor h-[92vh] overflow-hidden box-border">
            <div className='flex items-center justify-between'>




                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{

                        backgroundColor: "white",
                        width: "35%",
                        fontSize: "1vmax",
                        '& .MuiOutlinedInput-root': {
                            // height: "5vmax",
                            '& .MuiOutlinedInput-notchedOutline': {
                                top: '-5px',
                                height: "3vmax",

                            },
                            '& fieldset': {
                                height: '3vmax',
                            },
                            '& .MuiInputBase-input': {

                                // paddingTop: '1.5vmax',
                                // top: '-.9vmax',
                                height: "3vmax",
                                margin: "0",

                                // fontSize: '1vmax',   // Change font size of the input content
                                // color: 'blue',       // Set text color
                                // paddingLeft: '10px', // Add padding to the left of the input content
                            },
                            '& .MuiOutlinedInput-input': {
                                // paddingTop: '1.5vmax',
                                fontSize: '1vmax',  // Change input content font size

                            },
                        },
                        '& .MuiInputLabel-root': {

                            // bottom: "2vmax",
                            fontSize: '1vmax',

                            // Bottom: "7.5vmax",

                        },
                        '& .MuiInputLabel-root.css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root': {
                            top: '-.25vmax !important',
                            fontSize: "1vmax !important",
                        },

                    }}
                />
                <FormControl
                >
                    <InputLabel id="filter-department-label">Vehicles</InputLabel>
                    <Select
                        labelId="filter-department-label"
                        value={filterDepartment}
                        label="Department"
                        sx={{
                            display: "block", width: "20vmax", height: "3vmax",
                            backgroundColor: "white",
                            fontSize: "1vmax",
                        }}
                        onChange={handleFilterChange}
                    >

                        {vehicleOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button onClick={() => setIsAddModalOpen(true)} variant="contained" startIcon={<AddIcon />} sx={{ height: '100%' }}>
                    Add vehicle
                </Button>
            </div>
            <div className='shadow-lg mt-4'>


                <Box >
                    <DataGrid
                        rows={filteredVehicles}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        rowsPerPageOptions={[5, 10, 20]}
                    />
                </Box>
            </div>
            {selectedVehicle && (
                <ModalComponent
                    modalTitle="Edit Vehicle"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    structure={selectedVehicle}
                    onSave={handleSaveVehicle}
                />
            )}

            {isAddModalOpen && (
                <ModalComponent
                    modalTitle="Add a New Vehicle"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    structure={vehicleStructure}
                    // vehicles={vehicleOptions}
                    onSave={handleSaveVehicle}
                />
            )}
        </div>
    );
};

export default VehicleList;