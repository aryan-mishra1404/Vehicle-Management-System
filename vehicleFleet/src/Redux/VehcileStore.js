// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./VehicleDataSlice"; // Import vehicleSlice reducer

// Configure the store with the vehicleSlice
export const store = configureStore({
  reducer: {
    vehicleData: vehicleReducer, // Add the vehicleSlice reducer to the store
  },
});
