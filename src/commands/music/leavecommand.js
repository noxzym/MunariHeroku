const { createEmbed } = require("../../utils/createEmbed");

module.exports = {
  name: "leave",
  aliases: null,
  category: "Music",
  descriptions: "Leave the current channel",
  usage: "leave",
  options: null,
  cooldown: "",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: null,
    userperms: null
  },
  async run(client, message, args) {
    const queue = message.guild.queue
    if (!queue) return message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. Nothing music are playng now")).then(x => x.delete({ timeout: 10000 }))
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. You not in the voiceChannel")).then(x => x.delete({ timeout: 10000 }))
    if (message.guild.me.voice.channel !== null && channel.id !== message.guild.me.voice.channel.id) return message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. You must join channel **\`🔊${message.guild.me.voice.channel.name}\`** to leaving me")).then(x => x.delete({ timeout: 10000 }))

    await client.player.leave(message);
    return message.channel.send(createEmbed("info", `I has been disconnected`)).then(x => x.delete({ timeout: 10000 }))
  }
};