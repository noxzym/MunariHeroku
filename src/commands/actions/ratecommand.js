module.exports = {
  name: "rate",
  aliases: null,
  category: "Actions",
  descriptions: "rate someone",
  usage: "rate [user]",
  options: null,
  cooldown: "5",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: ["EMBED_LINKS"],
    userperms: null
  },
  async run(client, message, args) {
    const ratus =
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(x => x.user.username.toLowerCase() === `${args[0]}` || x.user.username === `${args[0]}`) ||
      message.mentions.members.first() ||
      message.member;
    if (!ratus) return message.channel.send("Tag someone to rate them!");
    if (ratus.id === client.user.id) return;

    let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    let result = Math.floor(Math.random() * rates.length);

    message.channel.send(`Hold a moment <a:loading1:753610786991112282>`).then(msg => { setTimeout(function () { msg.edit(`${ratus} have ${result}/10 score`); }, 5000); });
  }
};
