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

// send mail bulk here

export const sendMailBulk = async (message: any, listUsers: any) => {
  if (process.env.SENDGRID_API_KEY_SECOND) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY_SECOND);
    const msg = {
      personalizations: [...listUsers],
      from: "Minh Tran Cong <minhtranconglis@gmail.com>",
      text: message?.content.toString(),
    };

    sgMail
      .sendMultiple(msg)
      .then(() => {
        console.log(
          `emails sent successfully with ${message?.fields.routingKey} to!`,
          listUsers
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
