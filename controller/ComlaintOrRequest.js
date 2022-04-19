import ComplaintOrRequest from "../model/ComplaintOrRequest.js";
import Supervisor from "../model/Supervisor.js";
// import sendSMS from "../methods/TwilioSMS.js";
import sendFastTwoFastSMS from "../methods/FastTwoSms.js";

///////////////// Add Complaint ////////////////////

export const AddComplaintOrRequest = async (req, res) => {
  const { centerCode, divisionCode, subject, body } = req.body;

  let image = req.file;

  // console.log(req);

  image = image.originalname;

  const data = new ComplaintOrRequest({
    centerCode,
    divisionCode,
    subject,
    body,
    image,
  });

  const result = await data.save();

  if (result) {
    res.send("Complaint/Request Sent.");

    const supervisorNum = await Supervisor.findOne({
      divisionCode: divisionCode,
    }).select("mobile_no");

    console.log(supervisorNum);

    if (!supervisorNum) console.log("No Supervisor.");
    else
      sendFastTwoFastSMS(
        "Complaint or Request Arrived. Login and Take an Action.",
        supervisorNum.mobile_no
      );
  } else res.send("Something Went Wrong");
};

///////////////////////////////////// Read ///////////////////////////////////////

export const ReadComplaintOrRequest = async (req, res) => {
  const { divisionCode } = req.params;

  const result = await ComplaintOrRequest.find({ divisionCode: divisionCode });

  console.log(result);

  result ? res.send(result) : res.send("No Requests/Complaint Available.");
};

///////////////////////////  fetch image ///////////////////////////////

// export const fetchComplaintOrRequestImage = async (req, res) => {
//   const { image } = req.params;

//   console.log(image);

//   res.sendFile(`${process.cwd()}/public/uploads/${image}`);
// };

export const fetchComplaintOrRequestImage = async (req, res) => {
  const { image } = req.params;

  console.log(image);

  console.log(process.cwd());

  res.download(`${process.cwd()}/public/uploads/${image}`);
};
