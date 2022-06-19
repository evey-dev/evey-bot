const Discord = require("discord.js");

module.exports = {
	name: 'ping',
    description: 'Shows client ping',
    cooldown: 5,
	execute(message, args) {
        const pingembed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setDescription(`:ping_pong: ${message.author}, pong! Your ping is ${client.ws.ping} ms`)
            .setTimestamp()
        message.channel.send(pingembed);
	},
};
