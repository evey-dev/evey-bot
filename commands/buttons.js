const Discord = require("discord.js");
const f = require("../functions/buttonsfunc.js")
module.exports = {
	name: 'buttons',
    description: 'Creates the button choosing meme!',  
    cooldown: 5,
    aliases: [`choice`,'buttonsweat'],
    usage: `[button 1], [button 2], [name (optional)]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 3 && newargs.length != 2) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+buttons [button 1], [button 2], [name (optional)]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var button1 = newargs[0]
        var button2 = newargs[1]
        var name = newargs[2] || ''
        f.buttonsfunc(message, button1.trim(), button2.trim(), name.trim())
    }
}