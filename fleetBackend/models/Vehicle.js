import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    chassisNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    ownership: {
      type: String,
      // enum: ["", ""],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean, //  engazed or not
      default: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
