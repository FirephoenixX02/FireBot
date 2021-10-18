module.exports = {
  name: "clear",
  description: "Clear messages from the channel.",
  args: true,
  usage: "<number greater than 0, less than 100>",
  async execute(msg, args) {
    const amount = parseInt(args[0]) + 1;
    const user = msg.author;
    const userMember = await msg.guild.members.fetch(user)

    if (isNaN(amount)) {
      return msg.reply("that doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      return msg.reply("you need to input a number between 1 and 99.");
    }
    if (userMember.hasPermission("ADMINISTRATOR")) {
      msg.channel.bulkDelete(amount, true).catch((err) => {
        console.error(err);
        msg.channel.send(
          "there was an error trying to delete messages in this channel!"
        );
      });
    }
  },
};
