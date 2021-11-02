const Discord = require('discord.js')

const ms = require("ms")

const math = require("mathjs")

module.exports = {
    name: "math",
    description: "calculate something",

    async execute(msg, args) {
        try {
            msg.channel.send(
                new Discord.MessageEmbed()
                .addField('Question', args.join(" "))
                .addField('Solution', math.evaluate(args.join(" ")))
            )
        } catch {
            msg.channel.send("Your Question is invalid!")
        }
    }
}