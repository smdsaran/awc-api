import AnganwadiWorkers from "../model/AnganwadiWorkers.js";
import AnganwadiCenters from "../model/AnganwadiCenters.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import { generateAccessToken } from "../methods/Auth.js";
import debug from "debug";
const adminDebugger = debug("app:admin");
import sendFastTwoFastSMS from "../methods/FastTwoSms.js";
import sendSMS from "../methods/TwilioSMS.js";
import decrypt from "../methods/Crypto.js";
import CryptoJS from "crypto-js";
///////////////////////  Add AWW //////////////////////

export const AddAWW = async (req, res) => {
  const {
    name,
    user_id,
    email,
    mobile_no,
    centerCode,
    divisionCode,
    password,
  } = req.body;

  console.log(req.body);

  const found = await AnganwadiWorkers.findOne({ user_id: user_id });

  console.log(found);

  if (found === null) {
    let hash = await bcrypt.hash(password, saltRounds);

    console.log(hash);

    const AWW = new AnganwadiWorkers({
      name,
      user_id,
      email,
      mobile_no,
      centerCode,
      divisionCode,
      password: hash,
    });

    const result = await AWW.save();

    if (result) res.send("AWW Added");
    else res.send("Something Wrong");
  } else {
    let hash = await bcrypt.hash(password, saltRounds);

    const update = await AnganwadiWorkers.findOneAndUpdate(
      { user_id: user_id },
      {
        name: name,
        email: email,
        mobile_no: mobile_no,
        centerCode: centerCode,
        divisionCode: divisionCode,
        password: hash,
      }
    );

    if (update) res.send("AWW Updated");
    else res.send("Something Wrong");
  }
};

//////////////////////////  Login AWW    //////////////////////////////////

export const loginAWW = async (req, res) => {
  var user_id = req.body.user_id;
  var pword = req.body.password;

  const result = await AnganwadiWorkers.findOne({ user_id: user_id });

  if (!result) res.status(401).send({ message: "AWW Not registered." });
  else {
    const match = await bcrypt.compare(pword, result.password);

    if (match) {
      const user = { email: result.email };
      adminDebugger(user);
      const accessToken = generateAccessToken(user);
      res.json({
        accessToken: accessToken,
        code: result.centerCode,
        user_id: result.user_id,
      });
      adminDebugger("Login Success");
    } else {
      res.status(401).send({ message: "Username and Password missmatch ." });
    }
  }
};

//////////////////////////////////   Get a Mobile Number/////////////////////////

export const getMobNum = async (req, res) => {
  const { centerCode } = req.params;

  const result = await AnganwadiWorkers.findOne({
    centerCode: centerCode,
  }).select("name mobile_no");

  if (!result) res.send("No AWW");
  else res.send(result);
};

////////////////////////////////////   Announcement ///////////////////////////////////////

export const sendAnnouncement = async (req, res) => {
  const { centerCode, body, sendTo } = req.body;

  console.log(body);

  var bytes = CryptoJS.AES.decrypt(body, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (sendTo === "PLadies") {
    const result = await AnganwadiCenters.findOne({
      centerCode: centerCode,
    }).select("pregnantLadies");

    if (!result) res.send("No Resipients Available.");
    else {
      result.pregnantLadies.forEach((lady) => {
        sendSMS(originalText, `+91${lady.mobile_no}`);

        sendFastTwoFastSMS(originalText, lady.mobile_no);
      });

      res.send("Announcement Sent");
    }
  } else {
    const result = await AnganwadiCenters.findOne({
      centerCode: centerCode,
    }).select("children");

    if (!result) res.send("No Resipients Available.");
    else {
      result.children.forEach((child) => {
        let text = `${originalText}Your Child BMI is ${child.bmi}.`;
        sendSMS(text, `+91${child.mobile_no}`);

        sendFastTwoFastSMS(text, child.mobile_no);
      });

      res.send("Announcement Sent");
    }
  }
};

////////////////////////////////   Read AWWs   /////////////////////////////////////////

export const readAWWs = async (req, res) => {
  const { centerCode } = req.params;

  const result = await AnganwadiWorkers.find({ centerCode: centerCode }).select(
    "name"
  );

  result ? res.send(result) : res.send("No AWW Available");
};
