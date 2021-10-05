module.exports = {
  name: "randomnumber10",
  description: "Random Number between 1 and 10",
  execute(msg) {
    msg.reply(Math.floor(Math.random() * 10) + 1);
  },
};
