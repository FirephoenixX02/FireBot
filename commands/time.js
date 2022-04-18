const Discord = require("discord.js");

module.exports = {
  name: "time",
  description: "See how much time i spend to create the bot",
  execute(msg) {
    const embed = new Discord.MessageEmbed().setTitle("Time Spent: ").addFields(
      {
        name: "Thinking 💭 : ",
        value: "5h",
      },
      {
        name: "Coding ⌨️ : ",
        value: "9h",
      },
      {
        name: "Testing 🧪 : ",
        value: "21h",
      },
      {
        name: "Cups of Coffee ☕ :  ",
        value: "3",
      }
    );
    msg.channel.send({ embeds: [embed] });
  },
};
