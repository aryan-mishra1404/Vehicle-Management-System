import express from "express"; // ES6 import
import vehicleRoutes from "./routes/vehicle.js"; // Import routes
import associateRoutes from "./routes/associates.js";
import documentRoutes from "./routes/document.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);
app.use("/api/v1/associate", associateRoutes);
app.use("/api/v1/document/", documentRoutes);

export default app;
