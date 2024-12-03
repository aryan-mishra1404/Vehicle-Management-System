import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/Modal';

const initialDocuments = [
    {
        id: 1,
        document: "Registration Certificate",
        vehicle: "UP01RS4321",
        lastIssueDate: "2024-01-10",
        expiryDate: "2025-01-10",
        amountPaid: "$150",
    },
    {
        id: 2,
        document: "Insurance Policy",
        vehicle: "UP32GH5678",
        lastIssueDate: "2024-02-15",
        expiryDate: "2025-02-15",
        amountPaid: "$200",
    },
    {
        id: 3,
        document: "Pollution Certificate",
        vehicle: "UP01RS4321",
        lastIssueDate: "2024-03-20",
        expiryDate: "2025-03-20",
        amountPaid: "$50",
    },
    {
        id: 4,
        document: "Ownership Transfer",
        vehicle: "MH12AB1234",
        lastIssueDate: "2024-04-05",
        expiryDate: "2025-04-05",
        amountPaid: "$100",
    },
    {
        id: 5,
        document: "Fitness Certificate",
        vehicle: "UP32GH5678",
        lastIssueDate: "2024-05-25",
        expiryDate: "2025-05-25",
        amountPaid: "$300",
    },
    {
        id: 6,
        document: "Road Tax",
        vehicle: "MH12AB1234",
        lastIssueDate: "2024-05-25",
        expiryDate: "2025-05-25",
        amountPaid: "$300",
    },

];
const DocumentList = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(initialDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDocument, setFilterDocument] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [documentStructure, setDocumentStructure] = useState(null);
    const vehicleOptions = ['MH12AB1234', 'UP01RS4321', 'UP32GH5678'];

    useEffect(() => {
        // Take the first vehicle object from the state
        const firstVehicle = documents[0];

        // If there's a vehicle in the state
        if (firstVehicle) {
            // Create a new object where all the fields of the first vehicle are set to ""
            const emptyVehicle = Object.keys(firstVehicle).reduce((acc, key) => {
                acc[key] = "";  // Set each key's value to an empty string
                return acc;
            }, {});

            // Update vehicle structure with the modified first vehicle (with empty values)
            setDocumentStructure(emptyVehicle);
        }
    }, [documents]);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleEdit = (document) => {
        setSelectedDocument(document);
        setIsModalOpen(true);
    };

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilterDocument(event.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDocument(null);
    };

    const handleSaveDocument = (editedDocument) => {
        setDocuments((prevDocuments) =>
            prevDocuments.map((v) => (v.id === editedDocument.id ? editedDocument : v))
        );
    };

    const filteredDocuments = documents.filter((document) => { return document }
        // document?.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        // (filterDocument === '' || document.vehicleName === filterDocument)
    );



    const columns = [
        { field: 'id', headerName: 'Sl', flex: .5 },
        { field: 'document', headerName: 'Document', flex: 1 },
        {
            field: 'vehicle',
            headerName: 'Vehicle',
            width: 200,
            sortable: true,
        },
        { field: 'lastIssueDate', headerName: 'Last issue date', flex: 1 },
        { field: 'expiryDate', headerName: 'Expiry date', flex: 1 },
        { field: 'amountPaid', headerName: 'Amount paid', flex: 1 },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
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
            ),
        },
    ];



    // const filteredRows = rows.filter((row) => row.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()));

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
                    <InputLabel id="filter-vehicle-label">Vehicles</InputLabel>
                    <Select
                        labelId="filter-vehicle-label"
                        value={filterDocument}
                        label="Vehicle"
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
                    Add document
                </Button>
            </div>
            <div className='shadow-lg mt-4'>
                <Box>

                    <DataGrid
                        rows={filteredDocuments}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
                {selectedDocument && (
                    <ModalComponent
                        modalTitle="Edit Document"
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        structure={selectedDocument}
                        onSave={handleSaveDocument}
                    />
                )}

                {isAddModalOpen && (
                    <ModalComponent
                        modalTitle="Add a New Document"
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                        structure={documentStructure}
                        onSave={handleSaveDocument}
                    />
                )}

            </div>
        </div>
    );
};

export default DocumentList;
