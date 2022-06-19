module.exports = {
	name: 'avatar',
	description: 'Shows user avatar',
    aliases: ['icon', 'pfp'],
    usage: '[user]',
	execute(message) {
        const Discord = require('discord.js');
        
                if (!message.mentions.users.size) {
                    const avatarembed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Avatar`)
                        .setURL(`${message.author.displayAvatarURL()}`)
                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                        .setImage(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
                    message.channel.send(avatarembed);
            	}
                
                else {
                    const taggedUser = message.mentions.users.first();
                    const avatarembed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Avatar`)
                        .setURL(`${taggedUser.displayAvatarURL()}`)
                        .setAuthor(`${taggedUser.tag}`, `${taggedUser.displayAvatarURL()}`,``)
                        .setImage(`${taggedUser.displayAvatarURL({ format: "png", dynamic: true })}`)
                    message.channel.send(avatarembed);
                }

	},
};