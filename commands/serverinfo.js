module.exports = {
  name: "serverinfo",
  description: "Gives Info about the Server our on.",
  execute(msg) {
    const Discord = require("discord.js");
    const { guild } = msg;

    const {
      name,
      maximumMembers,
      memberCount,
      afkTimeout,
      partnered,
      preferredLocale,
      premiumSubscriptionCount,
      verified,
      available,
    } = guild;
    const icon = guild.iconURL();

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Server Info for ${name}`)
      .setThumbnail(icon)
      .setDescription("Server Info")
      .addFields(
        { name: "Max Members", value: maximumMembers },
        { name: "Members", value: memberCount },
        { name: "Partnered", value: partnered },
        { name: "Default Language", value: preferredLocale },
        { name: "Boosts", value: premiumSubscriptionCount },
        { name: "Verified", value: verified },
        { name: "Online", value: available },
        { name: "AFK Timeout", value: afkTimeout / 60 + "m" }
      )
      .setFooter("Bot made by NieGestorben#6618");

    msg.channel.send(embed);
  },
};
