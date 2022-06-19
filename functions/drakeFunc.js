const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function drakeFunc(message, text1, text2, name) {
    //canvas
    const canvas = Canvas.createCanvas(610, 610);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false

    //setup
    const background = await Canvas.loadImage(`./images/drake.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.lineWidth = 5
    //text
    f.wrapText(ctx, text1, 325, 20, 275, 30)
    f.wrapText(ctx, text2, 325, 325, 275, 30)
    ctx.textAlign = 'center'
    f.wrapText(ctx, name, 152.5, 200, 275, 30, true)
    f.wrapText(ctx, name, 152.5, 500, 275, 30, true)

    
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `drake.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://drake.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    drakeFunc
}