const Discord = require('discord.js');
const Canvas = require('canvas');

function isHexColor(hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

function componentToHex(c) {
    var hex = c.toString(16);
    var hexcode = hex.length == 1 ? "0" + hex : hex;
    return hexcode
}
  
function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
module.exports = {
	name: 'color',
	description: 'Shows a random color or a displays a color from hex/rgb',
    aliases: ['randomcolor', `hax`, `rgb`],
    cooldown: 5,
    usage: '[hex]',
    execute(message, args) {
        if (isHexColor(args[0])) {
            var rbgcolor = hexToRgb(args[0])
            if (args[0].toLowerCase() == 'ffffff') {
                var embedcolor = 'fffffe'
            }
            const randomcolorembed = new Discord.MessageEmbed()    
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)    
                .addField("Hex",`#${args[0].toLowerCase()}`)
                .addField("RGB", `${rbgcolor.r}, ${rbgcolor.g}, ${rbgcolor.b}`)
                .setColor(`${embedcolor || args[0]}`)
                
            message.channel.send(randomcolorembed);
        }
        else {
            var r = Math.floor(Math.random()*256);
            var g = Math.floor(Math.random()*256);
            var b = Math.floor(Math.random()*256);

            var hexColor = rgbToHex(r, g, b);
            var colorResult =  r + ', ' + g + ', ' + b ;
            
            const randomcolorembed = new Discord.MessageEmbed()    
                .setTitle(`Random Color`)
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)    
                .addField("Hex",`#${hexColor}`)
                .addField("RGB", colorResult)
                .setColor(`${hexColor}`)
                    
            message.channel.send(randomcolorembed);
        }
    }
}