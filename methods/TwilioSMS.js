// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

import "dotenv/config";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from "twilio";
const client = twilio(accountSid, authToken);

const sendSMS = (body, number) => {
  client.messages
    .create({
      body: body,
      from: "+18643516236",
      to: number,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

export default sendSMS;
