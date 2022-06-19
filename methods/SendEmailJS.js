import { SMTPClient } from "emailjs";

const client = new SMTPClient({
  user: process.env.GMAIL,
  password: process.env.GMAIL_PASS,
  host: "saranthuppaki056@gmail.com",
  ssl: true,
});

try {
  const message = await client.sendAsync({
    text: "i hope this works",
    from: "you <username@your-email.com>",
    to: "someone <someone@your-email.com>, another <another@your-email.com>",
    cc: "else <else@your-email.com>",
    subject: "testing emailjs",
  });
  console.log(message);
} catch (err) {
  console.error(err);
}
