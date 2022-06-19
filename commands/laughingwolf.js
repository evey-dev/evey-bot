const Discord = require("discord.js");
const f = require("../functions/laughingwolfFunc.js")
module.exports = {
	name: 'laughingwolf',
    description: 'Creates the laughing wolf meme!',  
    cooldown: 5,
    aliases: [`wolflaugh`],
    usage: `[wolf 1], [wolf 2], [wolf 3]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 3) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+laughingwolf [wolf 1], [wolf 2], [wolf 3]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var wolf1 = newargs[0]
        var wolf2 = newargs[1]
        var wolf3 = newargs[2]
        f.wolfFunc(message, wolf1.trim(), wolf2.trim(), wolf3.trim())
    }
}