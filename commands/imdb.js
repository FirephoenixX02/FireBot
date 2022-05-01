require("dotenv").config();
const Discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
  name: "imdb",
  description: "Gives info about a movie via OMDb(The Open Movie Database)",
  async execute(msg, args) {
    if (!args.length) return msg.channel.send("Please enter a movie name!");

    const imob = new imdb.Client({ apiKey: process.env.IMDB });

    let movie = await imob.get({ name: args.join(" ") });

    let embed = new Discord.MessageEmbed()
      .setTitle(movie.title)
      .setColor("RED")
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .setFooter({ text: `Rating: ${movie.rating}` })
      .addFields(
        {
          name: "Country",
          value: movie.country,
        },
        {
          name: "Languages",
          value: movie.language ? movie.language : "N/A",
        },
        {
          name: "Type",
          value: movie.type.toString(),
        },
        {
          name: "Awards",
          value: movie.awards,
        },
        {
          name: "Release Date ",
          value: movie.released.toString(),
        },
        {
          name: "Rated",
          value: movie.rated,
        },
        {
          name: "Website",
          value: movie.website,
        },
        {
          name: "Movie Director",
          value: movie.director,
        },
        {
          name: "Production",
          value: movie.production,
        }
      );
    msg.channel.send({ embeds: [embed] });
  },
};
