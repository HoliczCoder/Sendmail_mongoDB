import amqplib from "amqplib";
require("dotenv").config();

const receiveMail = async () => {
  try {
    // create connect
    const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD as string);
    // create channel
    const channel = await conn.createChannel();

    // create exchange
    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, "topic", { durable: false });

    // create queue
    const { queue } = await channel.assertQueue("", { exclusive: true });

    // binding

    const agrs = process.argv.slice(2);
    if (!agrs.length) {
      process.exit(0);
    }

    console.log("waiting queue", queue, "topic", agrs);

    // consume email

    agrs.forEach(async (key) => {
      await channel.bindQueue(queue, nameExchange, key);
    });

    await channel.consume(queue, (msg) => {
      console.log(
        "Routing key",
        msg?.fields.routingKey,
        "massage",
        msg?.content.toString()
      );
    });

    // const msg = agrs[1] || "Fixed!";
    // const topic = agrs[0];

    // console.log("msg", msg, "topic", topic);

    // await channel.publish(nameExchange, topic, Buffer.from(msg));
    // console.log("send okie", msg);

    // setTimeout(() => {
    //   conn.close();
    //   process.exit(0);
    // }, 2000);
  } catch (error) {
    console.log(error);
  }
};

const message = process.argv.slice(2).join("") || "Hello";

receiveMail();
