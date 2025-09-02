import { connect, ConsumeMessage } from "amqplib"

async function createChannel(url: string, qName: string) {
	const conn = await connect(url);
	const channel = conn.createChannel();
	(await channel).assertQueue(qName);
	return channel;
}


async function receive(qName: string) {
	const channel = await createChannel("amqp://localhost", qName)
	channel.consume(qName, (msg: ConsumeMessage) => {
		console.log(`Message "${msg.content}" received.`);
		channel.ack(msg);
	});
}

receive("q1");
