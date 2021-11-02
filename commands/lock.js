module.exports = {
  name: "lock",
  description: "Locks a channel",

  async execute(msg, args) {
    const role = msg.guild.roles.cache.find((r) => r.name === "@everyone");
    let channel =
      msg.mentions.channels.first() ||
      msg.guild.channels.cache.get(msg.args[0]);

    if (!channel) {
      channel = msg.channel;
    }

    if (channel.permissionsFor(msg.guild.id).has("SEND_MESSAGES") === false) {
      return msg.channel.send("This channel has already been locked!");
    }

    if (msg.member.roles.cache.some(r => r.name == "Administrator")) {

    await channel
      .updateOverwrite(msg.guild.id, { SEND_MESSAGES: false })
      .catch(() => {});

    await channel
      .updateOverwrite(role, { SEND_MESSAGES: false })
      .catch(() => {});

    msg.channel.send(`${channel} has been locked!`);
    } else {
      msg.channel.send("You dont have the right permissions to lock this channel!")
    }
  },
};
