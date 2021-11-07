module.exports = {
  name: "serverinfo",
  description: "Gives Info about the Server our on.",
  execute(msg) {
    const Discord = require("discord.js");
    const { guild } = msg;

    const { name, region, memberCount, afkTimeout } = guild;
    const icon = guild.iconURL();

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Server Info for ${name}`)
      .setThumbnail(icon)
      .setDescription("Server Info")
      .addFields(
        { name: "Region", value: region },
        { name: "Members", value: memberCount },
        { name: "AFK Timeout", value: afkTimeout / 60 + "m" }
      )
      .setFooter("Bot made by NieGestorben#6618");

    msg.channel.send(embed);
  },
};
