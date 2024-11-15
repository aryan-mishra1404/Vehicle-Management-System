import express from "express";
import {
  addDocument,
  deleteDocument,
  editDocument,
  getAllDocuments,
} from "../controllers/document.controller.js";

const router = express.Router();
router.route("/add").post(addDocument);
router.route("/getDocuments").get(getAllDocuments);
router.route("/editDocument/:id").put(editDocument);
router.route("/deleteDocument/:id").delete(deleteDocument);

export default router;
