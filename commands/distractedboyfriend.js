const Discord = require("discord.js");
const f = require("../functions/distractedBoyfriendFunc.js")
module.exports = {
	name: 'distractedboyfriend',
    description: 'Creates the distracted boyfriend meme!',  
    cooldown: 5,
    aliases: [`distracted`],
    usage: `[woman in red], [man], [woman in blue]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 3) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+distractedBoyfriend [woman in red], [man], [woman in blue]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var red = newargs[0]
        var man = newargs[1]
        var blue = newargs[2]
        f.dBFunc(message, red.trim(), man.trim(), blue.trim())
    }
}