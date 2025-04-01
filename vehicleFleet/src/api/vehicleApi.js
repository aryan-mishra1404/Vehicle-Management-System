import axiosInstance from "./axiosInstance";

// Fetch all vehicles
export const getVehicles = async () => {
  try {
    const response = await axiosInstance.get("/vehicle");
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

// Add a new vehicle
export const addVehicle = async (vehicleData) => {
  try {
    const response = await axiosInstance.post("/vehicle", vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw error;
  }
};

export const editVehicle = async (vehicleData, id) => {
  try {
    const response = await axiosInstance.post(`/vehicle/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw error;
  }
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};
