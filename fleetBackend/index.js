import express from "express"; // ES6 import
import mongoose from "mongoose"; // ES6 import
import vehicleRoutes from "./routes/vehicle.js"; // Import routes
import associateRoutes from "./routes/associates.js";
import documentRoutes from "./routes/document.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/vehicle", vehicleRoutes);
app.use("/api/v1/associate", associateRoutes);
app.use("/api/v1/document/", documentRoutes);

// Mongoose Connection
mongoose
  .connect(
    "mongodb+srv://edukate151:Atlas%40151@mycluster.mrdgp.mongodb.net/VehiclesDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connection Established!"))
  .catch((err) => console.log("Error: ", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
