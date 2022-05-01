const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Deletes a number of messages in a channel",
  args: true,
  usage: "<number greater than 0, less than 100>",
  async execute(msg, args) {
    const amount = parseInt(args[0]) + 1;
    const user = msg.author;
    const userMember = await msg.guild.members.fetch(user);

    if (isNaN(amount)) {
      return msg.reply("that doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      return msg.reply("you need to input a number between 1 and 99.");
    }
    if (
      msg.member.roles.cache.some((r) => r.name == "Admin") ||
      msg.member.roles.cache.some((r) => r.name == "I-Admin") ||
      msg.member.roles.cache.some((r) => r.name == "Administrator") ||
      msg.member.roles.cache.some((r) => r.name == "Developer")
    ) {
      msg.channel.bulkDelete(amount, true).catch((err) => {
        console.error(err);
        msg.channel.send(
          "there was an error trying to delete messages in this channel!"
        );
      });
      const embed = new Discord.MessageEmbed()
        .setDescription(`Deleted ${amount} messages.`)
        .setColor("RED");
      msg.channel.send({ embeds: [embed] }).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      })
    }
  },
};
