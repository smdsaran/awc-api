import express from "express";
var router = express.Router();
import upload from "../methods/Multer.js";

import {
  AddComplaintOrRequest,
  ReadComplaintOrRequest,
  fetchComplaintOrRequestImage,
} from "../controller/ComlaintOrRequest.js";

router.post("/add-complaint", upload.single("photo"), AddComplaintOrRequest);
router.get("/view-complaint/:divisionCode", ReadComplaintOrRequest);
router.get("/fetch-image/:image", fetchComplaintOrRequestImage);

export default router;
