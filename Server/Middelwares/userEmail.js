import nodemailer from "nodemailer";


import dotenv, { config } from "dotenv";

dotenv.config();

const sendCredentialsByEmail = (req, res, next) => {
  let config = {
    service: "Gmail",
    auth: {
      user: "otmaneabbadia89@gmail.com",
      pass: "dvsq olix zury jeqm",
    },
  };


let transport = nodemailer.createTransport(config);


let message = {
    from: "otmaneabbadia89@gmail.com",
    to: req.userData.email,
    subject: "User Credientials",
    html: `<p>Welcome to our community. You can find your credentials bellow</p>
       <br/> <p> Email: ${ req.userData.email} <br/> Password: ${req.userData.pwd} `,
  };

  transport.sendMail(message).then((info) => {
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
  export { sendCredentialsByEmail}