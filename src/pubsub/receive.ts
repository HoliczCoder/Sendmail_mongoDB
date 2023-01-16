import amqp from "amqplib";
require("dotenv").config();

const receiveNoti = async () => {
  try {
    const conn = await amqp.connect(process.env.AMPQ_URL_CLOUD as string);
    const channel = await conn.createChannel();
    const nameExchange = "video";
    await channel.assertExchange(nameExchange, "fanout", { durable: false });

    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });
    console.log("name queue", queue);

    await channel.bindQueue(queue, nameExchange, "");

    await channel.consume(
      queue,
      (msg: any) => {
        console.log("msg", msg.content.toString());
      },
      { noAck: true }
    );
  } catch (error) {
    console.log(error);
  }
};

// const mess = process.argv.slice(2).join("") || "Hello";

receiveNoti();
