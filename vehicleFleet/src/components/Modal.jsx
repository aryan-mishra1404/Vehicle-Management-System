import { useState } from 'react';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const Modal = ({ isOpen, modalTitle, onClose, vehicle, onSave }) => {
    const [editedVehicle, setEditedVehicle] = useState(vehicle);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // alert(name, value)
        console.log(name, value, " add para")
        setEditedVehicle((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedVehicle);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogContent>
                {Object.entries(editedVehicle).map(([key, value]) => (
                    <TextField
                        key={key}
                        margin="dense"
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        type={key === 'date' ? 'date' : 'text'}
                        fullWidth
                        value={value}
                        onChange={handleInputChange}
                        InputLabelProps={key === 'date' ? { shrink: true } : undefined}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;