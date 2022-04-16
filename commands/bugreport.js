const Discord = require("discord.js");

module.exports = {
  name: "bugreport",
  description: "Report a bug",
  async execute(msg, args, client) {
    const owner = client.users.cache.get("811904844201590825");

    const query = args.join(" ");

    if (!query) {
      msg.reply("Please specify a query to report!");
    }

    const report = new Discord.MessageEmbed()
      .setTitle("Bug Report")
      .addField("Author", msg.author)
      .addField("Guild", msg.guild.name, true)
      .setDescription(query)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    owner.send({ embeds: [report] }) && msg.reply("Your Report has been sent!");
  },
};
