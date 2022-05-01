module.exports = {
  name: "help",
  description: "Shows all Commands",
  execute(msg) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("All Fire Bot Commands")
      .setDescription(
        ",clear Number - Deletes a number of messages in a channel\n" +
          ",coinflip - Flips a coin\n" +
          ",dice NUMBER - Rolls a dice with the amount of faces you want\n" +
          ",help - Shows all Commands\n" +
          ",invites - Shows how many new user you invited to the server\n" +
          ",news - Gives you the Announcement Role \n" +
          ",ping - Command used for testing the Calculation time of the bot\n" +
          ",serverinfo - Gives Info about the Server your on.\n" +
          ",botinfo - Gives you Information about the Bot\n" +
          ",play + Link or Keywords - Plays Music\n" +
          ",airhorn - Plays an Airhorn Sound in the voice channel your in\n" +
          ",userinfo (@User) - Gives Info about a specific User\n" +
          ",mcserver IP PORT(Often 25565) - Get the Status of a MC Server\n" +
          ",hypixelbw IGN - Shows Hypixel BW Stats from a Player\n" +
          ",math QUESTION - Calculates a Math equation\n" +
          ",gitstatus - Get the status of the git repository\n" +
          ",imdb MOVIE- Gives info about a movie via OMDb(The Open Movie Database)\n" +
          ""
      )
      .setFooter({ text: "Bot made by NieGestorben#6618" });

    msg.channel.send({ embeds: [embed] });
  },
};
