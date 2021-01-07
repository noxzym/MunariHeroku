const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "queue",
  aliases: ["q"],
  category: "Music",
  descriptions: "Display queuelist of song",
  usage: "queue",
  options: [""],
  cooldown: "",
  ownerOnly: false,
  guildOnly: true,
  run: async function (client, message, args) {
    try {
      const queue = client.queue.get(message.guild.id)
      if (!queue) return message.channel.send(`Nothing are playing now`)
      try {
        let page = 0;
        const embeds = geneembed(message, queue.songs);
        let e = new MessageEmbed()
        const embed = await message.channel.send(embeds[page])
        await embed.react("⬅️");
        await embed.react("❎");
        await embed.react("➡️");
        const filter = (reaction, user) => user.id !== message.client.user.id;
        var collector = embed.createReactionCollector(filter, { time: 60000 });
        collector.on("collect", (reaction, user) => {

          switch (reaction.emoji.name) {
            case "⬅️":
              reaction.users.remove(user).catch(console.error);
              if (page !== 0) {
                --page;
                embed.edit(embeds[page]);
              }
              break;

            case "❎":
              reaction.users.remove(user).catch(console.error);
              collector.stop()
              reaction.message.reactions.removeAll()
              break;

            case "➡️":
              reaction.users.remove(user).catch(console.error);
              if (page < embeds.length - 1) {
                page++;
                embed.edit(embeds[page]);
              }
              break;

            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        })
      } catch (e) {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
    }
    function geneembed(message, queue) {
      const embeds = [];
      let k = 5
      for (let i = 0; i < queue.length; i += 5) {
        const current = queue.slice(i + 1, k + 1);
        let j = i
        k += 5
        const inf = current.map((x) => `**${++j} • [${x.title}](${x.url}) \`【${x.requester.username}】\`**`).join('\n')

        let e = new MessageEmbed()
          .setColor('ff0000')
          .setAuthor("Youtube Client Queue", 'https://media.discordapp.net/attachments/743752317333143583/786185147706900490/YouTubeLogo.png?width=270&height=270')
          .setThumbnail(queue[0].thumbnail)
          .setDescription(`** • [${queue[0].title}](${queue[0].url}) \`【${queue[0].requester.username}】\` • \n\n▬▬▬▬▬▬▬▬ List of Queue ▬▬▬▬▬▬▬▬**\n${inf}`)
          .setTimestamp();

        if (queue.length === 1) {
          e.setDescription(
            `** • [${queue[0].title}](${queue[0].url}) \`【${queue[0].requester.username}】\` • \n\n▬▬▬▬▬▬▬▬ List of Queue ▬▬▬▬▬▬▬▬**\nNo song in here? use **\`m!play <song[title/url]>\`**`
          )
        }
        embeds.push(e)
      }
      return embeds;
    }
  }
}