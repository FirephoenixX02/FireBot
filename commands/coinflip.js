module.exports = {
	name: 'coinflip',
	description: 'Flips a Coin',
	execute(msg) {
        msg.reply(Math.floor(Math.random() * 2) + 1);
        msg.reply("1 = Heads(Kopf), 2 = Tails(Zahl)");
	},
};