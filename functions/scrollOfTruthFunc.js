const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function scrollFunc(message, scroll, name) {
    //canvas
    const canvas = Canvas.createCanvas(610, 589);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false

    //setup
    const background = await Canvas.loadImage(`./images/scrollOfTruth.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = '18px Arial'
    ctx.textAlign = 'center'
    ctx.lineWidth = 5
    //text
    f.wrapText(ctx, scroll, 170, 360, 150, 20, true)
    ctx.font = '24px Arial'
    ctx.textAlign = 'left   '
    f.wrapText(ctx, name, 475, 350, 100, 20, true)
    
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `scroll_of_truth.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://scroll_of_truth.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    scrollFunc
}