module.exports = {
  name: "ping",
  description: "Command used for testing the Calculation time of the bot",
  execute(msg, args, client) {
    msg.channel.send("Calculating Ping...").then((resultMessage) => {
      const ping = client.ws.ping;

      resultMessage.edit(`🏓 | Firebot's Websocket ping is ${ping}ms.`);
    });
  },
};
