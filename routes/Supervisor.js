import express from "express";
var router = express.Router();

import { AddSupervisor, loginSupervisor } from "../controller/Supervisor.js";

router.post("/add-supervisor", AddSupervisor);

router.post("/login-supervisor", loginSupervisor);

export default router;
