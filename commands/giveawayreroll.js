module.exports = {
  name: "giveawayreroll",
  description: "Reroll a giveaway",
  async execute(msg, args, client) {
    if (
      msg.member.roles.cache.some((r) => r.name == "Admin") ||
      msg.member.roles.cache.some((r) => r.name == "I-Admin") ||
      msg.member.roles.cache.some((r) => r.name == "Administrator") ||
      msg.member.roles.cache.some((r) => r.name == "Developer")
    ) {
      if (!args[0]) {
        msg.channel.send(
          "Please specify the message id of the giveaway you want to reroll."
        );
      }

      const giveaway = client.giveaways.giveaways.find(
        (g) => g.guildId === msg.guildId && g.messageId === args[0]
      );

      if (!giveaway) {
        return msg.channel.send(
          "Could not find a giveaway with that message id."
        );
      }

      client.giveaways
        .reroll(giveaway.messageId)
        .then(() => {
          msg.channel.send(`The Giveaway ${giveaway.prize} has been rerolled.`);
        })
        .catch((err) => {
          console.log(err);
          msg.channel.send("An error occurred while ending the Giveaway.");
        });
    } else {
      msg.channel.send(
        "You dont have the right permissions to execute this command."
      );
    }
  },
};
