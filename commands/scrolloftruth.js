const Discord = require("discord.js");
const f = require("../functions/scrollOfTruthFunc.js")
module.exports = {
	name: 'scrolloftruth',
    description: 'Creates the scroll of truth meme!',  
    cooldown: 5,
    aliases: [`scroll`,'truthscroll'],
    usage: `[text on scroll], [name]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 2) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+scrolloftruth [text on scroll], [name]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var scroll = newargs[0]
        var name = newargs[1]
        f.scrollFunc(message, scroll.trim(), name.trim())
    }
}