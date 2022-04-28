const Discord = require("discord.js");

module.exports = {
  name: "dice",
  description: "Rolls a Dice",
  execute(msg, args) {
    const solution = Math.floor(Math.random() * 6 + 1);
    if (!args) {
      msg.channel.send("Please specify a number!");
    } else {
      const embed = new Discord.MessageEmbed().setDescription(
        solution.toString()
      );
      msg.channel.send({ embeds: [embed] });
    }
  },
};
