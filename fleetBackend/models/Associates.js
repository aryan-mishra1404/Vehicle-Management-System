import mongoose from "mongoose";

const associateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    profession: {
      type: String,
      //   required: true,
    },
    // actions: {
    //   type: String,
    //   // required: true,
    // },
  },
  { timestamps: true }
);

const Associate = mongoose.model("Associate", associateSchema);
export default Associate;
