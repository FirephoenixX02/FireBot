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
          ",dice - Rolls a dice \n" +
          ",help - Displays this menu \n" +
          ",invites - Shows how many new user you invited to the server\n" +
          ",news - Gives you the Announcement Role\n" +
          ",ping - Test if Bot or commands are working correctly\n" +
          ",randomNumber10 - Outputs a random number between 1 and 10\n" +
          ",randomNumber100 - Outputs a random number between 1 and 100\n" +
          ",serverinfo - Gives you Information about the Server\n" +
          ",botinfo - Gives you Information about the Bot\n" +
          ",play + Link or Keywords - Plays Music\n" +
          ",airhorn - Plays a Airhorn Sound\n" +
          ",userinfo (@User) - Gives Info about the User\n" +
          ",mcserver IP PORT(Often 25565) - Gives Info about a Minecraft Server\n" +
          ""
      )
      .setFooter("Bot made by Firephoenix#6618");

    msg.channel.send(Embed);
  },
};
