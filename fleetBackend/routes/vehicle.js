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
console.log("Vehicle Routes ........");
router.route("/getVehicles").get(getAllVehicles);
router.route("/addVehicle").post(addVehicle);

router.route("/editVehicle/:id").put(editVehicle);
router.route("/deleteVehicle/:id").delete(deleteVehicle);

export default router;
