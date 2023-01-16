import amqplib from 'amqplib';
require("dotenv").config();

const sendQueue = async ({ msg }: { msg: string }) => {
    try {
        const conn = await amqplib.connect(process.env.AMPQ_URL_CLOUD as string)
        const channel = await conn.createChannel();
        const nameQueue = "q1"
        await channel.assertQueue(nameQueue, {
            durable: false
        })
        await channel.sendToQueue(nameQueue, Buffer.from(msg))
    } catch (error) {
        console.log("error", error);

    }
}

const message = process.argv.slice(2).join('') || 'Hello'

sendQueue({ msg: message })

export default sendQueue;


