// require("dotenv").config();
// const mongoose = require("mongoose");
// const dbDebugger = require("debug")("app:db");

import "dotenv/config";
import mongoose from "mongoose";
import debug from "debug";
const dbDebugger = debug("app:db");

const DB = () => {
  mongoose
    .connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
    .then((res) => dbDebugger("Database Connected"))
    .catch((err) => dbDebugger("DB Connection Failed..."));
  // mongoose.set("bufferCommands", false);
};

// module.exports = DB;
export default DB;
