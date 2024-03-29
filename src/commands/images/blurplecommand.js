const { MessageAttachment, Util } = require("discord.js");
const superagent = require("superagent");
const { createEmbed } = require("../../utils/createEmbed");

module.exports = {
  name: "blurple",
  aliases: null,
  category: "Image",
  descriptions: "Add blurple filter to image",
  usage: "blurple [user]",
  options: null,
  cooldown: "8",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: ["EMBED_LINKS"],
    userperms: null
  },
  async run(client, message, args) {
    try {
      var data = await client.util.parsemsg(Util, message, args);
      var fetched = await message.channel.send(`Processing Image <a:LoadingFetch:785715659727175731>`);
    } catch {
      fetched.delete();
      return message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. Invalid Data")).then(x => x.delete({ timeout: 10000 }));
    };
    
    const { body } = await superagent.get(`https://neko-love.xyz/api/v2/blurple?url=${data}`);
    let ath = new MessageAttachment(body.url, "blurple.png")

    const e = createEmbed("info")
      .setImage("attachment://blurple.png")
      .setTimestamp()
      .setFooter(`Commanded by ${message.author.tag}`, message.author.avatarURL({ dynamic: true, size: 4096 }))
    message.channel.send({ embed: e, files: [ath] });
    fetched.delete()
  }
};
