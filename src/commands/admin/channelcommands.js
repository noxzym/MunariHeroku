const { MessageEmbed, Message } = require('discord.js')
module.exports = {
    name: "channel",
    aliases: ["ch"],
    category: "Administration",
    descriptions: "Setting channel",
    usage: "ch <channel[mention/id]> <argumen>",
    options: ["--lock", "--unlock", "--slowmode", "--nuke"],
    cooldown: "",
    ownerOnly: false,
    guildOnly: true,
    async run(client, message, args) {
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
        if (!channel) {
            const e = new MessageEmbed()
                .setColor('RED')
                .setDescription(`\`\`\`md\nUsage: m!channel <channel[mention/id]> <argumen>\nArgumen Options: \n* <--lock>, <--unlock>, <--slowmode>, <--nuke>\nExample: m!channel #general <--lock>\n\`\`\``)
            return message.channel.send(e)
        } 

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS' || 'ADMINISTRATOR')) return message.channel.send(`I need permissions for **\`MANAGE_CHANNELS\`** or **\`ADMINISTRATOR\`**`)
        if (!message.member.hasPermission('MANAGE_CHANNELS' || 'ADMINISTRATOR')) return message.channel.send(`You need permissions for **\`MANAGE_CHANNELS\`** or **\`ADMINISTRATOR\`**`)

        if (message.content.includes('--lock')) {
            try {
                var react = await message.channel.send(`Are you sure to Lock Channel **\`${channel.name}\`**?`);
                await react.react('✅');
                await react.react('❎');
                const filter = (reaction, user) => user.id !== message.client.user.id && user.id === message.author.id;
                var collector = react.createReactionCollector(filter, { time: 20000 });
                collector.on('collect', (reaction, user) => {
                    if (collector && !collector.ended) collector.stop();
                    switch (reaction.emoji.name) {
                        case "✅":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:yes:765207711423004676> | Locked Channel **\`${channel.name}\`** successful!`)
                            channel.permissionOverwrites.map(x => {
                                channel.updateOverwrite(x.id, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false
                                })
                            })
                            break;

                        case "❎":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:no:765207855506522173> | Locked Channel **\`${channel}\`** has canceled!`)
                            break;

                        default:
                            reaction.users.remove(user).catch(console.error)
                            break;
                    }
                })
                collector.on('end', () => {
                    react.reactions.removeAll().catch(console.error);
                })
            } catch (e) {
                console.log(e)
            }
        } else if (message.content.includes('--unlock')) {
            try {
                var react = await message.channel.send(`Are you sure to Unlock Channel **\`${channel.name}\`**?`);
                await react.react('✅');
                await react.react('❎');
                const filter = (reaction, user) => user.id !== message.client.user.id && user.id === message.author.id;
                var collector = react.createReactionCollector(filter, { time: 20000, errors: ['time'] });
                collector.on('collect', (reaction, user) => {
                    if (collector && !collector.ended) collector.stop();
                    switch (reaction.emoji.name) {
                        case "✅":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:yes:765207711423004676> | Unocked Channel **\`${channel.name}\`** successful!`)
                            channel.permissionOverwrites.map(x => {
                                channel.updateOverwrite(x.id, {
                                    SEND_MESSAGES: true,
                                    ADD_REACTIONS: true
                                })
                            })
                            break;

                        case "❎":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:no:765207855506522173> | Unlocked Channel **\`${channel}\`** has canceled!`)
                            break;

                        default:
                            reaction.users.remove(user).catch(console.error)
                            break;
                    }
                })
                collector.on('end', () => {
                    react.reactions.removeAll().catch(console.error);
                })
            } catch (e) {
                console.log(e)
            }
        } else if (message.content.includes('--slowmode')) {
            const number = args[1]
            if (!number) return message.channel.send(`Please provide the time to slowmode channel **\`${channel.name}\`**`)
            if (isNaN(number)) return message.channel.send(`Please input the correct number in second`)
            if (number > 21600) return message.channel.send(`Maximal number is 21600 second or 6 hours`)
            if (number < 0) return message.channel.send(`Minimal number is 0 second`)

            try {
                var react = await message.channel.send(`Are you sure to slowmode Channel **\`${channel.name}\`** for ${number}s ?`);
                await react.react('✅');
                await react.react('❎');
                const filter = (reaction, user) => user.id !== message.client.user.id && user.id === message.author.id;
                var collector = react.createReactionCollector(filter, { time: 20000, errors: ['time'] });
                collector.on('collect', (reaction, user) => {
                    if (collector && !collector.ended) collector.stop();
                    switch (reaction.emoji.name) {
                        case "✅":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:yes:765207711423004676> | Set slowmode Channel **\`${channel.name}\`** successful!`)
                            channel.rateLimitPerUser(number)
                            break;

                        case "❎":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:no:765207855506522173> | Set slowmode Channel **\`${channel}\`** has canceled!`)
                            break;

                        default:
                            reaction.users.remove(user).catch(console.error)
                            break;
                    }
                })
                collector.on('end', () => {
                    react.reactions.removeAll().catch(console.error);
                })
            } catch (e) {
                console.log(e)
            }
        } else if (message.content.includes('--nuke')) {
            try {
                var react = await message.channel.send(`Are you sure to Nuke Channel **\`${channel.name}\`**?`);
                await react.react('✅');
                await react.react('❎');
                const filter = (reaction, user) => user.id !== message.client.user.id && user.id === message.author.id;
                var collector = react.createReactionCollector(filter, { time: 20000, errors: ['time'] });
                collector.on('collect', (reaction, user) => {
                    if (collector && !collector.ended) collector.stop();
                    switch (reaction.emoji.name) {
                        case "✅":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:yes:765207711423004676> | Nuke Channel **\`${channel.name}\`** successful!`)
                            channel.clone().then(x => {message.guild.channels.cache.get(x.id).send(`Nothing in here, Nuke command successful!`)})
                            setTimeout(() => {
                                channel.delete(`Nuke Command Successful!`)
                            }, 2000);
                            break;

                        case "❎":
                            reaction.users.remove(user).catch(console.error)
                            react.edit(`<a:no:765207855506522173> | Nuke Channel **\`${channel}\`** has canceled!`)
                            break;

                        default:
                            reaction.users.remove(user).catch(console.error)
                            break;
                    }
                })
                collector.on('end', () => {
                    react.reactions.removeAll().catch(console.error);
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
