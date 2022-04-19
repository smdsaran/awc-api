// require("dotenv").config();
// const jwtDebugger = require("debug")("app:jwt");

// const jwt = require("jsonwebtoken");

import "dotenv/config";
import debug from "debug";
const jwtDebugger = debug("app:jwt");
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  // Bearer TOKEN
  if (token === null) {
    res.sendStatus(401);
    jwtDebugger("Don't have JWT Token.");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // jwtDebugger(err);
    if (err) {
      res.sendStatus(403);
      jwtDebugger("JWT Token mismatch.");
    }

    req.user = user;
    next();
  });
};

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};
