const Discord = require("discord.js");

module.exports = {
  name: "news",
  description: "Gives you to the Announcement Ping Role ",
  execute(msg) {

    msg.member.roles.add("882232969325076581");
    msg.reply(`Successfully added news role to member ${msg.author}`);
  },
};
