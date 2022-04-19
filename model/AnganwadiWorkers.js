import mongoose from "mongoose";

const anganwadiWorkersSchema = new mongoose.Schema({
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

  centerCode: {
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

const AnganwadiWorkers = new mongoose.model(
  "AnganwadiWorker",
  anganwadiWorkersSchema
);

export default AnganwadiWorkers;
