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
        { name: "Max Members", value: maximumMembers.toString() },
        { name: "Members", value: memberCount.toString() },
        { name: "Partnered", value: partnered.toString() },
        { name: "Default Language", value: preferredLocale },
        { name: "Boosts", value: premiumSubscriptionCount.toString() },
        { name: "Verified", value: verified.toString() },
        { name: "Online", value: available.toString() },
        { name: "AFK Timeout", value: afkTimeout / 60 + "m" }
      )
      .setFooter({ text: "Bot made by NieGestorben#6618" });

    msg.channel.send({ embeds: [embed] });
  },
};
