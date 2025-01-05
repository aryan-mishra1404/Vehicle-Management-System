import React, { useState } from 'react';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialDestinations = [
    { id: 1, name: 'Delivery Center A', location: 'City X' },
    { id: 2, name: 'Delivery Center B', location: 'City Y' },
];

const DestinationsList = () => {
    const [destinations, setDestinations] = useState(initialDestinations);
    const [openModal, setOpenModal] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);
    const [formData, setFormData] = useState({ name: '', location: '' });

    const handleOpenModal = (destination = null) => {
        setEditingDestination(destination);
        setFormData(destination || { name: '', location: '' });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingDestination(null);
        setFormData({ name: '', location: '' });
    };

    const handleSaveDestination = () => {
        if (editingDestination) {
            setDestinations((prevDestinations) =>
                prevDestinations.map((destination) =>
                    destination.id === editingDestination.id ? { ...destination, ...formData } : destination
                )
            );
        } else {
            const newDestination = { id: Date.now(), ...formData };
            setDestinations((prevDestinations) => [...prevDestinations, newDestination]);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setDestinations(destinations.filter((destination) => destination.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Destination Name', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleOpenModal(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Destination Locations</h3>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
                    Add Destination
                </Button>
            </div>
            <Box>
                <DataGrid
                    rows={destinations}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="bg-white p-6 rounded-lg w-[400px] mx-auto mt-[10%]">
                    <h2 className="text-xl font-medium mb-4">
                        {editingDestination ? 'Edit Destination' : 'Add Destination'}
                    </h2>
                    <div className='flex flex-col mb-4'>
                        <TextField
                            fullWidth
                            sx={{

                                '& .MuiOutlinedInput-root': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        top: '-5px',
                                        height: "3vmax",

                                    },
                                    '& fieldset': {
                                        height: '3vmax',
                                        // top: '-1vmax',
                                        // border: "1px solid gray"
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
                                    fontSize: "1vmax !important", // Style for the first specific class
                                },
                                // '& .MuiInputLabel-root.Mui-focused': {
                                //     color: 'red',                 // Color when the input is focused
                                // },
                                // '& .MuiInputLabel-root.MuiFormLabel-colorPrimary': {
                                //     color: 'purple',              // Specific styling based on the class you mentioned
                                // },
                            }}

                            margin="normal"
                            label="Destination Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mb-4"
                        />
                        <TextField
                            fullWidth
                            sx={{

                                '& .MuiOutlinedInput-root': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        top: '-5px',
                                        height: "3vmax",

                                    },
                                    '& fieldset': {
                                        height: '3vmax',
                                        // top: '-1vmax',
                                        // border: "1px solid gray"
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
                                    fontSize: "1vmax !important", // Style for the first specific class
                                },
                                // '& .MuiInputLabel-root.Mui-focused': {
                                //     color: 'red',                 // Color when the input is focused
                                // },
                                // '& .MuiInputLabel-root.MuiFormLabel-colorPrimary': {
                                //     color: 'purple',              // Specific styling based on the class you mentioned
                                // },
                            }}

                            margin="normal"
                            label="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSaveDestination}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default DestinationsList;
