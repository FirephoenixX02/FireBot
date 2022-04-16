const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  AudioPlayerStatus,
} = require("@discordjs/voice");

let fs = require("fs");

module.exports = {
  name: "airhorn",
  description: "Plays Airhorn sound in Voice Channel",
  async execute(msg) {
    const voiceChannel = msg.member.voice.channel;
    const path = "./resources/audio.mp3";

    if (!voiceChannel)
      return msg.channel.send(
        "You need to be in a Voice Channel to use this command!"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT"))
      return msg.channel.send("You dont have the correct permissions!");
    if (!permissions.has("SPEAK"))
      return msg.channel.send("You dont have the correct permissions!");

    const connection = joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator,
    });

    let resource = createAudioResource(fs.createReadStream(path), {
      inlineVolume: true,
    });

    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      player.stop();
      const voicechannel = getVoiceConnection(msg.guild.id);
      voicechannel.destroy();
    });
  },
};
