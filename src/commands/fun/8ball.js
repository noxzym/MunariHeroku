const Discord = require("discord.js-light");
const superagent = require("superagent");

module.exports = {
  name: "8ball",
  aliases: [""],
  category: "Fun",
  descriptions: "",
  usage: "8ball",
  options: [""],
  cooldown: "5",
  ownerOnly: false,
  async run(client, message, args) {
    if (!args[0]) return message.channel.send(`Please input some case or text`);
    if (args.length < 2)
      return message.channel.send(`Please input text minimal 2 word`);
    const { body } = await superagent.get("https://nekos.life/api/v2/8ball");
    message.channel.send(`${body.response}`);
  }
};
