const Discord = require("discord.js-light");
const superagent = require("superagent");
module.exports = {
  name: "bully",
  aliases: [""],
  category: "Actions",
  descriptions: "Bully someone",
  usage: "bully <user>",
  options: [""],
  cooldown: "8",
  ownerOnly: false,
  guildOnly: true,
  async run(client, message, args) {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member)
      return message.reply("You need to mention someone to bully them");
    const { body } = await superagent.get("https://waifu.pics/api/sfw/bully");

    const embed = new Discord.MessageEmbed()
      .setColor(
        message.member.roles.cache
          .sort((a, b) => b.position - a.position)
          .first().color
      )
      .setTitle(`${member.user.username} Bullyed by ${message.author.username}`)
      .setImage(body.url)
      .setTimestamp();
    message.channel.send({ embed });
  }
};