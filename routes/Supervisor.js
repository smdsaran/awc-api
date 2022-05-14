import express from "express";
var router = express.Router();
import limiter from "../methods/RateLimit.js";

import {
  AddSupervisor,
  loginSupervisor,
  sendAnnoucementToAwws,
} from "../controller/Supervisor.js";

router.post("/add-supervisor", AddSupervisor);

router.post("/login-supervisor", limiter, loginSupervisor);

router.post("/announcementtoawws", sendAnnoucementToAwws);

export default router;
