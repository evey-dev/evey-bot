const Discord = require('discord.js');

module.exports = {
	name: 'ban',
    description: 'Bans user',
    usage: '[user] [reason]',
	execute(message, args) {
        const Discord = require('discord.js');
        const taggedUser = message.mentions.users.first();
        if (message.member.hasPermission('BAN_MEMBERS')) {
            if (!taggedUser) {
                const bannouserembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, you didn't mention a user to ban.`)
                    .setTimestamp()
                return message.channel.send(bannouserembed);
            }
            if (taggedUser === message.author) {
                const banselfembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you can\'t ban yourself.`)
                        .setTimestamp()
                message.channel.send(banselfembed);
            }
            else if (message.guild.member(taggedUser).hasPermission('ADMINISTRATOR')) {
                const banadminembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you can\'t kick an administrator.`)
                        .setTimestamp()
                message.channel.send(banadminembed);
            }
            else if (taggedUser && message.guild.member(taggedUser)) {
                const member = message.guild.member(taggedUser);
                const reason = args.slice(1).join(' ');
                member
                .ban(reason)
                .then(() => {
                    const banembed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${taggedUser} has been banned from ${message.guild.name} for the reason:\n${reason}.`)
                        .setTimestamp()
                    message.channel.send(banembed);
                })
                .catch(err => {
                    const banfailembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${member.displayName} could not be kicked from ${message.guild.name}.`)
                        .setTimestamp()
                    message.channel.send(banfailembed);
                    console.error(err);
                });
            }
            else {
                const bannouserembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, you didn't mention a user to ban or this user is not a member of ${message.guild.name}.`)
                    .setTimestamp()
                message.channel.send(bannouserembed);
            }
        }
        else {
            const nopermsembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setDescription(`${message.author}, you do not have permission to use this command.`)
                .setTimestamp()
            message.channel.send(nopermsembed);
        }

	},
};