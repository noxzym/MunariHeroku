const Discord = require("discord.js");
const superagent = require("superagent");
module.exports = {
  name: "bully",
  aliases: null,
  category: "Actions",
  descriptions: "Bully someone",
  usage: "bully <user>",
  options: null,
  cooldown: "8",
  ownerOnly: false,
  guildOnly: true,
  async run(client, message, args) {
    const member =
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(x => x.user.username.toLowerCase() === `${args[0]}` || x.user.username === `${args[0]}`) ||
      message.mentions.members.first()
    if (!member)
      return message.reply("You need to mention someone to bully them").then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error());
    if (member.id === client.user.id) return message.channel.send(`I don't want it`).then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error());
    const { body } = await superagent.get("https://waifu.pics/api/sfw/bully");

    const embed = new Discord.MessageEmbed()
      .setColor(message.member.displayHexColor)
      .setTitle(`${member.user.username} Bullyed by ${message.author.username}`)
      .setImage(body.url)
      .setTimestamp();
    message.channel.send({ embed });
  }
};