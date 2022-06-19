const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function acgetfunc(message, achvmt, taggedUser) {
    //canvas
    const canvas = Canvas.createCanvas(640, 128);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false

    //setup
    const background = await Canvas.loadImage(`./images/achievementback.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px Minecraft'
    
    //text
    ctx.fillText(achvmt || '', 121, 96)

    //picture
    f.circle(ctx, 60, 64, 40, 0, Math.PI * 2, true);
    ctx.clip();

    const avatar = await Canvas.loadImage(taggedUser.user.displayAvatarURL({ format: "png"}));
    ctx.drawImage(avatar, 20, 24, 80, 80);
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `achievement_get.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://achievement_get.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    acgetfunc
}