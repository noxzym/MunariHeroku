const fetch = require('node-fetch')
module.exports = {
    name: "docs",
    aliases: [""],
    category: "General",
    descriptions: "Display discord.js documentation",
    usage: "docs <query>",
    options: [""],
    cooldown: "5",
    ownerOnly: false,
    guildOnly: true,
    async run(client, message, args) {
        
        const input = args.join(' ')
        if (!input) return message.channel.send(`Please input query`)

        await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(input)}`)
            .then(res => res.json())
            .then(embed => {
                if (embed && !embed.eror) {
                    message.channel.send({ embed })
                } else {
                    return message.channel.send(`I can't search the query`)
                }
            })
            .catch(e => {
                console.log(e)
                message.channel.send(`I can't search the query`)
            })

    }
}