const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Create a Support Ticket",
  async execute(msg) {
    const channel = await msg.guild.channels.create(
      `ticket: ${msg.author.tag}`
    );

    channel.permissionOverwrites.edit(msg.guild.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
    });

    channel.permissionOverwrites.edit(msg.author, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
    });

    try {
      const buttons = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("Lock")
          .setLabel("Lock")
          .setStyle(1)
          .setEmoji("🔒"),
        new Discord.MessageButton()
          .setCustomId("Unlock")
          .setLabel("Unlock")
          .setStyle(3)
          .setEmoji("🔓"),
        new Discord.MessageButton()
          .setCustomId("Delete")
          .setLabel("Delete")
          .setStyle(4)
          .setEmoji("🗑️")
      );

      const buttonMessage = await channel.send({
        content: "Thank you for contacting our support team!",
        components: [buttons],
      });

      const collector = buttonMessage.createMessageComponentCollector({
        componentType: "BUTTON",
      });

      collector.on("collect", async (i) => {
        if (i.customId === "Lock") {
          channel.permissionOverwrites.edit(msg.author, {
            SEND_MESSAGES: false,
          });

          i.deferUpdate();
        }
        if (i.customId === "Delete") {
          i.deferUpdate();
          channel.send("This channel will be deleted in 2s!");
          setTimeout(() => channel.delete(), 2000);
        }
        if (i.customId === "Unlock") {
          channel.permissionOverwrites.edit(msg.author, {
            SEND_MESSAGES: true,
          });

          i.deferUpdate();
        }
      });
    } catch (err) {
      channel.send(
        "There was an error adding the Buttons to the Message or responding to a interaction!"
      );

      throw err;
    }

    msg.channel
      .send(`We will be right with you! ${channel}`)
      .then((message) => {
        setTimeout(() => message.delete(), 7000);
        setTimeout(() => msg.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
