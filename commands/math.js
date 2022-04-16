const Discord = require("discord.js");

const ms = require("ms");

const math = require("mathjs");

module.exports = {
  name: "math",
  description: "calculate something",

  async execute(msg, args) {
    try {
      const embed = new Discord.MessageEmbed()
        .addField("Question", args.join(" "))
        .addField("Solution", JSON.stringify(math.evaluate(args.join(" "))));

      msg.channel.send({ embeds: [embed] });
    } catch {
      msg.channel.send("Your Question is invalid!");
    }
  },
};
