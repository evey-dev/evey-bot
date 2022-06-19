const Discord = require("discord.js");

const Canvas = require('canvas');

const fontkit = require('fontkit');

const f = require('./canvasfunctions.js');

function vibecheck(message, collection, prof, taggedUser, vibe) {
    let picture = async function() {
      
        //canvas
        const canvas = Canvas.createCanvas(450, 450);
        const ctx = canvas.getContext('2d');
        
        //setup
        const background = await Canvas.loadImage(`./images/vibecheckbackground.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff516e';
        ctx.strokeStyle = '#ff7a90';
        ctx.lineWidth = 2

        //web
        let xweb = [0, Math.sqrt(3)/2, Math.sqrt(3)/2, 0, -Math.sqrt(3)/2, -Math.sqrt(3)/2]
        let yweb = [1, 1/2, -1/2, -1, -1/2, 1/2]

        for (j=0; j<6; j++) {
            ctx.beginPath()
            ctx.moveTo(225 + 31*j*xweb[0], 225 + 31*j*yweb[0])
            for (i=1; i<6; i++) {
                ctx.lineTo(225 + 31*j*xweb[i], 225 + 31*j*yweb[i]) 
            }
            ctx.closePath()
            
            ctx.stroke()
        }

        ctx.beginPath()
        
        ctx.moveTo(225, 380)
        ctx.lineTo(225, 70)

        ctx.moveTo(225 + 155*Math.sqrt(3)/2, 225 + 155/2)
        ctx.lineTo(225 - 155*Math.sqrt(3)/2, 225 - 155/2)

        ctx.moveTo(225 + 155*Math.sqrt(3)/2, 225 - 155/2)
        ctx.lineTo(225 - 155*Math.sqrt(3)/2, 225 + 155/2)

        ctx.stroke()

        //vibe
        ctx.lineWidth = 10
        ctx.strokeStyle = '#ff516e';
        
        let xvibe = [0, Math.sqrt(3)*vibe[1]/2, Math.sqrt(3)*vibe[2]/2, 0, -Math.sqrt(3)*vibe[4]/2, -Math.sqrt(3)*vibe[5]/2]
        let yvibe = [vibe[0], vibe[1]/2, -vibe[2]/2, -vibe[3], -vibe[4]/2, vibe[5]/2]

        ctx.beginPath()
        ctx.moveTo(225 + 15.5*xvibe[0], 225 + 15.5*yvibe[0])
        for (i=1; i<6; i++) {
            ctx.lineTo(225 + 15.5*xvibe[i], 225 + 15.5*yvibe[i]) 
        }
        ctx.closePath()
        
        ctx.globalAlpha = .5
        ctx.fill()

        ctx.globalAlpha = 1
        ctx.stroke()

        for (i=0; i<6; i++) {
            ctx.beginPath()
            ctx.arc(225 + 15.5*xvibe[i], 225 + 15.5*yvibe[i], 10, 0, 2 * Math.PI);
            ctx.fill()
        }

        //text
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle';

        ctx.font = f.applyText(canvas, `${taggedUser.username}'s Vibes`, 70, 'arial', 32);
        ctx.fillText(`${taggedUser.username || taggedUser.user.username}'s Vibes`, 225, 20)

        ctx.font = '30px arial'
        if (vibe[6] === 1) {
            ctx.fillText(`Vibe Check Passed`, 225, 433)
        }
        else {
            ctx.fillText(`Vibe Check Failed`, 225, 433)
        }
        //send
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `vibecheck.png`);
        const memeembed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setColor('#f66868')
            .attachFiles([attachment])
            .setImage(`attachment://vibecheck.png`)
            .setTimestamp()
        return message.channel.send(memeembed)
    }
    picture()
}

module.exports = {
    vibecheck
}