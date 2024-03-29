const Discord = require("discord.js");
module.exports = {
  name: "prune",
  aliases: ["clear"],
  category: "Moderation",
  descriptions: "Delete message up to 99",
  usage: "prune <message count>",
  options: null,
  cooldown: "5",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: ["MANAGE_MESSAGES", "EMBED_LINKS"],
    userperms: ["MANAGE_MESSAGES"]
  },
  async run(bot, message) {
  const args = message.content.split(' ').slice(1);
  const amount = args.join(' ');
  message.delete();
    if (isNaN(amount)) return message.reply('Please input provide number').then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error());
    if (amount > 99) return message.reply(`I can't delete over 99 message`).then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error());
  if (amount < 1) return;
  
  await message.channel.messages.fetch({ limit: amount }).then(messages => {message.channel.bulkDelete(messages)});
}}