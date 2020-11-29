const Discord = require('discord.js')
const moment = require('moment')
module.exports = {
  name: "eval",
  aliases: ["ev"],
  category: "Developer",
  descriptions: "",
  usage: "ev <code>",
  options: [""],
  cooldown: "",
  ownerOnly: true,
  guildOnly: true,
  async run(client, message) {
  message.delete()
  const args = message.content.split(" ").slice(1);
  try {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
        let codein = args.join(" ");
        if(!codein) return
        let code = await eval(codein);    

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });

      var output = await message.channel.send(`\`\`\`js\n${clean(code).replace(client.token, "-").replace(client.config, "-")}\n\`\`\``)
      await output.react('❎')

      const filter = (reaction, user) => {
          return ['❎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        output.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '❎') {
            output.delete()
            } else {return}
         })
          .catch(e => {return});
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  }
}