import { Channel, ChannelModel } from "amqplib"
import { createChannel } from "./amqplibUtil";

async function send(qName: string, msg: string) {
	let channel: Channel
	let conn: ChannelModel
	try {
		({ conn, channel } = await createChannel("amqp://localhost", qName))
		channel.sendToQueue(qName, Buffer.from(msg));
		console.log(`Message "${msg}" sent.`);
	} finally {
		await channel.close();
		await conn?.close();
	}
}

send("q1", "Hello, world!");
console.log("done");