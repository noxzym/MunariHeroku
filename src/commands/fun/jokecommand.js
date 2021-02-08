const Discord = require('discord.js')
const joke = require('one-liner-joke').getRandomJoke
module.exports = {
  name: "joke",
  aliases: null,
  category: "Fun",
  descriptions: "Generate joke",
  usage: "joke",
  options: null,
  cooldown: "8",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: ["EMBED_LINKS"],
    userperms: null
  },
  async run(client, message, args) {

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(joke({ exclude_tags: ['dirty', 'racist', 'marriage', 'sex', 'death'] }).body)
        .setTimestamp()
        .setFooter(`Commanded by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    )
  }
}