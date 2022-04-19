// const mongoose = require("mongoose");

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const Admin = new mongoose.model("Admin", adminSchema);

// module.exports = Admin;

export default Admin;
