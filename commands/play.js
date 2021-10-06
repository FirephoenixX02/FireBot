const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
  name: "play",
  description: "Plays Music",
  async execute(msg, args) {
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
    if (!args.length)
      return msg.reply(
        "You need to add a second argument(just the video title)"
      );

    const validURL = (str) => {
      var regex =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    if (validURL(args[0])) {
      msg.channel.send("You entered a correct URL!");

      const connection = await voiceChannel.join();
      const stream = ytdl(args[0], { filter: "audioonly" });

      connection.play(stream, { seek: 0, volume: 1 })
      .on('finish', () => {
        voiceChannel.leave()
        msg.channel.send("Leaving Channel :stop_sign:")
      });

      await msg.reply(":musical_note: Now Playing ***Your Link***")

      return
    }

    const connection = await voiceChannel.join();

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(args.join(" "));

    if (video) {
      const stream = ytdl(video.url, { filter: "audioonly" });
      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
      });

      await msg.reply(`:musical_note: Now Playing ***${video.title}***`);
    } else {
      msg.channel.reply("No video results found");
    }
  },
};
