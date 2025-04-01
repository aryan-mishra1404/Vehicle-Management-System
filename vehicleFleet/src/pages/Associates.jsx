import { useEffect, useState } from 'react';
import {
    TextField,
    Button,
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
import NewModal from '../components/NewModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateVehicleData } from '../Redux/VehicleDataSlice';
import { addAssociates, getAssociates } from '../api/AssociateApi';
// import { updateAssociateData } from '../Redux/AssociateDataSlice';



const AssociateList = () => {
    const dispatch = useDispatch();
    const { vehicleData } = useSelector((state) => state.vehicleData);

    const [associates, setAssociates] = useState(null);
    const [associateStructure, setAssociateStructure] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterName, setFilterName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedAssociate, setSelectedAssociate] = useState(null);
    const [filteredAssociates, setFilteredAssociates] = useState({});

    const getAssoicatesList = async () => {
        const response = await getAssociates();
        console.log(response);
        if (response) {
            setAssociates(response?.data)
        }
    }

    useEffect(() => {
        getAssoicatesList();
    }, [])

    useEffect(() => {
        const firstAssociate = { id: "", name: "", profession: "", vehicleNumber: "" };
        if (firstAssociate) {
            const emptyAssociate = Object.keys(firstAssociate).reduce((acc, key) => {
                acc[key] = "";
                return acc;
            }, {});
            setAssociateStructure(emptyAssociate);
        }

        // Extract names for dropdown filter
        const namesSet = new Set();
        associates?.forEach((associate) => {
            namesSet.add(associate.name);
        });

        // Get previous names list
        const prevNames = vehicleData.Owners ?? ["All"];

        // Merge previous and current names, ensuring "All" is included
        const mergedNamesSet = new Set([
            ...prevNames,                // Include existing owners
            ...Array.from(namesSet),     // Include new names from associates
            "All"                        // Ensure "All" is always included
        ]);

        const uniqueNamesListArray = [...Array.from(mergedNamesSet)];

        console.log(uniqueNamesListArray);
        // Dispatch updated data
        dispatch(updateVehicleData({ Owners: uniqueNamesListArray }));
    }, [dispatch, associates]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterName(event.target.value);
    };

    useEffect(() => {
        const filtered = associates?.filter((associate) => {
            return (
                Object.values(associate).some(value =>
                    value?.toString().toLowerCase().includes(searchTerm?.toLowerCase())
                ) &&
                (filterName === '' || filterName === 'All' || associate?.name === filterName)
            );
        });

        // Add custom IDs for consistent rendering
        const updatedAssociatesWithId = filtered?.map((associate, index) => ({
            ...associate,
            id: index + 1,
        }));

        setFilteredAssociates(updatedAssociatesWithId);
    }, [searchTerm, filterName, associates]);

    const handleEdit = (associate) => {
        setSelectedAssociate(associate);
        setIsModalOpen(true);
    };

    const handleDelete = (selected) => {
        setAssociates((prev) =>
            prev.filter((a) => a.name !== selected.name)
        );
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAssociate(null);
    };

    const handleAddAssociate = async (newAssociate) => {

        console.log("New Associates:: ", newAssociate);
        const { id, ...data } = newAssociate
        console.log(data);

        const response = await addAssociates(data);
        if (response) {
            getAssoicatesList();
        }

        setAssociates((prev) => {
            const newAssociateWithId = {
                ...newAssociate,
                id: prev.length + 1
            };
            return [...prev, newAssociateWithId];
        });
    };

    const handleSaveAssociate = (editedAssociate) => {
        setAssociates((prev) =>
            prev.map((a) => (a.id === selectedAssociate.id ? editedAssociate : a))
        );
    };

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 0.5 },
        { field: 'name', headerName: 'Associate Name', flex: 1 },
        { field: 'profession', headerName: 'Profession', flex: 1 },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
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
                            '& .MuiOutlinedInput-notchedOutline': {
                                top: '-5px',
                                height: "3vmax",
                            },
                            '& fieldset': {
                                height: '3vmax',
                            },
                            '& .MuiInputBase-input': {
                                height: "3vmax",
                                margin: "0",
                            },
                            '& .MuiOutlinedInput-input': {
                                fontSize: '1vmax',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: '1vmax',
                        },
                    }}
                />

                <FormControl>
                    <InputLabel id="filter-name-label">Associates</InputLabel>
                    <Select
                        labelId="filter-name-label"
                        value={filterName}
                        label="Associates"
                        sx={{
                            display: "block",
                            width: "20vmax",
                            height: "2.8vmax",
                            backgroundColor: "white",
                            fontSize: "1vmax",
                        }}
                        onChange={handleFilterChange}
                    >
                        {associates?.map((associate) => (
                            <MenuItem key={associate?._id} value={associate?.id}>
                                {associate?.name}
                            </MenuItem>
                        ))}
                        {/* {vehicleData?.Owners.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))} */}
                    </Select>
                </FormControl>

                <Button onClick={() => setIsAddModalOpen(true)} variant="contained" startIcon={<AddIcon />} sx={{ height: '100%' }}>
                    Add Associate
                </Button>
            </div>

            <div className='shadow-lg mt-4'>
                <Box>
                    <DataGrid
                        rows={filteredAssociates}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        rowsPerPageOptions={[5, 10, 20]}
                    />
                </Box>
            </div>

            {selectedAssociate && (
                <NewModal
                    modalTitle="Edit Associate"
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    structure={selectedAssociate}
                    optionList={vehicleData}
                    onSave={handleSaveAssociate}
                />
            )}

            {isAddModalOpen && (
                <NewModal
                    modalTitle="Add a New Associate"
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                    structure={associateStructure}
                    optionList={vehicleData}
                    onSave={handleAddAssociate}
                />
            )}
        </div>
    );
};

export default AssociateList;
