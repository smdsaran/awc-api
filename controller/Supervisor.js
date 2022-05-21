import Supervisors from "../model/Supervisor.js";
import AnganwadiWorkers from "../model/AnganwadiWorkers.js";
import sendFastTwoFastSMS from "../methods/FastTwoSms.js";
import sendEmail from "../methods/NodeMailer.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import { generateAccessToken } from "../methods/Auth.js";
import debug from "debug";
const adminDebugger = debug("app:admin");
import decrypt from "../methods/Crypto.js";
import CryptoJS from "crypto-js";

///////////////////////  Add AWW //////////////////////

export const AddSupervisor = async (req, res) => {
  const { name, user_id, email, mobile_no, divisionCode, password } = req.body;

  const found = await Supervisors.findOne({ user_id: user_id });

  console.log(found);

  if (found === null) {
    let hash = await bcrypt.hash(password, saltRounds);

    console.log(hash);

    const AWW = new Supervisors({
      name,
      user_id,
      email,
      mobile_no,
      divisionCode,
      password: hash,
    });

    const result = await AWW.save();

    if (result) res.send("Supervisor Added");
    else res.send("Something Wrong");
  } else {
    let hash = await bcrypt.hash(password, saltRounds);

    const update = await Supervisors.findOneAndUpdate(
      { user_id: user_id },
      {
        name: name,
        email: email,
        mobile_no: mobile_no,
        divisionCode: divisionCode,
        password: hash,
      }
    );

    if (update) res.send("Supervisor Updated");
    else res.send("Something Wrong");
  }
};

//////////////////////////  Login AWW    //////////////////////////////////

export const loginSupervisor = async (req, res) => {
  var user_id = req.body.user_id;
  var pword = req.body.password;

  // ownerDebugger(email);
  // ownerDebugger(password);

  const result = await Supervisors.findOne({ user_id: user_id });

  if (!result) res.status(401).send({ message: "Supervisor Not registered." });
  else {
    const match = await bcrypt.compare(pword, result.password);

    if (match) {
      const user = { email: result.email };
      adminDebugger(user);
      const accessToken = generateAccessToken(user);
      res.json({
        accessToken: accessToken,
        dcode: result.divisionCode,
        user_id: result.user_id,
      });
      adminDebugger("Login Success");
    } else {
      res.status(401).send({ message: "Username and Password missmatch ." });
    }
  }
};

//////////////////////////////  Send Announcements to Awws   ///////////////////////////////////

export const sendAnnoucementToAwws = async (req, res) => {
  const { divisionCode, body } = req.body;

  console.log(body);

  var bytes = CryptoJS.AES.decrypt(body, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  // const encryptedText = decrypt(body);

  // console.log(encryptedText);

  const results = await AnganwadiWorkers.find({
    divisionCode: divisionCode,
  }).select("mobile_no email");

  console.log(results);

  if (!results) res.send("No Resipients Available.");
  else res.send("Announcement Sent.");

  results.forEach((result) => {
    sendFastTwoFastSMS(originalText, result.mobile_no);

    sendEmail(originalText, result.email);
  });
};
