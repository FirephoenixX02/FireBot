const util = require("minecraft-server-util");
const Discord = require("discord.js");

module.exports = {
  name: "mcserverdetailed",
  description: "Get the detailed Status of a MC Server",
  execute(msg, args) {
    if (!args[0]) return msg.reply("Please enter a Minecraft Server IP!");
    if (!args[1]) return msg.reply("Please enter Minecraft Server Port!");

    util
      .status(args[0], { port: parseInt(args[1]) })
      .then((response) => {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Server Status")
          .addFields(
            {
              name: "Server IP",
              value: response.host,
            },
            {
              name: "Online Players",
              value: JSON.stringify(response.onlinePlayers),
            },
            {
              name: "Max Players",
              value: JSON.stringify(response.maxPlayers),
            },
            {
              name: "Version",
              value: response.version,
            }
          )
          .setFooter({ text: "Mc Server Util by NieGestorben#6618" });

        msg.channel.send({ embeds: [embed] });
      })
      .catch((err) => {
        msg.reply("There was an error pinging the Server. Please try again!");
        throw err;
      });
    util
      .status(args[0], { port: parseInt(args[1]) })
      .then((response) => {
        const embedDetail = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Server Status")
          .addFields(
            {
              name: "Mod Info",
              value: JSON.stringify(response.modInfo),
            },
            {
              name: "Port",
              value: JSON.stringify(response.port),
            },
            {
              name: "Protocol Version",
              value: JSON.stringify(response.protocolVersion),
            },
            {
              name: "Calculation Time",
              value: response.roundTripLatency + "ms",
            },
            {
              name: "Description",
              value: response.description.descriptionText,
            }
          )
          .setFooter({ text: "Mc Server Util by NieGestorben#6618" });
        msg.channel.send({ embeds: [embedDetail] });
      })
      .catch((err) => {
        msg.reply("There was an error pinging the Server. Please try again!");
        throw err;
      });
  },
};
