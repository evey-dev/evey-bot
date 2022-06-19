const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
	name: 'serverinfo',
    description: 'Shows info about the current server.',
    aliases: [`server`, `serverinfo`],
	execute(message, args) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }
        
        let serverinfoembed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setColor("#f66868")
            .setThumbnail(`${message.guild.iconURL({ format: "png", dynamic: true })}`)
            .addField("Owner",`${message.guild.owner}`,true)
            .addField("Region",`${message.guild.region}`,true)
            .addField(`Categories`,`${message.guild.channels.cache.filter((c) => c.type !== "category").size}`,true)
            .addField(`Text Channels`,`${message.guild.channels.cache.filter((c) => c.type === "text").size}`,true)
            .addField(`Voice Channels`,`${message.guild.channels.cache.filter((c) => c.type === "voice").size}`,true)
            .addField(`Members`,`${message.guild.members.cache.size}`,true)
            .addField(`Roles`,`${message.guild.roles.cache.size - 1}`)
            .setImage('https://cdn.discordapp.com/attachments/720372640858243215/727352449404370954/border-1-5efaa5a23359d.png')
            .setFooter(`ID: ${message.guild.id} • Server Created: ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
        message.channel.send(serverinfoembed)
    },
};