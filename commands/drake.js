const Discord = require("discord.js");
const f = require("../functions/drakeFunc.js")
module.exports = {
	name: 'drake',
    description: 'Creates the drake meme!',  
    cooldown: 5,
    usage: `[text 1], [text 2], [name (optional)]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 2 && newargs.length !=3) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+drake [text 1], [text 2], [name (optional)]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var text1 = newargs[0]
        var text2 = newargs[1]
        var name = newargs[2] || ''
        f.drakeFunc(message, text1.trim(), text2.trim(), name.trim())
    }
}