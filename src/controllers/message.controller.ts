import { Request, Response } from "express";
import { Subscriber } from "../models/subscriber.model";
import { sendMail, sendMailBulk } from "../functions/utiles";
import amqplib from "amqplib";
import mongoose from "mongoose";

const cateogries = [
  "All",
  "Full-Stack Programming",
  "Front-End Programming",
  "Back-End Programming",
  "Design",
  "Customer Support",
  "Devops and Sysadmin",
  "Sales and Marketing",
  "Management and Finance",
  "Product",
  "Other",
];
const limitNumber = 3; // limit 10 subscriber each send batch
const handleQueue = async (msg: any) => {
  // get all subscriber
  const Subscriber = mongoose.model("Subscriber");
  const subscriber = await Subscriber.find({});
  for (let i = 0; i < subscriber.length; i += limitNumber) {
    // const requests = subscriber.slice(i, i + limitNumber).map(async (user) => {
    //   // Send mail here
    //   try {
    //     if (user.category.includes(msg?.fields.routingKey)) {
    //       const result = await sendMail(msg, user.email, user.subscriberName);
    //       console.log(result);
    //     }
    //   } catch (error) {
    //     console.log(`Error send mail to subscriber ${error}`);
    //   }
    // });

    // await Promise.all(requests).catch((e) => {
    //   console.log(`Error in sending email for the batch ${i} - ${e}`);
    //   throw e;
    // });
    // Catch the error.
    const personalizations: any = [];
    const listUSer = subscriber.slice(i, i + limitNumber);
    //
    listUSer.forEach((user) => {
      if (user.category.includes(msg?.fields.routingKey)) {
        personalizations.push({
          to: user.email, // replace this with your email address
          subject: `🍩 This is weekly subscriber mail ${msg?.fields.routingKey} 🍩`,
          html: `<h1>Hello ${
            user.subscriberName
          }</h1><div>${msg?.content.toString()}</div>`, // html body
        });
      }
    });
    if (personalizations.length) {
      try {
        const result = await sendMailBulk(msg, personalizations);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    // create channel
    const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD as string);
    const channel = await conn.createChannel();
    const nameExchange = "CATEGORY";
    await channel.assertExchange(nameExchange, "topic", { durable: false });

    // binding
    await Promise.all(
      cateogries.map(async (key) => {
        // create queue with key as queue name
        const { queue } = await channel.assertQueue(key, { exclusive: true });
        await channel.bindQueue(queue, nameExchange, key);
        // consume email
        //   const result = [];
        await channel.consume(queue, (msg) => handleQueue(msg));
      })
    );

    // create provider
    const msg = req.body.message;
    // send message
    cateogries.forEach(async (topic) => {
      await channel.publish(
        nameExchange,
        topic,
        Buffer.from(`${msg} from ${topic}`)
      );
    });
    res.status(200).json({
      okie: "okie",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error,
    });
  }
};

export const sendMessageAutomate = async (message: string) => {
  try {
    // create channel
    const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD as string);
    const channel = await conn.createChannel();
    const nameExchange = "CATEGORY";
    await channel.assertExchange(nameExchange, "topic", { durable: false });

    // binding
    await Promise.all(
      cateogries.map(async (key) => {
        // create queue with key as queue name
        const { queue } = await channel.assertQueue(key, { exclusive: true });
        await channel.bindQueue(queue, nameExchange, key);
        // consume email
        //   const result = [];
        await channel.consume(queue, (msg) => handleQueue(msg));
      })
    );
    // create provider
    const msg = message;
    // send message
    cateogries.forEach(async (topic) => {
      await channel.publish(
        nameExchange,
        topic,
        Buffer.from(`${msg} from ${topic}`)
      );
    });
    return "send message to admin to notice sending is okie";
  } catch (error) {
    console.log("error", error);
    return "send message to admin to notice sending is not okie";
  }
};
