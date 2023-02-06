import { google } from "googleapis";
import * as nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
require("dotenv").config();

const YOUR_CLIENT_ID = process.env.CLIENT_ID;
const YOUR_CLIENT_SECRET = process.env.CLIENT_SECRET;
const YOUR_REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const token = accessToken.token;
    if (token) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAUTH2",
          user: "nguyenvanduclis97@gmail.com",
          clientId: YOUR_CLIENT_ID,
          clientSecret: YOUR_CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: token,
        },
      });
      let info = await transporter.sendMail({
        from: '"Admin" <nguyenvanduclis97@gmail.com>', // sender address
        to: "thuan.nv035@gmail.com", // list of receivers
        subject: `Weekly subscriber mail `, // Subject line
        html: `<div>Hello World</div>`, // html body
      });
      console.log(info);
    }
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////////////////////////////////

function sendMailWithSendGrid() {
  if (process.env.SENDGRID_API_KEY_SECOND) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY_SECOND);
    const msg = {
      // to: ["nguyenvanduclis97@gmail.com", "thuan.nv035@gmail.com", "thevu091193@gmail.com"], // replace these with your email addresses
      personalizations: [
        {
          to: "nguyenvanduclis97@gmail.com", // replace this with your email address
          subject: "🍩 Hello Duc 🍩",
          html: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",
        },
        {
          to: "thuan.nv035@gmail.com", // replace this with your email address
          subject: "🍩 Hello Thuan 🍩",
          html: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",

        },
        {
          to: "thevu091193@gmail.com", // replace this with your email address
          subject: "🍩 Hello anh Vu 🍩",
          html: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",

        },
      ],
      from: "Sadie Miller <minhtranconglis@gmail.com>",
      text: "Fresh donuts are out of the oven. Get them while they’re hot!",
    };

    sgMail
      .sendMultiple(msg)
      .then(() => {
        console.log("emails sent successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

sendMailWithSendGrid();
