const Discord = require("discord.js");

require("dotenv").config();

const https = require("https");

module.exports = {
  name: "hypixelbw",
  description: "Shows Hypixel BW Stats from a Player",
  async execute(msg, args) {
    const apiKey = process.env.HYPIXEL_API;

    const playerName = args.join(" ");

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

          if (!user.success && user.player == null) {
            msg.channel.send(
              "There was an error requesting the player information!"
            );
            msg.channel.send(`Reason: **${user.cause}**`);
          }

          if (user.success && user.player != null) {
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
                  value: user.player.stats.Bedwars.wins_bedwars.toString(),
                },
                {
                  name: "Losses",
                  value: user.player.stats.Bedwars.losses_bedwars.toString(),
                },
                {
                  name: "Kills",
                  value: user.player.stats.Bedwars.kills_bedwars.toString(),
                },
                {
                  name: "Deaths",
                  value: user.player.stats.Bedwars.deaths_bedwars.toString(),
                },
                {
                  name: "Final Kills",
                  value:
                    user.player.stats.Bedwars.final_kills_bedwars.toString(),
                },
                {
                  name: "Final Deaths",
                  value:
                    user.player.stats.Bedwars.final_deaths_bedwars.toString(),
                },
                {
                  name: "Final KDR",
                  value: (
                    Math.round(
                      (user.player.stats.Bedwars.final_kills_bedwars /
                        user.player.stats.Bedwars.final_deaths_bedwars) *
                        (10 ^ 2)
                    ) /
                    (10 ^ 2)
                  ).toString(),
                },
                {
                  name: "Current Winstreak",
                  value: user.player.stats.Bedwars.winstreak.toString(),
                }
              );

            msg.channel.send({ embeds: [embed] });
          }
        });
      }
    );
  },
};
