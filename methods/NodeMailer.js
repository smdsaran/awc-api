import nodemailer from "nodemailer";

const NodeSendMail = async (message, userMail) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  var mailOptions = {
    from: `"AWC" <${process.env.GMAIL}>`,
    to: userMail,
    subject: "AWC Notification",
    //   text: `Hi
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default NodeSendMail;
