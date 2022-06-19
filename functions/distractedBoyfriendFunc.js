const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function dBFunc(message, red, man, blue) {
    //canvas
    const canvas = Canvas.createCanvas(610, 406);
    const ctx = canvas.getContext('2d');

    //setup
    const background = await Canvas.loadImage(`./images/distractedBoyfriend.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial'
    ctx.textAlign = 'left'
    ctx.lineWidth = 5
    //text
    f.wrapText(ctx, red, 100, 250, 150, 30, true)
    f.wrapText(ctx, man, 350, 175, 100, 30, true)
    f.wrapText(ctx, blue, 470, 250, 100, 30, true)
    
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `distracted_bf.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://distracted_bf.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    dBFunc
}