const Discord = require("discord.js");
const Canvas = require('canvas');
const f = require('./canvasfunctions.js');
const { Timestamp } = require("mongodb");

function etchFunc(msg,listx,listy) {
    //canvas
    const canvas = Canvas.createCanvas(404, 300);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false

    //setup
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#000000';
    ctx.font = '28px Arial'
    ctx.textAlign = 'left'
    ctx.lineWidth = 5
    
    //drawing
    for (i=0; i < listx.length; i++) {
        ctx.fillRect(4*listx[i] ,4*listy[i], 4, 4)
    }
    //send
    var timestamp = Date.now()
    var image = new Discord.MessageAttachment(canvas.toBuffer(), `etch_${timestamp}.png`)
    const etchembed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.displayAvatarURL()}`)
        .setTitle('🎨 Etch-A-Sketch 🎨')
        .setColor("#f66868")
        .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        .attachFiles([image])
        .setImage(`attachment://etch_${timestamp}.png`)
        .setTimestamp();
    return etchembed
}

module.exports = {
    etchFunc
}