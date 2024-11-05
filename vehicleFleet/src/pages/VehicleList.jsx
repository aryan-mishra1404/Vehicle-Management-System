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

const initialVehicles = [
    { id: 1, name: 'Suzuki Curry', type: 'Pick Up', department: 'Administration', date: '2025-06-25', ownership: 'Own', vendor: 'Notável Binário-Unipessoal' },
    { id: 2, name: 'Mazda-88814', type: 'Saloon Car', department: 'Sales', date: '1992-06-10', ownership: 'Laii', vendor: 'Karim Cars' },
    { id: 3, name: 'Cadillac-95769', type: 'TATA SCHOOL BUS 0017', department: 'Customer Service', date: '2016-03-29', ownership: 'Own', vendor: 'Saeed Brothers' },
    { id: 4, name: 'Cadillac-32003', type: 'Van', department: 'IT', date: '1972-06-07', ownership: 'Third Party Financed', vendor: 'Ali Traders' },
    { id: 5, name: 'Buick-14376', type: 'Others', department: 'Quality Control', date: '2006-02-07', ownership: 'Rented Own', vendor: 'C.K. MOTORS' },
    { id: 6, name: 'Porsche-12325', type: 'Pick Up', department: 'Quality Control', date: '2000-07-18', ownership: 'Leased', vendor: 'Karim Cars' },
    { id: 7, name: 'Lexus-49180', type: 'Others', department: 'Quality Control', date: '1983-05-07', ownership: 'Own', vendor: 'Saeed Brothers' },
    { id: 8, name: 'Infiniti-46968', type: 'Motorcycle', department: 'IT', date: '1982-04-19', ownership: 'Own', vendor: 'N/A' },
];
const VehicleList = () => {
    // const navigate = useNavigate();
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [vehicleStructure, setVehicleStructure] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

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

    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterDepartment === '' || vehicle.department === filterDepartment)
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
        { field: 'id', headerName: 'Sl', width: 70 },
        {
            field: 'name', headerName: 'Name', width: 150, renderCell: (params) => (
                <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                // onClick={() => navigate(`/vehicle/${params.row.id}`)}
                >
                    {params.value}
                </span>
            ),
        },
        { field: 'type', headerName: 'Vehicle type', width: 150 },
        { field: 'department', headerName: 'Department', width: 150 },
        { field: 'date', headerName: 'Registration date', width: 150 },
        { field: 'ownership', headerName: 'Ownership', width: 150 },
        { field: 'vendor', headerName: 'Vendor', width: 200 },
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
        <div className='w-[86%] h-full flex justify-center pt-[5vmax] box-border'>
            <Box sx={{ height: 550 }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="filter-department-label">Department</InputLabel>
                            <Select
                                labelId="filter-department-label"
                                value={filterDepartment}
                                label="Department"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Administration">Administration</MenuItem>
                                <MenuItem value="Sales">Sales</MenuItem>
                                <MenuItem value="Customer Service">Customer Service</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                                <MenuItem value="Quality Control">Quality Control</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={() => setIsAddModalOpen(true)} variant="contained" startIcon={<AddIcon />} sx={{ height: '100%' }}>
                            Add vehicle
                        </Button>
                    </Grid>
                </Grid>
                <DataGrid
                    rows={filteredVehicles}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </Box>
            {selectedVehicle && (
                <ModalComponent
                    modalTitle="Edit Vehicle"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    vehicle={selectedVehicle}
                    onSave={handleSaveVehicle}
                />
            )}

            {isAddModalOpen && (
                <ModalComponent
                    modalTitle="Add a New Vehicle"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    vehicle={vehicleStructure}
                    onSave={handleSaveVehicle}
                />
            )}
        </div>
    );
};

export default VehicleList;