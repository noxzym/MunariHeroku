const { readdirSync } = require("fs");

module.exports = {
  name: "restart",
  aliases: null,
  category: "Developer",
  descriptions: null,
  usage: "restart",
  options: null,
  cooldown: null,
  ownerOnly: true,
  guildOnly: true,
  missing: {
    botperms: null,
    userperms: null
  },
  async run(client, message, args) {
    process.exit(1)
  }
} 