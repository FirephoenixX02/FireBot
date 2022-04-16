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
        { name: "Max Members", value: JSON.stringify(maximumMembers) },
        { name: "Members", value: JSON.stringify(memberCount) },
        { name: "Partnered", value: JSON.stringify(partnered) },
        { name: "Default Language", value: preferredLocale },
        { name: "Boosts", value: JSON.stringify(premiumSubscriptionCount) },
        { name: "Verified", value: JSON.stringify(verified) },
        { name: "Online", value: JSON.stringify(available) },
        { name: "AFK Timeout", value: afkTimeout / 60 + "m" }
      )
      .setFooter({ text: "Bot made by NieGestorben#6618" });

    msg.channel.send({ embeds: [embed] });
  },
};
