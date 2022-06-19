const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');

async function eggmanButtonsFunc(message, button1, button2, name) {
    //canvas
    const canvas = Canvas.createCanvas(600, 908);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false

    //setup
    const background = await Canvas.loadImage(`./images/buttonseggman.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#000000';
    ctx.font = '28px Arial'
    ctx.textAlign = 'left'
    ctx.lineWidth = 5
    //text
    ctx.rotate(-15 * Math.PI / 180)
    f.wrapText(ctx, button1, 30, 160, 175, 30, true)
    ctx.rotate(3 * Math.PI / 180)
    f.wrapText(ctx, button2, 250, 160, 150, 30, true)
    ctx.rotate(12 * Math.PI / 180)
    f.wrapText(ctx, name, 300, 650, 250, 30, true)
    
    //send
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `eggman_button_choice.png`);
    const memeembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setColor('#f66868')
        .attachFiles([attachment])
        .setImage(`attachment://eggman_button_choice.png`)
        .setTimestamp()
    return message.channel.send(memeembed)
}

module.exports = {
    eggmanButtonsFunc
}