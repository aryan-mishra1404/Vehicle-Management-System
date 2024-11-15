import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
    },
    amountPaid: {
      type: String,
    },
    lastIssueDate: {
      type: String,
    },
    file: {
      type: String,
      default: "",
    },
    issueCompany: {
      type: String,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
