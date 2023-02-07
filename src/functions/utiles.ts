import * as nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

export const sendMail = async (
  message: any,
  email: string,
  user: string = ""
) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin" <admin@gmail.com>', // sender address
      to: email, // list of receivers
      subject: `Weekly subscriber mail ${message?.fields.routingKey}`, // Subject line
      html: `<h1>Hello ${user}</h1><div>${message?.content.toString()}</div>`, // html body
    });
    return info;
  } catch (error) {
    throw error;
  }
};

export const sendMailBulk = async (message: any, listUsers: any) => {
  if (process.env.SENDGRID_API) {
    sgMail.setApiKey(process.env.SENDGRID_API);

    const personalizations: any = [];
    listUsers.forEach((user: any) => {
      personalizations.push({
        to: user.email, // replace this with your email address
        subject: `🍩 This is weekly subscriber mail ${message?.fields.routingKey} 🍩`,
        html: `<h1>Hello ${
          user.subscriberName
        }</h1><div>${message?.content.toString()}</div>`, // html body
      });
    });

    const msg = {
      personalizations: [...personalizations],
      from: "Nguyen Van Duc <nguyenvanduclis97@gmail.com>",
      text: "Fresh Hambuger are out of the oven. Get them while they’re hot!",
    };

    sgMail
      .sendMultiple(msg)
      .then(() => {
        console.log(`emails sent successfully with ${message?.fields.routingKey} to!`, listUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
