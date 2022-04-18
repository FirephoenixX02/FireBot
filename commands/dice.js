module.exports = {
  name: "dice",
  description: "Rolls a Dice",
  execute(msg, args) {
    if (!args) {
      msg.channel.send("Please specify a number!");
    } else {
      const solution = Math.floor(Math.random() * args[0]) + 1;
      msg.channel.send(solution.toString());
    }
  },
};
