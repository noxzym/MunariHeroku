const Discord = require("discord.js-light");
module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "General",
  descriptions: "Display avatar user",
  usage: "General",
  options: [""],
  cooldown: "3",
  ownerOnly: false,
  async run(bot, message, args) {
    let member =
      message.guild.members.cache.get(args[0]) ||
      message.mentions.members.first() ||
      message.member;
    let color = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .first().color;
    let exampleEmbed = new Discord.MessageEmbed()

      .setTitle(`${member.user.tag}`)
      .setURL(`${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setColor(color)
      .setFooter(
        `Commanded by ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send({ embed: exampleEmbed });
  }
};
