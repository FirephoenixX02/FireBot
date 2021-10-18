module.exports = {
  name: "leave",
  description: "The bot will leave the Voice channel.",
  async execute(msg) {
    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel)
      return msg.reply(
        "You need to be in a Voice Channel to use this command!"
      );
    await voiceChannel.leave();
    await msg.channel.send("Leaving Channel :stop_sign:");
  },
};
