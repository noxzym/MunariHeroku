const { LavasfyClient } = require("lavasfy");
const { Shoukaku } = require('shoukaku');
const { getPreview } = require('spotify-url-info');
const { createEmbed } = require("./createEmbed");

const MuriNode = { name: "MuriNode", host: "MuriNode.orchitiadi.repl.co", secure: true, port: 443, auth: 'youshallnotpass' };
const MuriNode2 = { name: "MuriNode2", host: "MuriNode2.orchitiadi.repl.co", secure: true, port: 443, auth: 'youshallnotpass' };
const MuriNode3 = { name: "MuriNode3", host: "MuriNode3.orchitiadi.repl.co", secure: true, port: 443, auth: 'youshallnotpass' }
const LavalinkServer = [MuriNode, MuriNode2, MuriNode3];
const ShoukakuOptions = { moveOnDisconnect: true, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };

module.exports = class ShoukakuHandler {
  constructor(client) {
    this.client = client;
    this.manager = new Shoukaku(client, LavalinkServer, ShoukakuOptions);
  };
  async repeat(message) {
    message.guild.queue.loop = !message.guild.queue.loop;
  };
  async skip(message) {
    message.guild.queue.connection.stopTrack();
  };
  async stop(message) {
    message.guild.queue.connection.stopTrack();
    message.guild.queue.connection.disconnect();
    message.guild.queue = null;
  };
  async leave(message) {
    message.guild.queue.connection.disconnect();
    message.guild.queue = null;
  }
  async pause(message) {
    message.guild.queue.connection.setPaused(true);
    message.guild.queueta.playing = false;
  };
  async resume(message) {
    message.guild.queue.connection.setPaused(false);
    message.guild.queue.playing = true;
  };
  async getSongs(query, option) {
    const spotifyregex = /^(?:https:\/\/open\.spotify\.com\/(?:user\/[A-Za-z0-9]+\/)?|spotify:)(album|playlist|track)(?:[/:])([A-Za-z0-9]+).*$/;
    var lavasfy = new LavasfyClient({ clientID: this.client.config.spcid, clientSecret: this.client.config.spcs, filterAudioOnlyResult: false }, this.client.config.nodes);
    var node = await this.manager.getNode()
    if (spotifyregex.test(query)) {
      await lavasfy.requestToken();
      const load = lavasfy.nodes.get(this.manager.getNode().name).load(query);
      return load;
    } else if (option === "spotify") {
      if (spotifyregex.test(query)) {
        await lavasfy.requestToken();
        const node = lavasfy.nodes.get(this.manager.getNode().name);
        const load = await node.load(query);
        return load;
      } else {
        const data = await getPreview(query);
        await lavasfy.requestToken();
        const node = lavasfy.nodes.get(this.manager.getNode().name);
        const load = await node.load(data.link);
        return load;
      };
    } else if (option === undefined) {
      const load = await node.rest.resolve(query, "youtube");
      return load;
    } else {
      const load = await node.rest.resolve(query, option);
      return load;
    }
  };
  async play(track, message) {
    try {
      message.guild.queue.connection.playTrack(track.track, { noReplace: true });
      message.guild.queue.connection.on("start", async () => {
        let e = createEmbed("info")
          .setAuthor(`${this.client.user.username} • Playing`, this.client.user.avatarURL({ dynamic: true, size: 4096, format: "png" }))
          .setDescription(`**[\`${message.guild.queue.songs[0].title}\`]\nDuration: \`${message.guild.queue.songs[0].duration}\`**`)
          .setThumbnail(message.guild.queue.songs[0].thumbnail)
          .setTimestamp()
          .setFooter(`Requested by ${message.guild.queue.songs[0].requester.username}`)
        this.client.channels.cache.get(message.guild.queue.textChannel).send(e)
      });
      message.guild.queue.connection.on("end", async () => {
        let songtopush = await message.guild.queue.songs.shift();
        if (message.guild.queue.loop) {
          message.guild.queue.songs.push(songtopush);
          message.guild.queue.connection.playTrack(message.guild.queue.songs[0].track, { noReplace: true });
        } else if (message.guild.queue.songs.length === 0) {
          await this.client.channels.cache.get(message.guild.queue.textChannel).send(createEmbed("info", "Request more song to keep me in the voice channel")).then(msg => { msg.delete({ timeout: 10000 }); })
          return this.leave(message);
        } else {
          message.guild.queue.connection.playTrack(message.guild.queue.songs[0].track, { noReplace: true });
        }
      });
      message.guild.queue.connection.on("closed", () => {
        this.leave(message);
      });
      message.guild.queue.connection.on("error", () => {
        this.leave(message);
      });
      message.guild.queue.connection.on("nodeDisconnect", () => {
        this.leave(message);
      });
    } catch (e) {
      console.log(e);
      message.guild.queue.connection.disconnect()
      message.guild.queue = null;
    }
  }
}