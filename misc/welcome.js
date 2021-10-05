module.exports = client => {
  client.on('guildMemberAdd', member => {
    console.log('guildMemberAdd')

    const message = `Welcome <@${member.id}>!`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
  })
}