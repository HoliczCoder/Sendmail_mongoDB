import { google } from "googleapis";
import * as nodemailer from "nodemailer";
require("dotenv").config();

const YOUR_CLIENT_ID = process.env.CLIENT_ID;
const YOUR_CLIENT_SECRET = process.env.CLIENT_SECRET;
const YOUR_REDIRECT_URL = process.env.REDIRECT_URI;
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "nguyenvanduclis97@gmail.com",
        clientId: YOUR_CLIENT_ID,
        clientSecret: YOUR_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    });
    let info = await transporter.sendMail({
      from: '"Admin" <nguyenvanduclis97@gmail.com>', // sender address
      to: "minhtranconglis@gmail.com", // list of receivers
      subject: `Weekly subscriber mail `, // Subject line
      html: `<div>Hello World</div>`, // html body
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

sendMail();
