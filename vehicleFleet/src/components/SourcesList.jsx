import React, { useState } from 'react';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialSources = [
    { id: 1, name: 'Warehouse A', location: 'City A' },
    { id: 2, name: 'Warehouse B', location: 'City B' },
];

const SourcesList = () => {
    const [sources, setSources] = useState(initialSources);
    const [openModal, setOpenModal] = useState(false);
    const [editingSource, setEditingSource] = useState(null);
    const [formData, setFormData] = useState({ name: '', location: '' });

    const handleOpenModal = (source = null) => {
        setEditingSource(source);
        setFormData(source || { name: '', location: '' });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingSource(null);
        setFormData({ name: '', location: '' });
    };

    const handleSaveSource = () => {
        if (editingSource) {
            setSources((prevSources) =>
                prevSources.map((source) =>
                    source.id === editingSource.id ? { ...source, ...formData } : source
                )
            );
        } else {
            const newSource = { id: Date.now(), ...formData };
            setSources((prevSources) => [...prevSources, newSource]);


        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setSources(sources.filter((source) => source.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Source Name', flex: 1 },
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
                <h3 className="text-lg font-medium">Source Locations</h3>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
                    Add Source
                </Button>
            </div>
            <Box>
                <DataGrid
                    rows={sources}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className="bg-white p-6 rounded-lg w-[400px] mx-auto mt-[10%]">
                    <h2 className="text-xl font-medium mb-4">
                        {editingSource ? 'Edit Source' : 'Add Source'}
                    </h2>
                    <div className='flex flex-col mb-4 '>
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
                            label="Source Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}

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

                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSaveSource}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default SourcesList;
