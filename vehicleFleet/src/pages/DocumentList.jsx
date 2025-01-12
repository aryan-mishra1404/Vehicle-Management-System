import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import NewModal from '../components/NewModal';
import { differenceInDays, differenceInMonths, parseISO } from 'date-fns';

const initialDocuments = [
    {
        id: 1,
        vehicle: "UP01RS4321",
        document: "Registration Certificate (RC)",
        lastIssueDate: "10-01-2024", // Issue date
        expiryDate: "10-04-2025",    // 12 months later
        amountPaid: "150",
    },
    {
        id: 2,
        vehicle: "UP32GH5678",
        document: "Insurance Policy",
        lastIssueDate: "15-02-2024", // Issue date
        expiryDate: "15-02-2025",    // 6 months later
        amountPaid: "200",
    },
    {
        id: 3,
        vehicle: "UP01RS4321",
        document: "Pollution Under Control (PUC) Certificate",
        lastIssueDate: "20-03-2024", // Issue date
        expiryDate: "10-02-2025",    // 6 months later
        amountPaid: "50",
    },
    {
        id: 4,
        vehicle: "MH12AB1234",
        document: "Vehicle Permit",
        lastIssueDate: "05-04-2024", // Issue date
        expiryDate: "05-05-2025",    // 6 months later
        amountPaid: "100",
    },
    {
        id: 5,
        vehicle: "UP32GH5678",
        document: "Fitness Certificate",
        lastIssueDate: "25-05-2024", // Issue date
        expiryDate: "25-05-2025",    // 12 months later
        amountPaid: "300",
    },
    {
        id: 6,
        vehicle: "MH12AB1234",
        document: "Road Tax Certificate",
        lastIssueDate: "25-06-2024", // Issue date
        expiryDate: "25-12-2024",    // 6 months later
        amountPaid: "300",
    },
];

const DocumentList = () => {

    const dispatch = useDispatch();
    const { vehicleData } = useSelector((state) => state.vehicleData);

    const [documents, setDocuments] = useState(initialDocuments);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterByVehicle, setFilterByVehicle] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [documentStructure, setDocumentStructure] = useState(null);

    useEffect(() => {
        //Document Structure
        const firstDocument = documents[0];
        if (firstDocument) {
            const emptyVehicle = Object.keys(firstDocument).reduce((acc, key) => {
                acc[key] = "";
                return acc;
            }, {});

            console.log(emptyVehicle, "  structure!!")
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
        setFilterByVehicle(event.target.value);
    };

    useEffect(() => {
        const filteredDocuments = documents.filter((doc) => {
            return (
                Object.values(doc).some(value =>
                    value?.toString().toLowerCase().includes(searchTerm?.toLowerCase())
                ) &&
                (filterByVehicle === '' || filterByVehicle === 'All' || doc?.vehicle === filterByVehicle)
            );

        });

        // Map over the filtered vehicles and assign a custom `id` based on the index
        const updatedDocumentsWithId = filteredDocuments.map((doc, index) => ({
            ...doc,
            id: index + 1, // Set custom id based on index
        }));

        // Update state with vehicles that now have custom IDs
        setFilteredDocuments(updatedDocumentsWithId);
    }, [searchTerm, filterByVehicle, documents]);
    const handleDelete = (selected) => {
        setDocuments((prevDocument) =>
            prevDocument.filter((doc) => (doc.document !== selected.document))
        );
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDocument(null);
    };

    const handleAddDocument = (newDocument) => {
        setDocuments((prevDocument) => {
            const newDocumentWithId = {
                ...newDocument,
                id: prevDocument.length + 1 // Add an `id` based on the current length
            };
            return [...prevDocument, newDocumentWithId];
        });
    };
    const handleSaveDocument = (editedDocument) => {
        setDocuments((prevDocuments) =>
            prevDocuments.map((doc) => (doc.id === selectedDocument.id ? editedDocument : doc))
        );
    };


    const columns = [
        { field: 'id', headerName: 'S.No', flex: 0.5 },
        {
            field: 'vehicle',
            headerName: 'Vehicle',
            width: 200,
            sortable: true,
        },
        { field: 'document', headerName: 'Document', flex: 1 },
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
                    <IconButton color="error" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    // Helper function to calculate the difference in months
    const isRowExpiringSoon = (expiryDate) => {
        if (!expiryDate) return false;

        const [day, month, year] = expiryDate.split('-').map(Number);
        const expiry = new Date(year, month - 1, day);

        const today = new Date();

        const diff = differenceInDays(expiry, today) <= 30;
        console.log(today, " - ", expiry, " = ", diff);
        return diff;
    };


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
                        value={filterByVehicle}
                        label="Vehicle"
                        sx={{
                            display: "block", width: "20vmax", height: "3vmax",
                            backgroundColor: "white",
                            fontSize: "1vmax",
                        }}
                        onChange={handleFilterChange}
                    >

                        {vehicleData?.Vehicles?.map((option) => (
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
                        getRowClassName={(params) =>
                            isRowExpiringSoon(params.row.expiryDate)
                                ? 'bg-red-300 text-black font-medium'
                                : ''
                        }
                    />
                </Box>;
                {selectedDocument && (
                    <NewModal
                        modalTitle="Edit Document"
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        structure={selectedDocument}
                        optionList={vehicleData}
                        onSave={handleSaveDocument}
                    />
                )}

                {isAddModalOpen && (
                    <NewModal
                        modalTitle="Add a New Document"
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(!isAddModalOpen)}
                        structure={documentStructure}
                        optionList={vehicleData}
                        onSave={handleAddDocument}
                    />
                )}

            </div>
        </div>
    );
};

export default DocumentList;
