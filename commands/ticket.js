module.exports = {
  name: "ticket",
  description: "Create a Support Ticket",
  async execute(msg, args, cmd, client, discord) {
    const channel = await msg.guild.channels.create(
      `ticket: ${msg.author.tag}`
    );

    channel.updateOverwrite(msg.guild.id, {
      SEND_MESSAGE: false,
      VIEW_CHANNEL: false,
    });
    channel.updateOverwrite(msg.author, {
      SEND_MESSAGE: true,
      VIEW_CHANNEL: true,
    });

    const reactionMessage = await channel.send(
      "Thank you for contacting our support team!"
    );

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("🗑️");
    } catch (err) {
      channel.send("Error Sending Emojis");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector(
      (reaction, user) =>
        msg.guild.members.cache
          .find((member) => member.id === user.id)
          .hasPermission("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "🔒":
          channel.updateOverwrite(msg.author, {
            SEND_MESSAGE: false,
          });
          break;
        case "🗑️":
          channel.send("This channel will be deleted in 5s!");
          setTimeout(() => channel.delete(), 5000);
          break;
      }
    });
    msg.channel
      .send(`We will be right with you! ${channel}`)
      .then((message) => {
        setTimeout(() => message.delete(), 7000);
        setTimeout(() => msg.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
