import express from "express";
var router = express.Router();

import {
  AddAWW,
  loginAWW,
  sendAnnouncement,
  getMobNum,
} from "../controller/AnganwadiWorkers.js";

router.post("/add-aww", AddAWW);
router.post("/login-aww", loginAWW);
router.post("/announcement", sendAnnouncement);
router.get("/getmobnumber/:centerCode", getMobNum);
export default router;
