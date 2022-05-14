import express from "express";
var router = express.Router();
import { registerAdmin, loginAdmin } from "../controller/Admin.js";
import limiter from "../methods/RateLimit.js";

router.post("/admin_register", registerAdmin);

router.post("/admin_login", limiter, loginAdmin);

export default router;
