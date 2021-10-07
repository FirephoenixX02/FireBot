module.exports = {
  name: "airhorn",
  description: "Plays Airhorn sound in Voice Channel",
  async execute(msg) {
    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel)
      return msg.channel.send(
        "You need to be in a Voice Channel to use this command!"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT"))
      return msg.channel.send("You dont have the correct permissions!");
    if (!permissions.has("SPEAK"))
      return msg.channel.send("You dont have the correct permissions!");

    const connection = await voiceChannel.join();
    const dispatcher = connection.play("audio.mp3");
    dispatcher.setVolume(0.5);
    dispatcher.on("finish", () => {
      console.log("Finished playing!");
      dispatcher.destroy();
      voiceChannel.leave();
    });
  },
};
