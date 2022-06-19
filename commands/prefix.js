const Discord = require("discord.js");
const {prefix} = require('../config.json');

module.exports = {
	name: 'prefix',
	description: 'Shows bot prefix',
	execute(message) {
        const intembed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setDescription(`${message.author}, you can either ping me or use \`${prefix}\` as my prefix.`)
            .setTimestamp()
        return message.channel.send(intembed)
    }
}