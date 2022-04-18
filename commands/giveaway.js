const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "giveaway",
  description: "Start a giveaway",
  async execute(msg, args, client) {
    if (
      msg.member.roles.cache.some((r) => r.name == "Admin") ||
      msg.member.roles.cache.some((r) => r.name == "I-Admin") ||
      msg.member.roles.cache.some((r) => r.name == "Administrator") ||
      msg.member.roles.cache.some((r) => r.name == "Developer")
    ) {
      const channel = msg.mentions.channels.first();
      if (!channel) {
        return msg.channel.send(
          "Please specify a channel where the giveaway will be created."
        );
      }

      const duration = args[1];

      if (!duration) {
        msg.channel.send("Please specify a duration for the giveaway.");
      }
      const winners = args[2];

      if (!winners) {
        msg.channel.send(
          "Please specify the number of winners for the giveaway."
        );
      }

      const prize = args.slice(3).join(" ");

      if (!prize)
        return msg.channel.send("Please specify the prize for the giveaway.");

      client.giveaways.start(channel, {
        duration: ms(duration),
        prize: prize,
        winnerCount: parseInt(winners),
        hostedBy: msg.author,
        messages: {
          giveaway: "@everyone",
          giveawayEnd: "@everyone " + "Giveaway Ended",
          timeRemaining: "Time Remaining: **{duration}**",
          inviteToParticipate: "React with 🎉 to join the giveaway",
          winMessage: "Congratulation {winners}, you have won the giveaway",
          embedFooter: "Bot made by NieGestorben#6618",
          noWinner: "Could not determine a winner",
          hostedBy: `Hosted by ${msg.author}`,
          winners: "winners",
          endedAt: "Ends at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false,
          },
        },
      });
      msg.channel.send(`Giveaway is starting in ${channel}`);
    } else {
      msg.channel.send(
        "You dont have the right permissions to execute this command."
      );
    }
  },
};
