import mongoose from "mongoose";
import Associate from "../models/Associates.js";

const getAllAssociates = async (req, res) => {
  try {
    const data = await Associate.find();
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const addAssociate = async (req, res) => {
  try {
    // Destructure data from the request body
    const { name, vehicleNumber, profession } = req.body;

    // Validate the incoming data
    if (!name || !vehicleNumber || !profession) {
      return res
        .status(400)
        .json({ error: "Name, vehicleNumber, and actions are required" });
    }

    // Check if the vehicleNumber already exists
    const existingAssociate = await Associate.findOne({ vehicleNumber });
    if (existingAssociate) {
      return res.status(400).json({
        error: "An associate with this vehicle number already exists",
      });
    }

    // Create a new associate instance
    const newAssociate = new Associate({
      name,
      vehicleNumber,
      profession,
    });

    // Save the associate to the database
    await newAssociate.save();

    // Return a success response
    return res.status(201).json({
      message: "Associate added successfully",
      associate: newAssociate,
    });
  } catch (error) {
    console.error("Error adding associate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllAssociates, addAssociate };
