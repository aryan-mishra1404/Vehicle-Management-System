import express from "express";
import {
  getAllAssociates,
  addAssociate,
} from "../controllers/associate.controller.js";
const router = express.Router();

router.route("/").get(getAllAssociates).post(addAssociate);

export default router;
