module.exports = {
  name: "help",
  description: "Shows all Commands",
  execute(msg) {
    const Discord = require("discord.js");
    const Embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("All Fire Bot Commands")
      .setDescription(
        ",clear Number - Deletes a number of messages in a channel \n" +
          ",coinflip - Flips a coin \n" +
          ",dice NUMBER - Rolls a dice with the amount of faces you want \n" +
          ",help - Displays this menu \n" +
          ",invites - Shows how many new user you invited to the server\n" +
          ",news - Gives you the Announcement Role\n" +
          ",ping - Test if Bot or commands are working correctly\n" +
          ",serverinfo - Gives you Information about the Server\n" +
          ",botinfo - Gives you Information about the Bot\n" +
          ",play + Link or Keywords - Plays Music\n" +
          ",airhorn - Plays a Airhorn Sound\n" +
          ",userinfo (@User) - Gives Info about the User\n" +
          ",mcserver IP PORT(Often 25565) - Gives Info about a Minecraft Server\n" +
          ",hypixelbw IGN - Gives Info about the Hypixel Bedwars Stats of a player\n" +
          ",math QUESTION - Calculates a Math equation for a question\n" +
          ",bugreport Whats not working(example: help command is not working...) - Report a bug\n" +
          ""
      )
      .setFooter("Bot made by Firephoenix#6618");

    msg.channel.send(Embed);
  },
};
