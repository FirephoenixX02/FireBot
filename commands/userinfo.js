const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Shows Info about the user",
  execute(msg) {
    const { guild, channel } = msg;

    const user = msg.mentions.users.first() || msg.member.user;
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setAuthor({
        name: `User Info for ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .addFields(
        {
          name: "User Tag",
          value: user.tag,
        },
        {
          name: "Is Bot",
          value: JSON.stringify(user.bot),
        },
        {
          name: "Nickname",
          value: member.nickname || "None",
        },
        {
          name: "Joined Server",
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: "Joined Discord",
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: "Role Count",
          value: JSON.stringify(member.roles.cache.size - 1),
        }
      );
    channel.send({ embeds: [embed] });
  },
};
