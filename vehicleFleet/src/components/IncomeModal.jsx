import { useEffect, useState } from 'react';

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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const IncomeModal = ({ isOpen, modalTitle, onClose, structure, onSave, optionList, isForExpense, miscellaneousOptions }) => {
    const [editedVehicle, setEditedVehicle] = useState(structure);
    const [miscellaneousType, setMiscellaneousType] = useState("")

    useEffect(() => {
        console.log(optionList);
    }, [])

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
                    // Skip rendering for certain keys
                    if (["income", "id", "miscellaneousAmount", "amount", "others"].includes(key)) return null;

                    // Conditional rendering for "Select" or "TextField"
                    return ["vehicleNumber", "owner", "source", "destination"].includes(key) ? (
                        <FormControl fullWidth margin="normal" key={key}>
                            <InputLabel id={`${key}-select-label`}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </InputLabel>
                            <Select
                                sx={{
                                    height: "3vmax",
                                    backgroundColor: "white",
                                    fontSize: "1vmax",
                                    "& .MuiOutlinedInput-root": {
                                        "& .MuiOutlinedInput-notchedOutline": { top: "-5px", height: "3vmax" },
                                        "& fieldset": { height: "3vmax" },
                                        "& .MuiInputBase-input": { height: "3vmax", margin: "0" },
                                    },
                                    "& .MuiInputLabel-root": { fontSize: "1vmax" },
                                    "& .MuiMenuItem-root": { fontSize: "1vmax", padding: "0.5vmax" },
                                }}
                                labelId={`${key}-select-label`}
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                            >
                                {key === "vehicleNumber" &&
                                    optionList.Vehicles?.map(
                                        (option) =>
                                            option !== "All" && (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            )
                                    )}
                                {key === "owner" &&
                                    optionList.Owners?.map(
                                        (option) =>
                                            option !== "All" && (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            )
                                    )}
                                {key === "source" &&
                                    optionList.Sources?.map(
                                        (option) =>
                                            option !== "All" && (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            )
                                    )}
                                {key === "destination" &&
                                    optionList.Destinations?.map(
                                        (option) =>
                                            option !== "All" && (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            )
                                    )}
                            </Select>
                        </FormControl>
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDayjs} key={key}>
                            {["date", "lastIssueDate", "expiryDate"].includes(key) ? (
                                <FormControl fullWidth margin="normal">
                                    <DatePicker
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        value={
                                            value
                                                ? dayjs(value, "DD-MM-YYYY", true).isValid()
                                                    ? dayjs(value, "DD-MM-YYYY")
                                                    : dayjs(value, "MM-DD-YYYY", true).isValid()
                                                        ? dayjs(value, "MM-DD-YYYY")
                                                        : dayjs(value)
                                                : null // Handle null or empty values
                                        }
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                const formattedDate = newValue.format("DD-MM-YYYY"); // Format to DD-MM-YYYY
                                                handleInputChange({
                                                    target: {
                                                        name: key,
                                                        value: formattedDate, // Send formatted date to the handler
                                                    },
                                                });
                                            } else {
                                                handleInputChange({
                                                    target: {
                                                        name: key,
                                                        value: "",
                                                    },
                                                });
                                            }
                                        }}
                                        inputFormat="DD/MM/YYYY" // Ensure displayed value is in DD/MM/YYYY format
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "& .MuiOutlinedInput-notchedOutline": { top: "-5px", height: "3vmax" },
                                                        "& fieldset": { height: "3vmax" },
                                                        "& .MuiInputBase-input": { height: "3vmax", margin: "0" },
                                                    },
                                                    "& .MuiInputLabel-root": { fontSize: "1vmax" },
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            ) : (
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        name={key}
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        value={value || ""}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            )}
                        </LocalizationProvider>

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

export default IncomeModal;
