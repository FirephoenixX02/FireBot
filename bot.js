require("dotenv").config();

const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  partials: ["CHANNEL", "MESSAGE"],
});
client.commands = new Collection();
client.giveaways = new GiveawaysManager(client, {
  storage : './resources/giveaways.json',
  updateCountdownEvery: 5000,
  embedColor : '#ed4245',
  reaction : '🎉',
  botsCanWin: false
})

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const BOT_PREFIX = ",";

client.on("ready", () => {
  console.log("Fire Bot is ready...");
  client.user.setStatus("online");
  client.user.setActivity("FireClient", { type: "PLAYING" });
});

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(BOT_PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(BOT_PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  try {
    if (command) command.execute(msg, args, client);
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
    console.log("Guild Member Add Event fired!");

    const message = `Welcome <@${member.id}>!`;

    let channel = client.channels.cache.find(
      (channel) => channel.name.toLowerCase() === "newmember"
    );
    channel.send(message);
  });
});

client.login(process.env.BOT_TOKEN);
