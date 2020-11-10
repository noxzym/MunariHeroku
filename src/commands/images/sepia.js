const {MessageEmbed} = require('discord.js-light')

module.exports = {
  name: "sepia",
  aliases: [""],
  category: "Image",
  descriptions: "Make avatar compotition color to sepia",
  usage: "sepia [user]",
  options: [""],
  cooldown: "8",
  ownerOnly: false,
  async run(client, message, args) {
    const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member
    if(!member) return message.channel.send(`Please mention members first`)
    let e = new MessageEmbed()
    .setTitle(member.user.username)
    .setURL(`https://api.alexflipnote.dev/filter/sepia?image=${member.user.avatarURL({dynamic: false, size: 4096})}`)
    .setImage(`https://api.alexflipnote.dev/filter/sepia?image=${member.user.avatarURL({dynamic: false, size: 4096})}`)
    .setTimestamp()
    message.channel.send(e)
  }
}