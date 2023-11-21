import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const sendEmail = (req, res, next) => {
  let config = {
    service: "Gmail",
    auth: {
      user: "otmaneabbadia89@gmail.com",
      pass: "dvsq olix zury jeqm",
    },
  };
  let transporter = nodemailer.createTransport(config);

  const verificationToken = jwt.sign(
    { _id: req.user_id },
    process.env.JWT_EMAIL,
    {
      expiresIn: "2h",
    }
  ); // Generate a new token

  let message = {
    from: "otmaneabbadia89@gmail.com",
    to: req.body.email,
    subject: "Email validation",
    html: `<p>Click the following link to verify your account:</p>
        <a href="http://localhost:${process.env.PORT}/v1/customers/validate?token=${verificationToken}">Verify Account</a>`,
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "Email sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message ?? "Couldn't send the email for some reason",
        ...err,
      });
    });
};

export default sendEmail;
