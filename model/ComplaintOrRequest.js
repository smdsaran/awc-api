import mongoose from "mongoose";

const complaintOrRequestSchema = new mongoose.Schema({
  centerCode: {
    type: String,
    required: true,
  },

  divisionCode: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const ComplaintOrRequests = new mongoose.model(
  "ComplaintOrRequest",
  complaintOrRequestSchema
);

export default ComplaintOrRequests;
