import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../model/Admin.js";
import debug from "debug";
const adminDebugger = debug("app:admin");
import bcrypt from "bcrypt";
const saltRounds = 10;
import { generateAccessToken } from "../methods/Auth.js";

export const registerAdmin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    const admin = new Admin({
      user_name: email,
      password: hash,
    });

    admin.save((err, doc) => {
      if (err) {
        res.send({ message: "Data Saving to DB is Failed ." });
        mongoose.connection.close();
      } else {
        res.send(doc);
        adminDebugger("Registration Success .");
        // mongoose.connection.close();
      }
    });
  });
};

export const loginAdmin = (req, res) => {
  var email = req.body.email;
  var pword = req.body.password;

  // ownerDebugger(email);
  // ownerDebugger(password);

  Admin.findOne({ user_name: email }, (err, docs) => {
    if (docs) {
      bcrypt.compare(pword, docs.password, function (err, result) {
        // result == true
        if (!err) {
          const user = { user_name: docs.user_name };
          adminDebugger(user);
          const accessToken = generateAccessToken(user);
          res.json({ accessToken: accessToken, user_name: docs.user_name });
          adminDebugger("Login Success");
          // res.send(docs);
        } else {
          res.send({ message: "Username and Password missmatch ." });
        }
      });
    } else {
      // mongoose.connection.close();
      res.status(401).send({ message: "HouseOwner Not registered." });
      // mongoose.connection.close();
    }
  });
};
