module.exports = {
  name: "invites",
  description: "Shows how many new Users someone invited.",
  execute(msg) {
    const enabled = false;
    if (enabled == true) {
      var userId = msg.author.id;

      var userInvites = msg.guild.invites
        .fetch()
  
      var useAmount = userInvites.uses;
  
      if (useAmount === undefined) {
        msg.reply(`${msg.author.username} has 0 invites`);
      } else {
        msg.reply(`${msg.author.username} has ${useAmount} invites`);
      }
    } else {
      msg.channel.send("This command has been temporarily disabled due to maintenance!");
    }
  },
};
