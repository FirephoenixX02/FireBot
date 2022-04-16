const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const Discord = require("discord.js");

const queue = new Map();

module.exports = {
  name: "play",
  aliases: ["skip", "stop", "queue", "loop"],
  cooldown: 0,
  description: "Advanced music bot",
  async execute(msg) {
    const BOT_PREFIX = ",";
    const args = msg.content.slice(BOT_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const voice_channel = msg.member.voice.channel;

    let enabled = false;

    if (enabled) {
      if (!voice_channel)
        return msg.channel.send(
          "You need to be in a Voice Channel to use this command!"
        );

      const permissions = voice_channel.permissionsFor(msg.client.user);

      if (!permissions.has("CONNECT"))
        return msg.channel.send("You dont have the correct permissions!");

      if (!permissions.has("SPEAK"))
        return msg.channel.send("You dont have the correct permissions!");

      const server_queue = queue.get(msg.guild.id);
      if (command === "play") {
        if (!args.length)
          return msg.reply("You need to add a second argument!");

        let song = {};
        if (ytdl.validateURL(args[0])) {
          const song_info = await ytdl.getInfo(args[0]);
          song = {
            title: song_info.videoDetails.title,
            url: song_info.videoDetails.video_url,
          };
        } else {
          const video_finder = async (query) => {
            const videoResult = await ytSearch(query);
            return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
          };

          const video = await video_finder(args.join(" "));

          if (video) {
            song = { title: video.title, url: video.url };
          } else {
            message.channel.send("Error finding video.");
          }
        }
        if (!server_queue) {
          const queue_constructor = {
            voice_channel: voice_channel,
            text_channel: msg.channel,
            connection: null,
            songs: [],
            loopone: false,
            loopall: false,
          };

          queue.set(msg.guild.id, queue_constructor);
          queue_constructor.songs.push(song);

          try {
            const connection = await voice_channel.join();
            queue_constructor.connection = connection;
            video_player(msg.guild, queue_constructor.songs[0]);
          } catch (err) {
            queue.delete(msg.guild.id);
            msg.channel.send("There was an Error connecting!");
            throw err;
          }
        } else {
          server_queue.songs.push(song);
          return msg.reply(
            `:musical_note: **${song.title}** was added to the queue!`
          );
        }
      }
      if (command === "skip") {
        skip_song(msg, server_queue);
      }
      if (command === "stop") {
        stop_song(msg, server_queue);
      }
      if (command === "queue") {
        list_songs(msg, server_queue);
      }
      if (command === "loop") {
        loop(msg, server_queue);
      }
    } else {
      msg.channel.send("This command is temporarily disabled!");
    }
  },
};

const video_player = async (guild, song) => {
  const song_queue = queue.get(guild.id);

  if (!song) {
    song_queue.voice_channel.leave();
    queue.delete(guild.id);
    return;
  }
  const stream = ytdl(song.url, { filter: "audioonly" });
  song_queue.connection
    .play(stream, { seek: 0, volume: 1 })
    .on("finish", () => {
      if (song_queue.loopone) {
        video_player(guild, song_queue.songs[0]);
      } else if (song_queue.loopall) {
        song_queue.songs.push(song_queue.songs[0]);
        song_queue.songs.shift();
      } else {
        song_queue.songs.shift();
      }
      video_player(guild, song_queue.songs[0]);
    });
  await song_queue.text_channel.send(
    `:musical_note: Now playing **${song.title}**`
  );
};

const skip_song = (msg, server_queue) => {
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "You need to be in a Voice Channel to use this command!"
    );
  if (!server_queue) {
    return msg.channel.send("There are no songs in the queue!");
  }
  server_queue.connection.dispatcher.end();
};

const stop_song = (msg, server_queue) => {
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "You need to be in a Voice Channel to use this command!"
    );
  server_queue.songs = [];
  server_queue.connection.dispatcher.end();
};

const list_songs = (msg, server_queue) => {
  if (!msg.member.voice.channel)
    return msg.channel.send(
      "You need to be in a Voice Channel to use this command!"
    );
  if (!server_queue) {
    return msg.channel.send("There are no songs in the queue!");
  }
  const embeds = [];
  let k = 20;
  for (let i = 0; i < server_queue.songs.length; i += 10) {
    const current = server_queue.songs.slice(i, k);
    let j = i;
    k += 10;
    const info = current
      .map((track) => `${++j}) [${track.title}](${track.url})`)
      .join("\n");
    const embed = new Discord.MessageEmbed().setDescription(
      `**[Current Song: ${server_queue.songs[0].title}](${server_queue.songs[0].url})**\n${info}`
    );
    embeds.push(embed);
  }
  msg.channel.send(embeds);
};

const loop = (msg, server_queue) => {
  const BOT_PREFIX = ",";
  const args = msg.content.slice(BOT_PREFIX.length).trim().split(/ +/);
  switch (args[1].toLowerCase()) {
    case "all":
      server_queue.loopall = !server_queue.loopall;
      server_queue.loopone = false;

      if (server_queue.loopall === true) {
        msg.channel.send("Loop all has already been enabled!");
      } else {
        msg.channel.send("Loop all has been turned off!");
      }
      break;
    case "one":
      server_queue.loopone = !server_queue.loopone;
      server_queue.loopall = false;

      if (server_queue.loopone === true) {
        msg.channel.send("Loop one has already been enabled!");
      } else {
        msg.channel.send("Loop one has been disabled!");
      }
      break;
    case "off":
      server_queue.loopall = false;
      server_queue.loopone = false;

      msg.channel.send("Loop has been disabled!");
      break;
    default:
      msg.channel.send("Please specify the loop type! ,loop <one/all/off>");
  }
};
