module.exports = {
  name: "randomnumber100",
  description: "Random Number between 1 and 100",
  execute(msg) {
    msg.reply(Math.floor(Math.random() * 100) + 1);
  },
};
