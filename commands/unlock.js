module.exports = {
  name: "unlock",
  description: "Unlocks a channel",

  async execute(msg, args) {
    const role = msg.guild.roles.cache.find((r) => r.name === "@everyone");
    let channel =
      msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0]);

    if (!channel) {
      channel = msg.channel;
    }

    if (channel.permissionsFor(msg.guild.id).has("SEND_MESSAGES") === true) {
      return msg.channel.send("This channel has already been unlocked!");
    }

    await channel
      .permissionOverwrites.edit(msg.guild.id, { SEND_MESSAGES: true })
      .catch(() => {});

    await channel
      .permissionOverwrites.edit(role, { SEND_MESSAGES: true })
      .catch(() => {});

    msg.channel.send(`${channel} has been unlocked!`);
  },
};
