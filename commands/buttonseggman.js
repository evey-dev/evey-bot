const Discord = require("discord.js");
const f = require("../functions/eggmanButtonsFunc.js")
module.exports = {
	name: 'buttonseggman',
    description: 'Creates the eggman button choosing meme!',  
    cooldown: 5,
    aliases: [`eggmanchoice`,'eggmanbutton'],
    usage: `[red button], [blue button], [name (optional)]`,
	execute(message, args) {
        const newargs = args.join(' ').split(`,`)
        if (newargs.length != 3 && newargs.length != 2) {
            const badArgsEmbed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the format for this command is \`+buttons [red button], [blue button], [name (optional)]\``)
                .setTimestamp()
            return message.channel.send(badArgsEmbed)
        }
        var button1 = newargs[0]
        var button2 = newargs[1]
        var name = newargs[2] || ''
        f.eggmanButtonsFunc(message, button1.trim(), button2.trim(), name.trim())
    }
}