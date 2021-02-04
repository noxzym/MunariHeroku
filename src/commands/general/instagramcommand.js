const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createEmbed } = require("../../utils/Function");
const { registerFont, createCanvas, loadImage } = require('canvas');
const { Circle } = require("../../utils/Imagegen");
const fetch = require('node-fetch');
const path = require('path');
registerFont(path.join(__dirname, '..', '..', '..', 'src', 'data', 'fonts', 'nishiki.ttf'), { family: 'Sans' });

module.exports = {
  name: "instagram",
  aliases: ["insta", "ig"],
  category: "General",
  descriptions: "Display instagram information",
  usage: "instagram <username>",
  options: ["--nocanvas"],
  cooldown: "15",
  ownerOnly: false,
  guildOnly: true,
  missing: {
    botperms: null,
    userperms: null
  },
  async run(client, message, args) {
    try {
      const username = args[0];
      if (!username) return message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. You need to input username")).then(x => { x.delete({ timeout: 10000 }) })

      try {
        var results
        try {
          results = await fetch(`https://api.hansputera.me/instagram/${username}`).then(x => x.json())
        } catch {
          results = await fetch(`https://instagram.com/${username}/?__a=1`, { headers: { cookie: `sessionid=${client.config.sessionid}` } }).then(x => x.json())
        }
      } catch (e) {
        return message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. Cannot find that username or the service unavailable")).then(x => { x.delete({ timeout: 10000 }) })
      }

      message.channel.startTyping()

      const data = await results;

      const get = data.graphql.user;
      const fullname = get.full_name;
      const userig = get.username;
      const bio = get.biography === null ? "None" : get.biography;
      const post = get.edge_owner_to_timeline_media.count
      const follower = get.edge_followed_by.count;
      const following = get.edge_follow.count;
      const priv = get.is_private ? "Yes 🔒" : "No 🔓";
      const thm = get.profile_pic_url_hd

      if (!message.content.includes('--nocanvas')) {
        const canvas = createCanvas(1200, 1200)
        const ctx = canvas.getContext('2d')

        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let loadimg = await loadImage(path.join(__dirname, "..", "..", "data", "images", "instagram-circle.png"))
        ctx.drawImage(loadimg, 100, 195, 250, 250)

        let loadimg2 = await loadImage(path.join(__dirname, "..", "..", "data", "images", "instagram-icon.png"))
        ctx.drawImage(loadimg2, 30, 30, 80, 80)

        if (get.is_verified) {
          let loadimg3 = await loadImage(path.join(__dirname, "..", "..", "data", "images", "verified.png"))
          ctx.drawImage(loadimg3, 1090, 30, 80, 80)
        }

        ctx.beginPath()
        ctx.moveTo(0, 150)
        ctx.lineTo(canvas.width, 150)
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#7e7e7e';
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(0, 580)
        ctx.lineTo(canvas.width, 580)
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#7e7e7e';
        ctx.stroke();

        ctx.font = "bold 45px Sans";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(fullname, 100, 520);

        ctx.font = "40px Sans";
        ctx.fillStyle = "#FFFFFF";
        await wraptext(ctx, bio, canvas.width - 1100, 650, 1015, 100)

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 45px Sans";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(userig, 600, 80);

        ctx.font = "bold 50px Sans";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(numberformat(post), 500, 330);

        ctx.font = "30px Sans";
        ctx.fillStyle = "#7a7a7a";
        ctx.fillText("Posts", 500, 400);

        ctx.font = "bold 50px Sans";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(numberformat(follower), 725, 330);

        ctx.font = "30px Sans";
        ctx.fillStyle = "#7a7a7a";
        ctx.fillText("Followers", 725, 400);

        ctx.font = "bold 50px Sans";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(numberformat(following), 1000, 330);

        ctx.font = "30px Sans";
        ctx.fillStyle = "#7a7a7a";
        ctx.fillText("Following", 1000, 400);

        if (get.is_private) {
          /*let loadimg4 = await loadImage(path.join(__dirname, "..", "..", "data", "images", "instagramlock.png"));
          ctx.drawImage(loadimg4, canvas.width/2 - 200, canvas.height/2 + 400, 80, 80)*/
          ctx.font = "35px Sans";
          ctx.fillStyle = "#7a7a7a";
          ctx.fillText("This Account is Private", 600, 1120);
        }
        /*
        ctx.beginPath()
        ctx.arc(225, 320, 118, 0, Math.PI * 2, true);
        ctx.closePath()
        ctx.clip()

        const av = await loadImage(thm)
        ctx.lineTo(av, 50, 50)
        ctx.drawImage(av, 105, 200, 240, 240)*/

        const imager = await Circle(thm);
        const imgprof = await loadImage(imager);
        ctx.drawImage(imgprof, 105, 200, 240, 240)

        let img = canvas.toBuffer()
        const ath = new MessageAttachment(img, "instagram.png")
        message.inlineReply({ content: `**Link? https://www.instagram.com/${userig}**`, files: [ath] })
        message.channel.stopTyping()
      } else {

        let e = new MessageEmbed()
          .setColor(message.member.displayHexColor)
          .setTitle(`Instagram Account • ${fullname}`)
          .setURL(`https://www.instagram.com/${username}`)
          .setThumbnail(`${thm}`)
          .setDescription(`**Account Information\n\`\`\`asciidoc\n• Username  :: ${userig}\n• Fullname  :: ${fullname}\n• Biography :: ${bio}\n• Followers :: ${follower}\n• Following :: ${following}\n• Private   :: ${priv}\n\`\`\`**`);
        await message.channel.send(e);
        message.channel.stopTyping()

      }
    } catch (error) {
      message.channel.send(createEmbed("error", "<a:no:765207855506522173> | Operation Canceled. Cannot find that username or the service unavailable")).then(x => { x.delete({ timeout: 10000 }) })
      message.channel.stopTyping()
    }
  }
};

function numberformat(num) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(1).replace(rx, "$1") + si[i].symbol;
}

function wraptext(ctx, text, x, y, max, height) {
  let words = text.split(' ');
  let line = '';
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > max && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += height
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, y)
}