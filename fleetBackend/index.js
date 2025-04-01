import express from "express"; // ES6 import
import mongoose from "mongoose"; // ES6 import
import dotenv from "dotenv";
import app from "./app.js";
// Adjust if needed
// Mongoose Connection
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_URL, {
    dbName: "vehicle",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection Established!"))
  .catch((err) => console.log("Error: ", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
