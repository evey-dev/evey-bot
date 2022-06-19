const {prefix} = require('../config.json');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Shows a list of all commands or info about a specific command',
    aliases: ['commands'],
    cooldown: 5,
    usage: '[command]',
	execute(message, args) {
		const data = [];
        const {commands} = message.client;
        names = commands.map(command => command.name)
        usages = commands.map(command => command.usage)
        descriptions = commands.map(command => command.description)
        // result = names.map(function(e, i) {return `\`${prefix}${e}${usages[i]?(' '+usages[i]):''}\`\n${descriptions[i]}`;});
        var funCmds = ['8ball','achievement','google-autofill','grab','ship','surprise','vibecheck']
        var econCmds = ['balance','daily','leaderboard','profile','shop','slots']
        var memeCmds = ['buttons','buttonseggman','distractedboyfriend','drake','drawcards','laughingwolf', 'scrolloftruth']
        var modCmds = ['ban','clear','kick']
        var utilCmds = ['avatar','color','help','ping','prefix','serverinfo','whois']

		if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
                // .setDescription(`Here\'s a list of all my commands: \n\n${result.join(`\n\n`)}\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
                .setDescription(`You can use \`${prefix}help [command name]\` to get info on a specific command!`)
                .setTitle('Command List')
                .addField('😃  Fun',`\`${funCmds.join(`\`, \``)}\``)
                .addField('💰  Economy',`\`${econCmds.join(`\`, \``)}\``)
                .addField('🤣  Memes',`\`${memeCmds.join(`\`, \``)}\``)
                .addField('🛠  Moderation',`\`${modCmds.join(`\`, \``)}\``)
                .addField('⚙  Utility',`\`${utilCmds.join(`\`, \``)}\``)
            return message.author.send(embed)
				.then(() => {
                    const embed2 = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, I\'ve sent you a DM with all my commands!`)
                        .setTimestamp()
                    message.channel.send(embed2)
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    const errorembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, it seems like I can\'t DM you!`)
                        .setTimestamp()
                    message.channel.send(errorembed)
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
            const embed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setDescription(`${message.author}, that\'s not a valid command!`)
            .setTimestamp()
            return message.channel.send(embed)
		}
        caliases = ``
        description = ``
        usage = ``
		if (command.aliases) {caliases = `\n**Aliases:** ${command.aliases.join(', ')}`};
		if (command.description) {description =`**Description:** ${command.description}`};
        if (command.usage) {usage =`\n**Usage:**\n${prefix}${command.name} ${command.usage}`};
        cooldown = `\n**Cooldown:** ${command.cooldown || 3} second(s)`
        const embed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setTitle( `**Command:** ${prefix}${command.name}`)
            .setDescription(`${description}${cooldown}${caliases}${usage}`)
            .setTimestamp()

		message.channel.send(embed);
	},
};