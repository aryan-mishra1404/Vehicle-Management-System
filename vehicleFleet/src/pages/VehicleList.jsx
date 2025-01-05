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
import NewModal from '../components/NewModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateVehicleData } from '../Redux/VehicleDataSlice';
const initialVehicleData = [
    {
        id: 1, // Add unique ID here
        date: "01-12-2024",
        newVehicle: "UP01RS4321",
        chassisNumber: "XYZ5678",
        capacity: 55,
        ownership: "Gopal Logistic",
    },
    {
        id: 2, // Add unique ID here
        date: "02-12-2024",
        newVehicle: "UP32GH5678",
        chassisNumber: "LMN1234",
        capacity: 55,
        ownership: "Sheetal Meel",
    },
    {
        id: 3, // Add unique ID here
        date: "03-12-2024",
        newVehicle: "MH12AB1234",
        chassisNumber: "OPQ3456",
        capacity: 70,
        ownership: "RK Sharma",
    },
    {
        id: 4, // Add unique ID here
        date: "04-12-2024",
        newVehicle: "DL12EF9876",
        chassisNumber: "JKL7890",
        capacity: 60,
        ownership: "Anil Mishra",
    },
    {
        id: 5, // Add unique ID here
        date: "05-12-2024",
        newVehicle: "TN23JK4567",
        chassisNumber: "DEF2345",
        capacity: 65,
        ownership: "Gopal Logistic",
    },
    {
        id: 6, // Add unique ID here
        date: "07-12-2024",
        newVehicle: "RJ13TX2718",
        chassisNumber: "CXA3294",
        capacity: 55,
        ownership: "Anil Mishra",
    },
];


const VehicleList = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { vehicleData } = useSelector((state) => state.vehicleData);

    const [vehicles, setVehicles] = useState(initialVehicleData);
    const [vehicleStructure, setVehicleStructure] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterOwnership, setFilterOwnership] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [filteredVehicles, setFilteredVehicles] = useState({});

    useEffect(() => {
        // vehicleStructure
        const firstVehicle = vehicles[0];
        if (firstVehicle) {
            const emptyVehicle = Object.keys(firstVehicle).reduce((acc, key) => {
                acc[key] = "";
                return acc;
            }, {});
            setVehicleStructure(emptyVehicle);
        }

        // updating VehicleList
        const vehiclesListSet = new Set();
        const ownersListSet = new Set();

        vehicles.forEach((vehicle) => {
            vehiclesListSet.add(vehicle.newVehicle);
            ownersListSet.add(vehicle.ownership);
        });

        // Retrieve previous state values for Vehicles and Owners
        const { Vehicles: prevVehicles = [], Owners: prevOwners = [] } = vehicleData;

        // Ensure "All" is included if previous arrays are empty
        const mergedVehiclesListSet = new Set([
            ...(prevVehicles.length > 0 ? prevVehicles : ["All"]),
            ...Array.from(vehiclesListSet),
        ]);

        const mergedOwnersListSet = new Set([
            ...(prevOwners.length > 0 ? prevOwners : ["All"]),
            ...Array.from(ownersListSet),
        ]);

        // Convert to arrays (no need to add "All" again as it's handled in the condition above)
        const uniqueVehiclesListArray = [...Array.from(mergedVehiclesListSet)];
        const uniqueOwnersListArray = [...Array.from(mergedOwnersListSet)];

        // Dispatch the updated data
        dispatch(updateVehicleData({ Vehicles: uniqueVehiclesListArray, Owners: uniqueOwnersListArray }));
    }, [dispatch, vehicles]);


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterOwnership(event.target.value);
    };

    useEffect(() => {
        const filteredVehicles = vehicles.filter((vehicle) => {
            return (
                Object.values(vehicle).some(value =>
                    value?.toString().toLowerCase().includes(searchTerm?.toLowerCase())
                )
                &&
                (filterOwnership === '' || filterOwnership === 'All' || vehicle?.ownership === filterOwnership)
            );
        });

        // Map over the filtered vehicles and assign a custom `id` based on the index
        const updatedVehiclesWithId = filteredVehicles.map((vehicle, index) => ({
            ...vehicle,
            id: index + 1, // Set custom id based on index
        }));

        // Update state with vehicles that now have custom IDs
        setFilteredVehicles(updatedVehiclesWithId);
    }, [searchTerm, filterOwnership, vehicles]);

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalOpen(true);
    };

    const handleDelete = (selected) => {
        setVehicles((prevVehicles) =>
            prevVehicles.filter((v) => (v.newVehicle !== selected.newVehicle))
        );
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVehicle(null);
    };

    const handleAddVehicle = (newVehicle) => {
        setVehicles((prevVehicles) => {
            const newVehicleWithId = {
                ...newVehicle,
                id: prevVehicles.length + 1 // Add an `id` based on the current length
            };
            return [...prevVehicles, newVehicleWithId];
        });
    };
    const handleSaveVehicle = (editedVehicle) => {
        setVehicles((prevVehicles) =>
            prevVehicles.map((v) => (v.id === selectedVehicle.id ? editedVehicle : v))
        );
    };

    const columns = [
        { field: 'id', headerName: 'S.No', flex: .5 },
        { field: 'date', headerName: 'Registration Date', flex: 1 },
        {
            field: 'newVehicle', headerName: 'Vehicle', flex: 1, renderCell: (params) => (
                <span
                    style={{ cursor: 'pointer' }}
                // onClick={() => navigate(`/vehicle/${params.row.id}`)}
                >
                    {params.value}
                </span>
            ),
        },
        { field: 'chassisNumber', headerName: 'Chassis Number', flex: 1 },
        { field: 'capacity', headerName: 'Capacity', flex: 1 },

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
                    <IconButton color="error" onClick={() => handleDelete(params.row)}>
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
                    <InputLabel id="filter-department-label">Ownership</InputLabel>
                    <Select
                        labelId="filter-ownership-label"
                        value={filterOwnership}
                        label="Ownership"
                        sx={{
                            display: "block", width: "20vmax", height: "2.8vmax",
                            backgroundColor: "white",
                            fontSize: "1vmax",
                        }}
                        onChange={handleFilterChange}
                    >

                        {vehicleData?.Owners.map((option) => (
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
                <NewModal
                    modalTitle="Edit Vehicle"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    structure={selectedVehicle}
                    optionList={vehicleData}
                    onSave={handleSaveVehicle}
                />
            )}

            {isAddModalOpen && (
                <NewModal
                    modalTitle="Add a New Vehicle"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    structure={vehicleStructure}
                    optionList={vehicleData}
                    onSave={handleAddVehicle}
                />
            )}
        </div>
    );
};

export default VehicleList;