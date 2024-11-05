import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      //   required: true,
    },
    amount: {
      type: String,
    },
    lastIssueDate: {
      type: String,
    },
    actions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
