const Discord = require("discord.js");

require("dotenv").config();

const https = require("https");

module.exports = {
  name: "gitstatus",
  description: "Get the status of the git repository",
  async execute(msg) {
    var username = "FirephoenixX02";

    var options = {
      host: "api.github.com",
      path: "/repos/" + username + "/FireBot",
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    https.get(options, function (response) {
      var body = "";
      response.on(`data`, (chunk) => {
        body += chunk.toString("utf8");
      });
      response.on("end", () => {
        let json = JSON.parse(body);

        let date1 = new Date(json.created_at);
        let date2 = new Date(json.pushed_at);

        let embed = new Discord.MessageEmbed()
          .setTitle("GitHub Status")
          .setURL("https://github.com/FirephoenixX02/FireBot/")
          .addFields(
            {
              name: "Name",
              value: json.name.toString(),
            },
            {
              name: "Description",
              value: json.description.toString(),
            },
            {
              name: "Main Branch",
              value: json.default_branch.toString(),
            },
            {
              name: "Owner",
              value: json.owner.login.toString(),
            },
            {
              name: "Language",
              value: json.language.toString(),
            },
            {
              name: "Creation Date",
              value: date1.toLocaleDateString(),
            },
            {
              name: "Last Push",
              value: date2.toLocaleDateString(),
            },
            {
              name: "Forks",
              value: json.forks.toString(),
            },
            {
              name: "Open Issues",
              value: json.open_issues_count.toString(),
            }
          );
        msg.channel.send({ embeds: [embed] });
      });
    });
  },
};
