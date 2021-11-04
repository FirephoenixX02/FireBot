module.exports = {
  name: "dice",
  description: "Rolls a Dice",
  execute(msg, args) {
    if (!args) {
      msg.channel.send("Please specify a number!")
    }
    msg.reply(Math.floor(Math.random() * args[0]) + 1);
  },
};
