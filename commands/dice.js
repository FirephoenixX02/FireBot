module.exports = {
  name: "dice",
  description: "Rolls a Dice",
  execute(msg, args) {
    if (!args) {
      msg.channel.send("Please specify a number!");
    } else {
      msg.reply(JSON.stringify(Math.floor(Math.random() * args[0]) + 1));
    }
  },
};
