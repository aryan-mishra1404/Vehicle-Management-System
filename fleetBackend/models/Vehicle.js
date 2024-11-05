import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    ownership: {
      type: String,
      required: true,
    },
    vendors: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean, //  engazed or not
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
