const Discord = require("discord.js-light");
const request = require("request");

module.exports = {
  name: "dog",
  category: "Animal",
  cooldown: "5",
  usage: "dog",
  guildOnly: true,
  async run(bot, message, args) {
    request("https://dog.ceo/api/breeds/image/random", function(error, body) {
      var result = JSON.parse(body.body);
      const embed = new Discord.MessageEmbed()
        .setColor(
          message.member.roles.cache
            .sort((a, b) => b.position - a.position)
            .first().color
        )
        .setImage(result.message)
        .setTimestamp()
        .setTimestamp()
        .setFooter(
          `Commanded by ${message.author.tag}`,
          message.author.avatarURL({ dynamic: true })
        );

      message.channel.send(embed);
    });
  }
};
