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

export const loginAdmin = async (req, res) => {
  var email = req.body.email;
  var pword = req.body.password;

  const result = await Admin.findOne({ user_name: email });

  if (!result) res.status(401).send({ message: "Admin Not registered." });
  else {
    const match = await bcrypt.compare(pword, result.password);

    if (match) {
      const user = { user_name: result.user_name };
      adminDebugger(user);
      const accessToken = generateAccessToken(user);
      res.json({
        accessToken: accessToken,
        user_name: result.user_name,
      });
      adminDebugger("Login Success");
    } else {
      res.status(401).send({ message: "Username and Password missmatch ." });
    }
  }
};
