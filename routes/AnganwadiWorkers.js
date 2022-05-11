import express from "express";
var router = express.Router();

import {
  AddAWW,
  loginAWW,
  sendAnnouncement,
  getMobNum,
  readAWWs,
} from "../controller/AnganwadiWorkers.js";

router.post("/add-aww", AddAWW);
router.post("/login-aww", loginAWW);
router.post("/announcement", sendAnnouncement);
router.get("/getmobnumber/:centerCode", getMobNum);
router.get("/readAwws/:centerCode", readAWWs);
export default router;
