require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE"],
});
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const BOT_PREFIX = ",";

client.on("ready", () => {
  console.log("Fire Bot is ready! ");
  client.user.setStatus("online");
  client.user.setActivity("FireClient", { type: "PLAYING" });
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(BOT_PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(BOT_PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  try {
    if (command) command.execute(msg, args);
  } catch (err) {
    msg.reply("There was an error executing the command!");
    console.log(err);
  }
});

client.on("messageDelete", (msg) => {
  //Ghost Ping Listener

  if (msg.mentions.users.first()) {
    if (msg.mentions.users.first().bot) return;
    const embed = new Discord.MessageEmbed()
      .setTitle("Ghost Ping")
      .setDescription(
        `${msg.author} ghost pinged ${msg.mentions.users.first()}`
      );
    let channel = msg.guild.channels.cache.find(
      (channel) => channel.name.toLowerCase() === "ghostping"
    );
    channel.send(embed);
  }
});

client.on("messageUpdate", async (oldMessage) => {
  if (oldMessage.mentions.users.first()) {
    if (oldMessage.mentions.users.first().bot) return;
    const embed = new Discord.MessageEmbed()
      .setTitle("Ghost Ping")
      .setDescription(
        `${oldMessage.author} ghost pinged ${oldMessage.mentions.users.first()}`
      );
    let channel = oldMessage.guild.channels.cache.find(
      (channel) => channel.name.toLowerCase() === "ghostping"
    );
    channel.send(embed);
  }

  //Welcome Message

  client.on("guildMemberAdd", (member) => {
    console.log("guildMemberAdd");

    const message = `Welcome <@${member.id}>!`;

    let channel = msg.guild.channels.cache.find(
      (channel) => channel.name.toLowerCase() === "newmember"
    );
    channel.send(message);
  });
});

client.login(process.env.BOT_TOKEN);
