import mongoose from "mongoose";

const supervisorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mobile_no: {
    type: String,
    required: true,
  },

  divisionCode: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const Supervisors = new mongoose.model("Supervisor", supervisorsSchema);

export default Supervisors;
