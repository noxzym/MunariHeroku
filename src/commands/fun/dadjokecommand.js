const fetch = require("node-fetch");
const { createEmbed } = require("../../utils/createEmbed")

module.exports = {
  name: "dadjoke",
  aliases: null,
  category: "Fun",
  descriptions: "dadjoke Command",
  usage: "dadjoke",
  options: null,
  cooldown: "8",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: ["EMBED_LINKS"],
    userperms: null
  },
  async run(client, message, args) {
    const data = await fetch("https://icanhazdadjoke.com/slack").then(res => res.json());
    let e = createEmbed("info")
      .setAuthor('Dad Jokes')
      .setTitle(data.attachments[0].fallback)
      .setTimestamp()
      .setFooter(`Commanded by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
    message.channel.send(e);
  }
};