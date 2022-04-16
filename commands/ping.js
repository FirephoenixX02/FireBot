module.exports = {
  name: "ping",
  description: "Command used for testing the Calculation time of the bot",
  execute(msg) {
    msg.channel.send("Calculating Ping...").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - msg.createdTimestamp;

      resultMessage.edit(`🏓 | Firebot's Calculation time is ${ping}ms.`);
    });
  },
};
