const Discord = require("discord.js");

const Canvas = require('canvas');

const fontkit = require('fontkit');
var font = fontkit.openSync('C:/Windows/Fonts/BAUHS93.ttf');
 
const f = require('./canvasfunctions.js');


function canvas(message, taggedUser) {
    
    const collection = db.collection('profiles')
    
    const prof = collection.findOne({id: taggedUser.id}, {upsert: true},
        (err, prof) => {
            let picture = async function() {

                //canvas
                const canvas = Canvas.createCanvas(540, 700);
                const ctx = canvas.getContext('2d');
                
                var bg = prof.back || 'default'
                //background
                const background = await Canvas.loadImage(`./backgrounds/${bg}.png`);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                
                //styles
                ctx.fillStyle = '#ffffff'
                ctx.globalAlpha = .3
                ctx.lineWidth = 5
                ctx.strokeStyle = '#ffffff';
                var black = '000000'
                //big rect
                f.roundedRect(ctx, 20, 20, canvas.width-40, canvas.height-40, 20);
                
                //avatar ring outer
                f.circle(ctx, 270, 185, 117.5, 0, Math.PI * 2, true);
                ctx.stroke();

                //info & bio //rect
                ctx.globalAlpha = 1
                ctx.beginPath();
                f.roundedRect2(ctx, 40, 400, canvas.width-80, 260, 20);

                
                //tag text & rect
                ctx.textAlign = 'center';
                ctx.textBaseline = 'alphabetic';
                
                ctx.fillStyle = '#ffffff';
                ctx.font = f.applyText(canvas, `${taggedUser.user.tag}`, 400, 'bauhaus 93', 30);

                for (i = 0; i < taggedUser.user.tag.length; i++) {
                    if (!font.hasGlyphForCodePoint(taggedUser.user.tag.charCodeAt(i))) {
                        ctx.font = f.applyText(canvas, `${taggedUser.user.tag}`, 400, 'Sans', 30);
                        break;
                    }
                }
                
                f.roundedRect2(ctx, canvas.width/2-ctx.measureText(`${taggedUser.user.tag}`).width/2-30, 375, ctx.measureText(`${taggedUser.user.tag}`).width+60, 60, 30);
                ctx.globalAlpha = .5
                ctx.fill();

                ctx.globalAlpha = 1
                ctx.fillStyle = `#${prof.hex || black}`;
                ctx.fillText(`${taggedUser.user.tag}`, canvas.width/2, 400);            
                
                //bio
                ctx.fillStyle = '#ffffff'
                ctx.globalAlpha = .7

                ctx.beginPath();
                f.roundedRect2(ctx, 40, 550, canvas.width-80, 110, 20);
                f.roundedRect2(ctx, 40, 520, 80, 60, 20);
                ctx.fill()

                ctx.font = '30px bauhaus 93';
                ctx.fillStyle = `#${prof.hex || black}`;

                ctx.globalAlpha = 1
                ctx.textAlign = 'left';

                ctx.fillText(`Bio`, 60, 550);            
                f.wrapText(ctx, prof.bio || ``, 60, 580, canvas.width-120, 30);

                //name text & rect
                ctx.textAlign = 'center';
                ctx.font = f.applyText(canvas, `${prof.nick || taggedUser.displayName}`, 50, 'bauhaus 93', 50);
                ctx.globalAlpha = .5

                name = prof.nick || taggedUser.displayName

                for (i = 0; i < name.length; i++) {
                    if (!font.hasGlyphForCodePoint(name.charCodeAt(i))) {
                        ctx.font = f.applyText(canvas, `${prof.nick || taggedUser.displayName}`, 50, 'Sans', 50);
                        break;
                    }
                }

                ctx.fillStyle = '#ffffff'
                f.roundedRect(ctx, canvas.width/2-ctx.measureText(`${prof.nick || taggedUser.displayName}`).width/2-20, 310, ctx.measureText(`${prof.nick || taggedUser.displayName}`).width+40, 60, 30);

                ctx.globalAlpha = 1

                ctx.textBaseline = 'middle';

                ctx.fillStyle = `#${prof.hex || black}`;
                ctx.fillText(`${prof.nick || taggedUser.displayName}`, canvas.width / 2, 340);
                
                //info
                ctx.font = '30px bauhaus 93';
                ctx.textAlign = 'left';
                ctx.fillText(`School: ${prof.school || ``}`, 60, 430);
                ctx.fillText(`Year Graduating: ${prof.year || ``}`, 60, 465);
                ctx.fillText(`Borough: ${prof.borough || ``}`, 60, 500);



                //avatar ring inner
                f.circle(ctx, 270, 185, 107, 0, Math.PI * 2, true);
                ctx.stroke()

                //avatar back
                f.circle(ctx,270, 185, 104, 0, Math.PI * 2, true);
                ctx.fillStyle = '#2c2f33';
                ctx.fill();

                //avatar
                f.circle(ctx,270, 185, 105, 0, Math.PI * 2, true);
                ctx.clip();

                const avatar = await Canvas.loadImage(taggedUser.user.displayAvatarURL({ format: "png"}));
                ctx.drawImage(avatar, 165, 80, 210, 210);

                //draw
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `userprofile.png`);

                message.channel.send(attachment);
                        
            }
            picture();
        }
    )
}
module.exports = {
	canvas
}