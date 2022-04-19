import express from "express";
var router = express.Router();

import {
  RequestLeave,
  ViewLeaveRequest,
  LeaveRequestResponse,
} from "../controller/LeaveRequest.js";

router.post("/request-leave", RequestLeave);
router.get("/view-leaverequest/:divisionCode", ViewLeaveRequest);
router.delete("/delete-leaverequest", LeaveRequestResponse);

export default router;
