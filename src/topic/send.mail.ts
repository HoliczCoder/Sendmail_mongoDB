import amqplib from "amqplib";
require("dotenv").config();

const sendMail = async () => {
  try {
    const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD as string);
    const channel = await conn.createChannel();
    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, "topic", { durable: false });

    const agrs = process.argv.slice(2);
    const msg = agrs[1] || "Fixed!";
    const topic = agrs[0];

    console.log("msg", msg, "topic", topic);

    await channel.publish(nameExchange, topic, Buffer.from(msg));
    console.log("send okie", msg);
    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

const message = process.argv.slice(2).join("") || "Hello";

sendMail();
