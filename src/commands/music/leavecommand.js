module.exports = {
  name: "leave",
  aliases: [""],
  category: "Music",
  descriptions: "Leave the current channel",
  usage: "leave",
  options: [""],
  cooldown: "",
  ownerOnly: false,
  guildOnly: true,
  async run(client, message, args) {
    const { channel } = message.member.voice;
    const serverQueue = client.queue.get(message.guild.id);
    if (!channel) return message.reply("You need to join a voice channel first!").then(msg => { msg.delete({ timeout: 5000 }) })
      .catch(console.error);
    if (!message.guild.me.voice.channel)
      return message.reply("I am not in a voice channel!").then(msg => { msg.delete({ timeout: 5000 }) })
        .catch(console.error);
    if (channel.id !== message.guild.me.voice.channel.id)
      return message.reply("I am not in your voice channel!").then(msg => { msg.delete({ timeout: 5000 }) })
        .catch(console.error);
    if (serverQueue) {
      serverQueue.connection.dispatcher.destroy();
      channel.leave();
      message.client.queue.delete(message.guild.id);
      client.channels.cache.get(serverQueue.textChannel).send('I have disconnected!').then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error);
      return
    } else {
      channel.leave();
      message.client.queue.delete(message.guild.id);
      message.channel.send('I have disconnected!').then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error);
    }
  }
};