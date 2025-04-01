import { useState, useEffect } from "react";
import { getVehicles, addVehicle, deleteVehicle } from "../api/vehicleApi";

const useVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch vehicles
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getVehicles();
                setVehicles(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    // Add a vehicle
    const handleAddVehicle = async (vehicleData) => {
        try {
            const newVehicle = await addVehicle(vehicleData);
            setVehicles((prev) => [...prev, newVehicle]); // Update state
        } catch (err) {
            setError(err);
        }
    };
    const handleEditVehicle = async (vehicleData, id) => {
        try {
            const newVehicle = await addVehicle(vehicleData, id);
            setVehicles((prev) => [...prev, newVehicle]); // Update state
        } catch (err) {
            setError(err);
        }
    };

    // Delete a vehicle
    const handleDeleteVehicle = async (id) => {
        try {
            await deleteVehicle(id);
            setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== id)); // Update state
        } catch (err) {
            setError(err);
        }
    };

    return {
        vehicles,
        loading,
        error,
        handleAddVehicle,
        handleDeleteVehicle,
        handleEditVehicle,
    };
};

export default useVehicles;
