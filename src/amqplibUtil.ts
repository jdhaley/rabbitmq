import { connect } from "amqplib";

export async function createChannel(url: string, qName: string) {
	const conn = await connect(url);
	const channel = await conn.createChannel();
	await channel.assertQueue(qName);
	return { conn, channel };
}
