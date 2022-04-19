import AnganwadiWorkers from "../model/AnganwadiWorkers.js";
import AnganwadiCenters from "../model/AnganwadiCenters.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import { generateAccessToken } from "../methods/Auth.js";
import debug from "debug";
const adminDebugger = debug("app:admin");
import sendFastTwoFastSMS from "../methods/FastTwoSms.js";
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

export const loginAWW = (req, res) => {
  var user_id = req.body.user_id;
  var pword = req.body.password;

  // ownerDebugger(email);
  // ownerDebugger(password);

  AnganwadiWorkers.findOne({ user_id: user_id }, (err, docs) => {
    if (docs) {
      bcrypt.compare(pword, docs.password, function (err, result) {
        // result == true
        if (!err) {
          const user = { email: docs.email };
          adminDebugger(user);
          const accessToken = generateAccessToken(user);
          res.json({
            accessToken: accessToken,
            code: docs.centerCode,
            user_id: docs.user_id,
          });
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
  const { centerCode, body } = req.body;

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("pregnantLadies");

  // console.log(result);

  if (result) res.send("Announcement Sent");
  else res.send("No Resipients Available.");

  result.pregnantLadies.forEach((lady) => {
    sendFastTwoFastSMS(body, lady.mobile_no);
  });
};
