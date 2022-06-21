module.exports = {
  name: "slowmo",
  description: "Change Message Delay for a channel",
  execute(msg, args) {
    if (!args.length) {
      msg.channel.send("Please specify a time period for the delay, e.g. 5s.");
    } else {
      const time = args[0];
      const delay = time.replace(/[^0-9]/g, "");
      const unit = time.replace(/[^a-z]/g, "");

      if (unit === "off") {
        msg.channel.send("Slowmode disabled.");
      } else if (unit === "s") {
        msg.channel.send(`Message delay set to ${delay} seconds.`);
        msg.channel.setRateLimitPerUser(delay);
      } else if (unit === "m") {
        msg.channel.send(`Message delay set to ${delay} minutes.`);
        msg.channel.setRateLimitPerUser(delay * 60);
      } else if (unit === "h") {
        msg.channel.send(`Message delay set to ${delay} hours.`);
        msg.channel.setRateLimitPerUser(delay * 60 * 60);
      } else if (unit === "d") {
        msg.channel.send(`Message delay set to ${delay} days.`);
        msg.channel.setRateLimitPerUser(delay * 60 * 60 * 24);
      } else {
        msg.channel.send(
          "Please specify a time period for the delay, e.g. 5s."
        );
      }
    }
  },
};
