module.exports = {
  name: "news",
  description: "Gives you the Announcement Role",
  execute(msg) {
    const role = msg.guild.roles.cache.find(
      (role) => role.name === "Announcement-Ping"
    );

    if (!role) {
      msg.channel.send("The Announcement Role doesn't exist!");
    } else {
      msg.member.roles.add(role);

      msg.reply(`Successfully added news role to member ${msg.author}`);
    }
  },
};
