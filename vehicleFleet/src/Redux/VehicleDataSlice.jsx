// src/store/vehicleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    vehicleData: {
        Vehicles: ['All', 'UP01RS4321', 'UP32GH5678', 'DL12EF9876', 'MH12AB1234', 'TN23JK4567', 'RJ13TX2718'],
        Documents: [
            "Registration Certificate (RC)",
            "Insurance Policy",
            "Pollution Under Control (PUC) Certificate",
            "Road Tax Certificate",
            "Fitness Certificate",
            "Vehicle Permit"
        ],
        Owners: ['All', 'Gopal Logistic', 'Sheetal Meel', 'RK Sharma', 'Anil Mishra'],
        Sources: ['All', 'Sakhoti', 'Raipura', 'KKRI', 'Chandanber'],
        Destinations: ['All', 'Jain', 'Bareily', 'BKT', 'SBT'],
        PetrolPumps: ["S.B Petrol Pump", "Puri Petrol Pump", "Sambhal Petrol Pump", "HSN Petrol Pump", "Barily Petrol Pump", "Billu Petrol Pump"],

        MiscellaneousOptions: ["Driver Salary", "Vehicle Insurance", "Vehicle Permit", "Vehicle Fitness", "Installments", "Income Tax", "Vehicle Pollution", "Maintainance", "Tyres", "Others"]
    }
};

const vehicleSlice = createSlice({
    name: 'vehicleData',
    initialState,
    reducers: {
        updateVehicleData: (state, action) => {
            const { Vehicles, Documents, Owners, Sources, Destinations, PetrolPumps, MiscellaneousOptions } = action.payload;

            if (Vehicles) {
                state.vehicleData.Vehicles = Vehicles; // Update Vehicles
            }
            if (Documents) {
                state.vehicleData.Documents = Documents;
            }
            if (Owners) {
                state.vehicleData.Owners = Owners;
            }
            if (Sources) {
                state.vehicleData.Sources = Sources;
            }
            if (Destinations) {
                state.vehicleData.Destinations = Destinations;
            }
            if (PetrolPumps) {
                state.vehicleData.PetrolPumps = PetrolPumps;
            }
            if (MiscellaneousOptions) {
                state.vehicleData.MiscellaneousOptions = MiscellaneousOptions;
            }


        },

    },
});

export const { updateVehicleData } = vehicleSlice.actions;
export default vehicleSlice.reducer;
