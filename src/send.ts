import { Channel, connect } from "amqplib"

async function createChannel(url: string, qName: string) {
	const conn = await connect(url);
	const channel = conn.createChannel();
	(await channel).assertQueue(qName);
	return channel;
}

async function send(qName: string, msg: string) {
	let channel: Channel
	try {
		channel = await createChannel("amqp://localhost", qName)
		channel.sendToQueue(qName, Buffer.from(msg));
		console.log(`Message "${msg}" sent.`);
	} finally {
		//channel.close();
	}
}

send("q1", "Hello, world!");
console.log("done");