import mongoose from "mongoose";
import Document from "../models/Documents.js";

const getAllDocuments = async (req, res) => {
  try {
    const data = await Document.find(); // Fetch all documents from the database
    return res.status(200).json({ documents: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addDocument = async (req, res) => {
  const data = req.body;

  try {
    // console.log(req.body);
    // return false;
    // Validate required fields
    if (!data.name || !data.vehicleNumber) {
      return res
        .status(400)
        .json({ message: "Name and vehicle number are required" });
    }

    const newDoc = await Document.create(data); // Await here
    console.log(newDoc);
    return res.status(201).json({
      message: "Document added successfully",
      document: newDoc,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editDocument = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the route parameter is named 'id'
    const editData = req.body;

    // Validate if id exists
    if (!id) {
      return res.status(400).json({ error: "Document ID is missing!" });
    }

    // Input validation for editData
    if (!editData || Object.keys(editData).length === 0) {
      return res.status(400).json({ error: "No data provided for update!" });
    }

    // Find and update the document
    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      // Use $set operator for safe updates
      { $set: editData },
      {
        new: true, // Return updated document
        runValidators: true, // Run mongoose validators
      }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: "Document not found!" });
    }

    return res.status(200).json({
      message: "Document updated successfully",
      data: updatedDocument, // Return updated document data
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate if id exists
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Document ID is missing!",
      });
    }

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid document ID format",
      });
    }

    // Add any pre-deletion checks if needed
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found!",
      });
    }

    // Optional: Check if user has permission to delete
    // if (document.userId.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     success: false,
    //     error: "Not authorized to delete this document"
    //   });
    // }

    // Delete the document
    const deletedDocument = await Document.findByIdAndDelete(id);

    // Optional: Delete related data
    // await MaintenanceRecord.deleteMany({ documentId: id });
    // await DocumentImage.deleteMany({ documentId: id });

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
      data: deletedDocument,
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export { getAllDocuments, addDocument, editDocument, deleteDocument };
