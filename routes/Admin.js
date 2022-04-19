import express from "express";
var router = express.Router();
import { registerAdmin, loginAdmin } from "../controller/Admin.js";

router.post("/admin_register", registerAdmin);

router.post("/admin_login", loginAdmin);

export default router;
