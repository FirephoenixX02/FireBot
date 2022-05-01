const Discord = require("discord.js");

module.exports = {
  name: "coinflip",
  description: "Flips a coin",
  execute(msg) {
    let solution = undefined;
    const number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
      solution = "Heads"
    } else {
      solution = "Tails"
    }
    const embed = new Discord.MessageEmbed().setDescription(
      "Flipped a coin, you got " + solution.toString()
    );
    msg.channel.send({ embeds: [embed] });
  },
};
