import axiosInstance from "./axiosInstance";

export const getAssociates = async () => {
  try {
    const response = await axiosInstance.get("/associate"); // Relative path
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching associates:", error);
    throw error;
  }
};

export const addAssociates = async (data) => {
  try {
    const response = await axiosInstance.post("/associate", data); // Relative path
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding associate:", error);
    throw error;
  }
};
