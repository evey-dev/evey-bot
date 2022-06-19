const Discord = require("discord.js");
const f = require("../functions/achievementfunc.js")
module.exports = {
	name: 'achievementget',
    description: 'Gives a user an achievement!',  
    cooldown: 5,
    aliases: [`acget`,'achievement'],
    usage: `[user] [achievement]`,
	execute(message, args) {
        let taggedUser = message.mentions.members.first();
        var tempachvmt = args.slice(1).join(' ');
        var achvmt = ''
        for(var i = 0; i < tempachvmt.length; i++) {
            if(!(tempachvmt[i] == '\n' || tempachvmt[i] == '\r') ) {
                achvmt += tempachvmt[i]; 
            }
        }
        if (!taggedUser) {
            const notagembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, you must tag a user in your message.`)
                .setTimestamp()
            message.channel.send(notagembed)    
        }
        else if (args[0] != `<@${taggedUser.id}>` && args[0] != `<@!${taggedUser.id}>`) {
            const notagembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, the correct format is \`+acget [user] [achievement]\`.`)
                .setTimestamp()
            message.channel.send(notagembed)
        }
        else if (achvmt.length>22 || !achvmt) {
            const longembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, your achievement must be between 1 and 23 characters long`)
                .setTimestamp()
            message.channel.send(longembed)
        }
        else {
            f.acgetfunc(message, achvmt, taggedUser)
        }
    }
}