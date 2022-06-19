const Discord = require("discord.js");
const f = require("../functions/drawcardsfunc.js")
module.exports = {
	name: 'draw25',
    description: 'Creates the draw 25 cards meme!',  
    cooldown: 5,
    aliases: [`drawcards`],
    usage: `[text on card], [text 2 (optional)]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 2 && newargs.length != 1) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+draw25 [text on card], [text 2 (optional)]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var cardtext = newargs[0]
        var name = newargs[1] || ''
        f.drawcardsfunc(message, cardtext.trim(), name.trim())
    }
}