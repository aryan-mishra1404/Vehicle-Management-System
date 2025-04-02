import express from "express"; // ES6 import
import cors from "cors"; // Import cors middleware
import vehicleRoutes from "./routes/vehicle.js";
import associateRoutes from "./routes/associates.js";
import documentRoutes from "./routes/document.js";
import userRoutes from "./routes/user.js";

const app = express();

// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "https://vehicle-management-system-dusky.vercel.app/",
//   ], // CORS origin
//   optionsSuccessStatus: 204, // Single status code
//   preflightContinue: false,
// };

var whitelist = [
  "https://vehicle-management-system-dusky.vercel.app",
  "http://localhost:5173",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      // Allow requests without an origin (like Postman) or if it's in the whitelist
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  optionsSuccessStatus: 204, // Ensure browsers don't block preflight responses
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);
app.use("/api/v1/associate", associateRoutes);
app.use("/api/v1/document", documentRoutes);

app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Service is Running!",
    uptime: process.uptime(), // Shows how long the server has been running
    timestamp: new Date(),
  });
});

export default app;
