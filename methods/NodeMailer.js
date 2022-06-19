// import "dotenv/config";
// import nodemailer from "nodemailer";

// const NodeSendMail = async (message, userMail) => {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL,
//       pass: process.env.GMAIL_PASS,
//     },
//   });

//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     secure: "true",
//     port: "465",
//     auth: {
//     type: "OAuth2", //Authentication type
//     user: process.env.GMAIL, //For example, xyz@gmail.com
//     clientId: ‘Your_ClientID",
//     clientSecret: ‘Client_Secret",
//     refreshToken: ‘Refresh_Token"
//          }
//     });

//   var mailOptions = {
//     from: `"AWC" <${process.env.GMAIL}>`,
//     to: userMail,
//     subject: "AWC Notification",
//     //   text: `Hi
//     html: message,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// export default NodeSendMail;

import "dotenv/config";
import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

// const createTransporter = async () => {
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = new Promise((resolve, reject) => {
  oauth2Client.getAccessToken((err, token) => {
    if (err) {
      reject("Failed to create access token :(");
    }
    resolve(token);
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL,
    accessToken,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

//   return transporter;
// };

const sendEmail = (emailOptions) => {
  // let emailTransporter = await createTransporter();

  transporter.sendMail(emailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const NodeSendMail = (message, userMail) => {
  sendEmail({
    subject: "AWC Notification",
    text: message,
    to: userMail,
    from: `"AWC" <${process.env.GMAIL}>`,
  });
};

export default NodeSendMail;
