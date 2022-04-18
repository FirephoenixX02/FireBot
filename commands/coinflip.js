module.exports = {
  name: "coinflip",
  description: "Flips a Coin",
  execute(msg) {
    const solution = Math.floor(Math.random() * 2) + 1
    msg.channel.send(solution.toString() + " (1 = Heads, 2 = Tails)");
  },
};
