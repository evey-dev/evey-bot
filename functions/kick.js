const Discord = require("discord.js");

module.exports = {
	name: 'kick',
    description: 'Kick user',
    usage: `[user] [reason]`,
	execute(message, args) {
        const Discord = require('discord.js');
        const taggedUser = message.mentions.users.first();
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (taggedUser === message.author) {
                const kickselfembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you can\'t kick yourself.`)
                        .setTimestamp()
                message.channel.send(kickselfembed);
            }
            else if (message.guild.member(taggedUser).hasPermission("ADMINISTRATOR")) {
                const kickadminembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you can\'t kick an administrator.`)
                        .setTimestamp()
                message.channel.send(kickadminembed);
            }
            else if (taggedUser && message.guild.member(taggedUser)) {
                const member = message.guild.member(taggedUser);
                const reason = args.slice(1).join(" ");
                member
                .kick(reason)
                .then(() => {
                    const kickembed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${taggedUser} has been kicked from ${message.guild.name} for the reason:\n${reason}.`)
                        .setTimestamp()
                    message.channel.send(kickembed);
                })
                .catch(err => {
                    const kickfailembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${member.displayName} could not be kicked from ${message.guild.name}.`)
                        .setTimestamp()
                    message.channel.send(kickfailembed);
                    console.error(err);
                });
            }
            else {
                const kicknouserembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, you didn't mention a user to kick or this user is not a member of ${message.guild.name}.`)
                    .setTimestamp()
                message.channel.send(kicknouserembed);
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