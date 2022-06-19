const Discord = require("discord.js");

function stringToHash(string) {
    var hash = 0; 
    if (string.length == 0) return hash; 
      
    for (i = 0; i < string.length; i++) { 
        char = string.charCodeAt(i); 
        hash = ((hash << 5) - hash) + char; 
        hash = hash & hash; 
    } 

    return hash
}
module.exports = {
	name: 'ship',
	description: 'Ships two users together',
    aliases: ['lovecalc'],
    usage: '[person 1] [person 2]',
	execute(message, args) {
        if (!(args[0] && args[1])) {
            const needtwoembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, you need to input two names.`)
                .setTimestamp()
            return message.channel.send(needtwoembed)
        }

        var hash = stringToHash(args[0]) + stringToHash(args[1])
        
        var percent = hash.toString()
        percent = percent.substr(-3)
        if (parseInt(percent) > 100 || percent.substr(0,1) == "0") {
            percent = percent.substr(-2);
        }
        if (percent.substr(0,1) == "0") {
            percent = percent.substr(-1);
        }

        const shipembed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setTitle('❤ Love Calculator ❤')
            .setDescription(`**${args[0]} ❤ ${args[1]}**\n**Ship Rating:** ${percent}%`)
        message.channel.send(shipembed);
    }
}