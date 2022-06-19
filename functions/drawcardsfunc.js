const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function drawcardsfunc(message, cardtext, name) {
    //canvas
    const canvas = Canvas.createCanvas(500, 494);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false

    //setup
    const background = await Canvas.loadImage(`./images/drawcards.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = '28px Arial'
    ctx.textAlign = 'left'
    ctx.lineWidth = 5
    //text
    f.wrapText(ctx, cardtext, 100, 175, 150, 30, true)
    f.wrapText(ctx, name, 275, 30, 210, 30, true)
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `draw_cards.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://draw_cards.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    drawcardsfunc
}