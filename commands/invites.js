module.exports = {
    name: "invites",
    description: "Shows how many new Users someone invited.",
    execute(msg) {
        var userId = msg.author.id;

        var userInvites = msg.guild
          .fetchInvites()
          .then((invites) =>
            invites.find((invite) => invite.inviter.id === userId)
          );
    
        var useAmount = userInvites.uses;
    
        if (useAmount === undefined) {
          msg.reply(`${msg.author.username} has 0 invites`);
        } else {
          msg.reply(`${msg.author.username} has ${useAmount} invites`);
        }
    },
  };
  