import { connect } from "amqplib"

async function createChannel(url: string, qName: string) {
	const conn = await connect(url);
	const channel = conn.createChannel();
	(await channel).assertQueue(qName);
	return channel;
}

async function main(qName: string, msg: string) {
	const channel = await createChannel("amqp://localhost", qName)
	channel.sendToQueue(qName, Buffer.from(msg));
	console.log(`Message "${msg}" sent.`);
}

main("q1", "Hello, world!");