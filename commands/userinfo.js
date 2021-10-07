const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Shows Info about the user",
  execute(msg) {
    const { guild, channel } = msg;

    const user = msg.mentions.users.first() || msg.member.user;
    const member = guild.members.cache.get(user.id);

    const embed = new MessageEmbed()
      .setAuthor(`User Info for ${user.username}`, user.displayAvatarURL())
      .addFields(
        {
          name: "User Tag",
          value: user.tag,
        },
        {
          name: "Is Bot",
          value: user.bot,
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
          value: member.roles.cache.size - 1,
        }
      );
    channel.send(embed);
  },
};
