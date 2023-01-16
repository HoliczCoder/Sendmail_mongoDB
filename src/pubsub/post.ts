import amqplib from "amqplib";
require("dotenv").config();

const postVideo = async ({ msg }: { msg: string }) => {
  try {
    const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD as string);
    const channel = await conn.createChannel();
    const nameExchange = "video";
    await channel.assertExchange(nameExchange, "fanout", { durable: false });
    await channel.publish(nameExchange, "", Buffer.from(msg));
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

postVideo({ msg: message });
