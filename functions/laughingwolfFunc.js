const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function wolfFunc(message, wolf1, wolf2, wolf3) {
    //canvas
    const canvas = Canvas.createCanvas(610, 406);
    const ctx = canvas.getContext('2d');

    //setup
    const background = await Canvas.loadImage(`./images/laughingwolf.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial'
    ctx.textAlign = 'left'
    ctx.lineWidth = 5
    //text
    f.wrapText(ctx, wolf1, 50, 250, 150, 30, true)
    f.wrapText(ctx, wolf2, 250, 250, 150, 30, true)
    f.wrapText(ctx, wolf3, 470, 250, 150, 30, true)
    
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `laughing_wolf.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://laughing_wolf.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    wolfFunc
}