import mongoose from "mongoose";
import Vehicle from "../models/Vehicle.js";

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const data = await Vehicle.find(); // Fetch all vehicles from the database
    return res.status(200).json({ vehicles: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Add a new vehicle
const addVehicle = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, ownership, vendors, status } = req.body; // Get the vehicle data from the request body
    // Create a new vehicle instance
    const newVehicle = await Vehicle.create({
      vehicleNumber,
      vehicleType,
      ownership,
      vendors,
      status,
    });
    console.log(newVehicle);
    return res.status(201).json({
      message: "Vehicle added successfully",
      vehicle: newVehicle || "no data",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editVehicle = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the route parameter is named 'id'
    const editData = req.body;

    // Validate if id exists
    if (!id) {
      return res.status(400).json({ error: "Vehicle ID is missing!" });
    }

    // Input validation for editData
    if (!editData || Object.keys(editData).length === 0) {
      return res.status(400).json({ error: "No data provided for update!" });
    }

    // Find and update the vehicle
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      // Use $set operator for safe updates
      { $set: editData },
      {
        new: true, // Return updated document
        runValidators: true, // Run mongoose validators
      }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehicle not found!" });
    }

    return res.status(200).json({
      message: "Vehicle updated successfully",
      data: updatedVehicle, // Return updated vehicle data
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if id exists
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Vehicle ID is missing!",
      });
    }

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid vehicle ID format",
      });
    }

    // Add any pre-deletion checks if needed
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: "Vehicle not found!",
      });
    }

    // Optional: Check if user has permission to delete
    // if (vehicle.userId.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     success: false,
    //     error: "Not authorized to delete this vehicle"
    //   });
    // }

    // Delete the vehicle
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    // Optional: Delete related data
    // await MaintenanceRecord.deleteMany({ vehicleId: id });
    // await VehicleImage.deleteMany({ vehicleId: id });

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: deletedVehicle,
    });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export { getAllVehicles, addVehicle, editVehicle, deleteVehicle };
