import dotenv from "dotenv"
import nodeMailer from "nodemailer";
dotenv.config();


function sendEmail() {
  let mailTranspoerter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "markmellem@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let details = {
    from: "markmellem@gmail.com",
    to: "markstone1234@hotmail.com",
    subject: "Testing nodemailer",
    text: "THIS IS A AWESOME EMAIL ",
  };

  console.log(details)

  mailTranspoerter.sendMail(details, (err) => {
    if (err) {
      console.log("Failed to send with error ", err);
    } else {
      console.log("Email sent");
    }
  });
}

export default sendEmail;
