const client = require("../bot.js")
const ms = require("ms")
const timeSpan = ms('2 days')

client.on('guildMemberAdd', (member) => {
    const createdAt = new Date(member.createdAt).getTime();
    const difference = Date.now() - createdAt;

    if(difference < timeSpan) {
        member.send("You are an alt account!")
        member.ban({ reason: "You are an alt account"})
    }
})