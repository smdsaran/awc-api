import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  centerCode: {
    type: String,
    required: true,
  },

  divisionCode: {
    type: String,
    required: true,
  },

  workerName: {
    type: String,
    required: true,
  },

  workerNumber: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },
});

const LeaveRequests = new mongoose.model("LeaveRequest", leaveRequestSchema);

export default LeaveRequests;
