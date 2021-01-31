const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "bug",
    aliases: ["error"],
    category: "Utility",
    descriptions: "Report to developer about bug or error command",
    usage: "bug <commands> <descriptiom>",
    options: null,
    cooldown: "120",
    ownerOnly: false,
    guildOnly: true,
    missing: {
        botperms: null,
        userperms: null
    },
    async run(client, message, args) {
        let input = args.join(' ')
        if (!input) return message.inlineReply(`Please input your problem`).then(x => { x.delete({ timeout: 8000 }) })
        if (input.length > 120) return message.inlineReply(`Promblem description must < 120 word`).then(msg => { msg.delete({ timeout: 5000 }) }).catch(console.error());

        const sname = message.guild.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

        let e = new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setTitle(`Report Command`)
            .setTimestamp()
            .setDescription(`\`${message.author.tag} • ${message.author.id}\`\nProblem Description\n\`\`\`asciidoc\n${input}\n\`\`\``)
        const guild = client.guilds.cache.get('770540956163899423').channels.cache.get('773853948359737357')
        guild.send({ embed: e })

        let channel = new MessageEmbed()
            .setTitle(`Report to developer successful!`)
            .setDescription(`**Problem Description: \n\`\`\`asciidoc\n${input}\n\`\`\`**`)
        message.channel.send(channel).then(x => { x.delete({ timeout: 10000 }) })
    }
}