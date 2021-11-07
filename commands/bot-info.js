module.exports = {
  name: "botinfo",
  description: "Gives Info about Firebot.",
  execute(msg) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`FireBot Info`)
      .setDescription("FireBot Info")
      .addFields(
        { name: "Name", value: "FireBot" },
        { name: "Version", value: "1.4" },
        { name: "Developer", value: "NieGestorben#6618" },
        { name: "Creation Date", value: "05.06.2021" },
        { name: "Tag", value: "Fire Bot#1667" },
        {
          name: "Main/Home Server",
          value: "[FireClient](https://discord.com/invite/MBzkfcQFvJ)",
        },
        { name: "Prefix", value: "," },
        { name: "Time since last restart", value: Math.round(`${process.uptime().toFixed(2)}` / 60) + "m" }
      )
      .setFooter("Bot made by NieGestorben#6618");

    msg.channel.send(embed);
  },
};
