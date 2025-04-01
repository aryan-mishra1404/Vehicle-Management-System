import express from "express";
import {
  addVehicle,
  editVehicle,
  getAllVehicles,
  deleteVehicle,
  //   editVehicle,
  //   deleteVehicle,
  //   getVehicleById,
  //   updateVehicleById,
  //   deleteVehicleById,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

// CSR - Client Side Rendering

router.route("/").get(getAllVehicles).post(addVehicle);
router.route("/:id").put(editVehicle).delete(deleteVehicle);

export default router;
