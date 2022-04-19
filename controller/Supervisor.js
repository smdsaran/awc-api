import Supervisors from "../model/Supervisor.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import { generateAccessToken } from "../methods/Auth.js";
import debug from "debug";
const adminDebugger = debug("app:admin");

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

export const loginSupervisor = (req, res) => {
  var user_id = req.body.user_id;
  var pword = req.body.password;

  // ownerDebugger(email);
  // ownerDebugger(password);

  Supervisors.findOne({ user_id: user_id }, (err, docs) => {
    if (docs) {
      bcrypt.compare(pword, docs.password, function (err, result) {
        // result == true
        if (!err) {
          const user = { email: docs.email };
          adminDebugger(user);
          const accessToken = generateAccessToken(user);
          res.json({
            accessToken: accessToken,
            dcode: docs.divisionCode,
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
