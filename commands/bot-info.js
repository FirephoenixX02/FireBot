module.exports = {
  name: "botinfo",
  description: "Gives you Information about the Bot",
  execute(msg) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`FireBot Info`)
      .addFields(
        { name: "Name", value: "FireBot" },
        { name: "Version", value: "1.6" },
        { name: "Developer", value: "NieGestorben#6618" },
        { name: "Creation Date", value: "05.06.2021" },
        { name: "Tag", value: "Fire Bot#1667" },
        {
          name: "Main/Home Server",
          value: "[FireBot Community](https://discord.com/invite/PATbnPp4xa)",
        },
        { name: "Prefix", value: "," },
        {
          name: "Time since last restart",
          value: Math.round(`${process.uptime().toFixed(2)}` / 60) + "m",
        }
      )
      .setFooter({ text: "Bot made by NieGestorben#6618" });

    msg.channel.send({ embeds: [embed] });
  },
};
