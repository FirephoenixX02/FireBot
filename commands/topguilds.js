const Discord = require("discord.js");

module.exports = {
  name: "topguilds",
  description: "See which is the famest guild using FireBot!",
  execute(msg, args, client) {
    const guilds = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .first(10);

    const description = guilds
      .map((guild, index) => {
        return `${index + 1}) ${guild.name} -> ${guild.memberCount} members`;
      })
      .join(`\n`);

    const embed = new Discord.MessageEmbed()
      .setTitle("Top Guilds")
      .setDescription(description)
      .setColor("RED")
      .setFooter({ text: "Bot made by NieGestorben#6618" });

    msg.channel.send({ embeds: [embed] });
  },
};
