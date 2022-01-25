module.exports = {
  name: "stop",
  description: "The bot will leave the Voice channel.",
  execute(msg) {
    const stop_song = (msg, server_queue) => {
      if (!msg.member.voice.channel)
        return msg.channel.send(
          "You need to be in a Voice Channel to use this command!"
        );
      server_queue.songs = [];
      server_queue.connection.dispatcher.end();
    };
  },
};
