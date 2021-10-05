const channelID = "882599174225420338";
const check = "✅";
let registered = false;

module.exports = {
  name: "ticket",
  description: "Creates a Support Ticket.",
  minArgs: 1,
  expectedArgs: "<msg>",
  execute(userMsg, args, text) {
    const registerEvent = (client) => {
      if (registered) {
        return;
      }

      registered = true;

      console.log("Registering Event");

      client.on("message", (reaction, user) => {
        console.log("Handling Reaction");
        const { msg } = reaction;
        if (msg.channel.id === channelID) {
          msg.delete();
        }
      });
    };  
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const { guild, member } = userMsg;

    registerEvent(client);

    const channel = guild.channels.cache.get(channelID);
    channel
      .send(
        `A new Support Ticket has been created by <@${member.id}>
        "${text}"

Click the ${check} icon then this ticket has been resolved`

      )
      .then((ticketMsg) => {
        ticketMsg.react(check);

        userMsg.reply("Your ticket has been created! Expect a reply in 24h.");
        userMsg.delete();
      });
  },
};
