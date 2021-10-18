module.exports = {
	name: 'ping',
	description: 'Sends Ping! in the Chat',
	execute(msg) {
		msg.channel.send('Calculating Ping...').then(resultMessage => {
			const ping = resultMessage.createdTimestamp - msg.createdTimestamp;

			resultMessage.edit(`🏓 | Firebot Calculation time is ${ping}ms.`)
		})
	},
};