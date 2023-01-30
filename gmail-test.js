const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: 'ac6288b02ae44e',
    pass: 'c65232dbf43d66',
  },
});


transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail({
    from: "sender@gmail.com",
    to: "minhtranconglis@gmail.com",
    subject: "Message",
    text: "I hope this message gets through!",

  });