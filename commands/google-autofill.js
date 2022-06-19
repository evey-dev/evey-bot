const Discord = require("discord.js");
const request = require('node-superfetch');

module.exports = {
	name: 'google-autofill',
    description: 'Shows a list of google autofill results',
    cooldown: 3,
    usage: '[search term]',
    aliases: ['g-a', 'googleautofill', 'ga', 'googleauto'],
	execute(message, args) {
        async function googleautofill() {
            let autofillembed = new Discord.MessageEmbed()
                .setTitle("Google Autofill results")
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setThumbnail("https://cdn.discordapp.com/attachments/537094910063542293/725770772458635394/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1.png")
                .setColor("#f66868")
                .setTimestamp()
            let noresultsembed = new Discord.MessageEmbed()
                .setDescription(`${message.author}, could not find any results for that search term.`)
                .setColor("#f66868")
                .setTimestamp()
            try {
                const { text } = await request
                    .get('https://suggestqueries.google.com/complete/search')
                    .query({
                        client: 'firefox',
                        q: args.slice(0).join(" "),
                    });
                const data = JSON.parse(text)[1];
                if (!data.length) return message.channel.send(noresultsembed);
                autofillembed.setDescription(data.join('\n'))
                return message.channel.send(autofillembed);
            }
            catch (err) {
                return console.log(`An error occured: \`${err.message}\`.`);
            }
        }
        googleautofill();
    }
}