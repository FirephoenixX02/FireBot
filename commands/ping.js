module.exports = {
	name: 'ping',
	description: 'Sends Ping! in the Chat',
	execute(msg, arguments, text) {
		msg.reply('Calculating Ping...').then(resultMessage => {
			const ping = resultMessage.createdTimestamp - msg.createdTimestamp;

			resultMessage.edit(`🏓 | Firebot Latency is ${ping}ms.`)
		})
	},
};