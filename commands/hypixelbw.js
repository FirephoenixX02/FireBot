const Discord = require("discord.js");

require("dotenv").config();

const https = require("https");

module.exports = {
  name: "hypixelbw",
  description: "Shows Hypixel Stats from a Player",
  async execute(msg, args) {
    const apiKey = process.env.HYPIXEL_API;

    const playerName = args.join(" ");
    const playerUUID = "b0516eea-b4c1-4e41-bc1c-c188c94fe064";

    if (!args.length) return msg.channel.send("Please enter a player name!");

    https.get(
      `https://api.hypixel.net/player?key=${apiKey}&name=${playerName}`,
      (response) => {
        let rawAPI = ``;
        response.on(`data`, (chunk) => {
          rawAPI += chunk;
        });
        response.on(`end`, () => {
          let user = JSON.parse(rawAPI);
          //console.log(`${rawAPI}`);
          if (user.success == false && user.player == null) {
            msg.channel.send("There was an error requesting the player information!")
          }
          if (user.success == true && user.player != null) {
            let embed = new Discord.MessageEmbed()
              .setTitle(playerName)
              .setDescription("Bedwars Stats")
              .addFields(
                {
                  name: "Stars",
                  value: user.player.achievements.bedwars_level + "⭐",
                },
                {
                  name: "Wins",
                  value: user.player.stats.Bedwars.wins_bedwars,
                },
                {
                  name: "Losses",
                  value: user.player.stats.Bedwars.losses_bedwars,
                },
                {
                  name: "Kills",
                  value: user.player.stats.Bedwars.kills_bedwars,
                },
                {
                  name: "Deaths",
                  value: user.player.stats.Bedwars.deaths_bedwars,
                },
                {
                  name: "Final Kills",
                  value: user.player.stats.Bedwars.final_kills_bedwars,
                },
                {
                  name: "Final Deaths",
                  value: user.player.stats.Bedwars.final_deaths_bedwars,
                },
                {
                  name: "Final KDR",
                  value: Math.round(user.player.stats.Bedwars.final_kills_bedwars/user.player.stats.Bedwars.final_deaths_bedwars * (10 ^ 2)) / (10 ^ 2),
                },
                {
                  name: "Current Winstreak",
                  value: user.player.stats.Bedwars.winstreak,
                },
              );
            msg.channel.send(embed);
          }
        });
      }
    );
  },
};


