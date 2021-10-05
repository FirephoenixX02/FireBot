module.exports = {
	name: 'dice',
	description: 'Rolls a Dice',
	execute(msg) {
        msg.reply(Math.floor(Math.random() * 6) + 1);
	},
};