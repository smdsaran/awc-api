import "dotenv/config";
import debug from "debug";
const startDebugger = debug("app:start");

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import Logger from "./startup/logging.js";
import DB from "./startup/DB.js";

import Admin from "./routes/Admin.js";
import AWC from "./routes/AnganwadiCenters.js";
import AWW from "./routes/AnganwadiWorkers.js";
import Complaint from "./routes/ComlaintOrRequest.js";
import LeaveRequest from "./routes/LeaveRequest.js";
import Supervisors from "./routes/Supervisor.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(helmet());
app.use(compression());

Logger();

// startDebugger(`app: ${app.get("env")}`); /// process.env.NODE_ENV  .... Change NODE_ENV to change the development to production
// https://awc-easy.herokuapp.com/

app.use("/", Admin);
app.use("/", AWC);
app.use("/", AWW);
app.use("/", Complaint);
app.use("/", LeaveRequest);
app.use("/", Supervisors);

// app.use(error);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  startDebugger(`Server Running on Port ${port} .`);
  DB();
});
