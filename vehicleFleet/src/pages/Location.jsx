import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    IconButton,
    Modal,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateVehicleData } from "../Redux/VehicleDataSlice";
import { useDispatch, useSelector } from "react-redux";

const Location = () => {
    const [sources, setSources] = useState([
        { id: 1, source: "Sakhoti" },
        { id: 2, source: "Raipura" },
        { id: 3, source: "KKRI" },
        { id: 4, source: "Chandanber" },
    ]);

    const [destinations, setDestinations] = useState([
        { id: 1, destination: "Jain" },
        { id: 2, destination: "Bareily" },
        { id: 3, destination: "BKT" },
        { id: 4, destination: "SBT" },
    ]);

    const dispatch = useDispatch();
    const { vehicleData } = useSelector((state) => state.vehicleData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("");
    const [locationName, setLocationName] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);

    // useEffect
    useEffect(() => {
        // Extract source and destination names
        const sourcesList = sources?.map((source) => source.source) || [];
        const destinationsList = destinations?.map((destination) => destination.destination) || [];

        // Merge with existing vehicleData values, ensuring uniqueness
        const updatedSources = Array.from(new Set([...vehicleData.Sources, ...sourcesList]));
        const updatedDestinations = Array.from(new Set([...vehicleData.Destinations, ...destinationsList]));

        // Dispatch only if there are changes to avoid unnecessary renders
        if (
            updatedSources.length !== vehicleData.Sources.length ||
            updatedDestinations.length !== vehicleData.Destinations.length
        ) {
            dispatch(updateVehicleData({ Sources: updatedSources, Destinations: updatedDestinations }));
        }
    }, [dispatch, sources, destinations, vehicleData]);


    useEffect(() => {
        console.log(vehicleData.Sources, " => ", vehicleData.Destinations)
    }, [dispatch, vehicleData.Destinations, vehicleData.Sources])

    // Function to update IDs dynamically
    const updateIds = (list) =>
        list.map((item, index) => ({
            ...item,
            id: index + 1, // ID is set dynamically based on index
        }));


    const handleOpenModal = () => {
        setIsModalOpen(true);
        setLocationType("");
        setLocationName("");
        setSelectedRow(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddOrEdit = () => {
        if (locationType === "Source") {
            if (selectedRow) {
                const updatedSources = sources.map((source) =>
                    source.id === selectedRow.id
                        ? { ...source, source: locationName }
                        : source
                );
                setSources(updateIds(updatedSources)); // Update IDs after editing
            } else {
                const newSource = { source: locationName };
                setSources(updateIds([...sources, newSource])); // Add and update IDs
            }
        } else if (locationType === "Destination") {
            if (selectedRow) {
                const updatedDestinations = destinations.map((destination) =>
                    destination.id === selectedRow.id
                        ? { ...destination, destination: locationName }
                        : destination
                );
                setDestinations(updateIds(updatedDestinations)); // Update IDs after editing
            } else {
                const newDestination = { destination: locationName };
                setDestinations(updateIds([...destinations, newDestination])); // Add and update IDs
            }
        }
        handleCloseModal();
    };

    const handleEditRow = (row, type) => {
        setSelectedRow(row);
        setLocationType(type);
        setLocationName(type === "Source" ? row.source : row.destination);
        setIsModalOpen(true);
    };

    const handleDeleteRow = (row, type) => {
        if (type === "Source") {
            const updatedSources = sources.filter((source) => source.id !== row.id);
            setSources(updateIds(updatedSources)); // Remove and update IDs
        } else if (type === "Destination") {
            const updatedDestinations = destinations.filter(
                (destination) => destination.id !== row.id
            );
            setDestinations(updateIds(updatedDestinations)); // Remove and update IDs
        }
    };

    const columns = (type) => [
        { field: "id", headerName: "S.No", width: 90 },
        {
            field: type === "Source" ? "source" : "destination",
            headerName: type === "Source" ? "Source" : "Destination",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() =>
                            handleEditRow(
                                params.row,
                                type === "Source" ? "Source" : "Destination"
                            )
                        }
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() =>
                            handleDeleteRow(
                                params.row,
                                type === "Source" ? "Source" : "Destination"
                            )
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div className="px-[6vmax] w-[86%] pt-[2vmax] bg-secondary text-primaryColor h-[92vh] overflow-hidden box-border">
            <div className="flex text-[1.5vmax] font-medium items-center justify-between mb-6">
                <h2>Location Management</h2>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                >
                    Add Location
                </Button>
            </div>
            <Grid container spacing={4} className="mt-4">
                {/* Source Table */}
                <Grid item xs={6}>
                    <div className="shadow-lg">
                        <Box>
                            <DataGrid
                                rows={sources}
                                columns={columns("Source")}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10]}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </Box>
                    </div>
                </Grid>

                {/* Destination Table */}
                <Grid item xs={6}>
                    <div className="shadow-lg">
                        <Box>
                            <DataGrid
                                rows={destinations}
                                columns={columns("Destination")}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10]}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </Box>
                    </div>
                </Grid>
            </Grid>

            {/* Modal */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: 400,
                    }}
                >
                    <h2 className="text-xl font-medium mb-4">
                        {selectedRow ? "Edit Location" : "Add Location"}
                    </h2>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="location-type-label">Location Type</InputLabel>
                        <Select
                            labelId="location-type-label"
                            value={locationType}
                            onChange={(e) => setLocationType(e.target.value)}
                            label="Location Type"
                            sx={{
                                height: "3vmax",
                                backgroundColor: "white",
                                fontSize: "1vmax", // Match font size of input

                                // Style the select input field
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        top: '-5px', // Align with TextField
                                        height: '3vmax', // Set consistent height
                                    },
                                    '& fieldset': {
                                        height: '3vmax', // Match the fieldset height
                                    },
                                    '& .MuiInputBase-input': {
                                        height: '3vmax',
                                        margin: '0',

                                    },
                                    '&.MuiOutlinedInput-input': {
                                        // paddingTop: '1.5vmax',
                                        fontSize: '1vmax',  // Change input content font size

                                    },
                                },

                                // Style the label
                                '& .MuiInputLabel-root': {
                                    fontSize: '1vmax', // Match label font size
                                    // Match the label position
                                },
                                // '& .MuiInputLabel-root.css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root': {

                                //     fontSize: '3vmax',   // Set label font size to 1vmax
                                // },

                                // Additional customization for MenuItem
                                '& .MuiMenuItem-root': {
                                    fontSize: '1vmax', // Set font size for dropdown items
                                    padding: '0.5vmax', // Adjust padding
                                },
                            }}

                        >
                            <MenuItem value="Source">Source</MenuItem>
                            <MenuItem value="Destination">Destination</MenuItem>
                        </Select>
                    </FormControl>
                    {locationType && (
                        <TextField
                            fullWidth
                            label={
                                locationType === "Source" ? "Source Name" : "Destination Name"
                            }
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
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
                        />
                    )}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: "1vmax" }}
                        onClick={handleAddOrEdit}
                        disabled={!locationType || !locationName}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Location;
