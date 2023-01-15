require("dotenv").config();

const amqplib = require('amqplib');

const receiveQueue = async () => {
    try {
        const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD)
        const channel = await conn.createChannel();
        const nameQueue = "q1"
        await channel.assertQueue(nameQueue, {
            durable: false
        })
        await channel.consume(nameQueue, (msg: any) => {
            console.log("msg", msg.content.toString());

        }, { noAck: true })
    } catch (error) {
        console.log(error);

    }
}

export default receiveQueue;

receiveQueue(); 