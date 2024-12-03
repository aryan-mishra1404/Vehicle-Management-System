import { useState } from 'react';

import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';

const Modal = ({ isOpen, modalTitle, onClose, structure, onSave, vehicles, isForExpense, miscellaneousOptions }) => {
    const [editedVehicle, setEditedVehicle] = useState(structure);
    const [miscellaneousType, setMiscellaneousType] = useState("")

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setMiscellaneousType(name);
        setEditedVehicle((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedVehicle);
        onClose();
    };

    const handleSaveExpense = () => {
        if (editedVehicle.miscellaneous === "Others") {
            const updatedVehicle = {
                ...editedVehicle,
                miscellaneous: editedVehicle.others || "", // Ensure there's a fallback value
            };
            console.log(updatedVehicle)
            onSave(updatedVehicle);
            onClose();
        }
        onSave(editedVehicle);
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogContent>
                {Object.entries(editedVehicle)?.map(([key, value]) => {
                    if (key === "income" || key === "id") return;
                    if (key === 'vehicleNumber' || key === "miscellaneous") {
                        return (
                            <FormControl fullWidth margin="normal" key={key}>
                                <InputLabel id="structure-select-label"> {key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                                <Select
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
                                    labelId="structure-select-label"
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    label="Vehicle Number"
                                >
                                    {/* <MenuItem value=""></MenuItem> */}

                                    {(isForExpense && key === "miscellaneous") ? miscellaneousOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    )) : vehicles?.map((vehicleItem) => (
                                        <MenuItem key={vehicleItem} value={vehicleItem}>
                                            {vehicleItem}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        );
                    }
                    if (key === "miscellaneousAmount" || key === "others") return;
                    // if (miscellaneousType !== "Others") return;
                    return (
                        <TextField
                            key={key}
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
                            name={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            type={key === 'date' ? 'date' : 'text'}
                            fullWidth
                            value={value}
                            onChange={handleInputChange}
                            InputLabelProps={key === 'date' ? { shrink: true } : undefined}
                        />
                    );
                })}
                {isForExpense && editedVehicle.miscellaneous !== "" && (
                    <>
                        {editedVehicle.miscellaneous === "Others" && (
                            <TextField
                                key={"others"}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            top: '-5px',
                                            height: '3vmax',
                                        },
                                        '& fieldset': {
                                            height: '3vmax',
                                        },
                                        '& .MuiInputBase-input': {
                                            height: '3vmax',
                                            margin: '0',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            fontSize: '1vmax',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '1vmax',
                                    },
                                    '& .MuiInputLabel-root.css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root': {
                                        top: '-0.25vmax !important',
                                        fontSize: '1vmax !important',
                                    },
                                }}
                                margin="normal"
                                name={"others"}
                                label={"Others"}
                                type={'text'}
                                fullWidth
                                placeholder='Enter Expense Type'
                                value={editedVehicle.others}
                                onChange={handleInputChange}
                            />
                        )}

                        <TextField
                            key={"miscellaneousAmount"}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        top: '-5px',
                                        height: '3vmax',
                                    },
                                    '& fieldset': {
                                        height: '3vmax',
                                    },
                                    '& .MuiInputBase-input': {
                                        height: '3vmax',
                                        margin: '0',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        fontSize: '1vmax',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1vmax',
                                },
                                '& .MuiInputLabel-root.css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root': {
                                    top: '-0.25vmax !important',
                                    fontSize: '1vmax !important',
                                },
                            }}
                            margin="normal"
                            name={"miscellaneousAmount"}
                            label={"Miscellaneous Amount"}
                            type={'text'}
                            fullWidth
                            value={editedVehicle.miscellaneousAmount}
                            onChange={handleInputChange}
                        />
                    </>
                )}


            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={isForExpense ? handleSaveExpense : handleSave}>Save</Button>
            </DialogActions>
        </Dialog >
    );
};

export default Modal;
// drupple