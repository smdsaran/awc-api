// const logDebugger = require("debug")("app:logging");

// const winston = require("winston");

import winston from "winston";
import debug from "debug";
const logDebugger = debug("app:logging");
// require("express-async-errors");

//module.exports =
function Logger() {
  process.on("uncaughtException", (ex) => {
    logDebugger("WE GOT AN UNCAUGHT EXCEPTION");
    winston.error(ex.message, ex);
  });

  process.on("unhandledRejection", (ex) => {
    logDebugger("WE GOT AN UNCAUGHT REJECTION");
    winston.error(ex.message, ex);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
}

export default Logger;
