import LeaveRequest from "../model/LeaveRequest.js";
import mongoose from "mongoose";
// import sendSMS from "../methods/TwilioSMS.js";
import sendFastTwoFastSMS from "../methods/FastTwoSms.js";
import Supervisor from "../model/Supervisor.js";

////////////////////////////////////  Leave Request /////////////////////

export const RequestLeave = async (req, res) => {
  const { centerCode, divisionCode, workerName, workerNumber, reason } =
    req.body;

  console.log(req.body);

  const data = new LeaveRequest({
    centerCode,
    divisionCode,
    workerName,
    workerNumber,
    reason,
  });

  const result = await data.save();

  if (result) {
    res.send("Leave Request Sent.");

    const supervisorNum = await Supervisor.findOne({
      divisionCode: divisionCode,
    }).select("mobile_no");

    console.log(supervisorNum);

    if (!supervisorNum) console.log("No Supervisor.");
    else
      sendFastTwoFastSMS(
        "Leave Request Arrived. Login and Take an Action.",
        supervisorNum.mobile_no
      );
  } else res.send("Something Went Wrong");
};

//////////////////////////// View Request //////////////////////////////
export const ViewLeaveRequest = async (req, res) => {
  const { divisionCode } = req.params;

  const result = await LeaveRequest.find({ divisionCode: divisionCode });

  result ? res.send(result) : res.send("No Leave Requests Available.");
};

/////////////////////////// Delete Request ////////////////////////////////
export const LeaveRequestResponse = async (req, res) => {
  const { leaveResponse, number } = req.body; // number should be string
  const id = req.body.id;

  const result = await LeaveRequest.deleteOne({ _id: id });

  if (result) res.send("Leave Request Deleted.");
  else res.send("Something Went Wrong");

  // if (leaveResponse === "Accept") {
  //   sendSMS("Your Leave Request Accepted", `+91${number}`);
  // }

  // if (leaveResponse === "Deny") {
  //   sendSMS("Your Leave Request Denied", `+91${number}`);
  // }

  if (leaveResponse === "Accept") {
    sendFastTwoFastSMS("This is from AWC. Your Leave Request Accepted", number);
  }

  if (leaveResponse === "Deny") {
    sendFastTwoFastSMS("This is from AWC. Your Leave Request Denied", number);
  }
};
