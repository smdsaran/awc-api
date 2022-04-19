import "dotenv/config";
import fast2sms from "fast-two-sms";

// var options = {authorization : process.env.FAST_TWO_SMS_API , message : 'YOUR_MESSAGE_HERE' ,  numbers : ['9999999999','8888888888']}

const sendFastTwoFastSMS = (body, number) => {
  fast2sms
    .sendMessage({
      authorization: process.env.FAST_TWO_SMS_API,
      message: body,
      numbers: [number],
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

export default sendFastTwoFastSMS;
//Asynchronous Function.
