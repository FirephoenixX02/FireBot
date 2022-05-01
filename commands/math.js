const Discord = require("discord.js");

const ms = require("ms");

const math = require("mathjs");

module.exports = {
  name: "math",
  description: "Calculates a Math equation",

  async execute(msg, args) {
    try {
      const solution = math.evaluate(args.join(" "));
      const embed = new Discord.MessageEmbed()
        .addField("Question", args.join(" "))
        .addField("Solution", solution.toString());

      msg.channel.send({ embeds: [embed] });
    } catch {
      msg.channel.send("Your Question is invalid!");
    }
  },
};
