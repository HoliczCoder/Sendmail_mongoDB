import * as nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import mongoose from "mongoose";

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

function findProperty(array: any, propertyName: string, propertyValue: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][propertyName] === propertyValue) {
      return i;
    }
  }
  return -1;
}

export const sendMailBulk = async (
  message: any,
  personalizations: any,
  listUSer: any
) => {
  if (process.env.SENDGRID_API_KEY_SECOND) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY_SECOND);
    const msg = [...personalizations];
    sgMail
      .send(msg)
      .then(() => {
        listUSer.forEach(async (user: any) => {
          const index = findProperty(
            user.categories,
            "category",
            message?.fields.routingKey
          );
          try {
            if (index >= 0) {
              user.categories[index].lastSendDate = Date.now();
              await user.save();
              console.log(
                "save sucessfully record",
                message?.fields.routingKey
              );
            }
          } catch (error) {
            console.log("cannot save record", error);
          }
        });
      })
      .catch(async (error) => {
        console.log(error);
        listUSer.forEach(async (user: any) => {
          const index = findProperty(
            user.categories,
            "category",
            message?.fields.routingKey
          );
          if (index) {
            user.categories[index].isSendingFail = true;
            user.save();
          }
        });
      });
  }
};
