const Discord = require("discord.js");

module.exports = {
	name: 'clear',
    description: 'Clears up to 100 messages',
    cooldown: 5,
    usage: '[count]',
    aliases: ['purge'],
	execute(message, args) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const amount = parseInt(args[0]) + 1;

            if (isNaN(amount)) {
                const rangeembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, that isn\'t a valid number.`)
                    .setTimestamp()
                message.channel.send(rangeembed);
            } else if (amount <= 1 || amount > 100) {
                const rangeembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, you need to input a number between 1 and 99.`)
                    .setTimestamp()
                message.channel.send(rangeembed);
            }

            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                const rangeembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, there was an error trying to prune messages in this channel`)
                    .setTimestamp()
                message.channel.send(rangeembed);
            });
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