const Discord = require("discord.js");
const api = require("novelcovid");

module.exports = {
  name: "corona",
  description: "Gets the Corona Cases of a Country or the whole World",
  async execute(msg, args) {
    const enabled = false;
    if (enabled == true) {
      if (!args.length) {
        return msg.reply("Please specify a Country");
      }
      if (!args.join(" ") == "global") {
        const data = await api.all(); //Global Cases
        const embed = new Discord.MessageEmbed()
          .setTitle("Global Cases")
          .setColor("RED")
          .setDescription(
            "Case Numbers may be different and shouldn't be used as advice in any Way. They are just used to get a overview of the situation."
          )
          .addFields(
            {
              name: "Total Cases",
              value: data.cases,
            },
            {
              name: "Total Deaths",
              value: data.deaths,
            },
            {
              name: "Total Recovered",
              value: data.recovered,
            },
            {
              name: "Today's Cases",
              value: data.todayCases,
            },
            {
              name: "Today's Deaths",
              value: data.todayDeaths,
            },
            {
              name: "Active Cases",
              value: data.active,
            },
            {
              name: "Total Tests Done",
              value: data.tests,
            }
          );
        msg.channel.send(embed);
      } else {
        const data = await api.countries(args.join(" ")); //Country Cases

        const embed = new Discord.MessageEmbed()
          .setTitle(`${data.country}`)
          .setColor("RED")
          .setDescription(
            "Case Numbers may be different and shouldn't be used as advice in any Way. They are just used to get a overview of the situation."
          )
          .addFields(
            {
              name: "Total Cases",
              value: data.cases,
            },
            {
              name: "Total Deaths",
              value: data.deaths,
            },
            {
              name: "Total Recovered",
              value: data.recovered,
            },
            {
              name: "Today's Cases",
              value: data.todayCases,
            },
            {
              name: "Today's Deaths",
              value: data.todayDeaths,
            },
            {
              name: "Active Cases",
              value: data.active,
            }
          );
        msg.channel.send(embed);
      }
    } else {
      msg.channel.send(
        "This command is temporarily disabled due to maintenance!"
      );
    }
  },
};
