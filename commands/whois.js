const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "whois",
    aliases: ["user", "info"],
    description: "Shows user information",
    usage: '[user]',
    execute(message, args) {
    let taggedUser = message.mentions.members.first() || message.member;
    var status
    if (taggedUser.presence.status == 'dnd') {
        status = 'Do Not Disturb'
        statusimg = 'https://cdn.discordapp.com/emojis/721580605178904606.png?v=1'
    }
    else if (taggedUser.presence.status == 'online') {
        status = 'Online'
        statusimg = 'https://cdn.discordapp.com/emojis/721580556264931348.png?v=1'
    }
    else if (taggedUser.presence.status == 'idle') {
        status = 'Idle'
        statusimg = 'https://cdn.discordapp.com/emojis/721580589764968528.png?v=1'
    }
    else if (taggedUser.presence.status == 'offline') {
        status = 'Offline'
        statusimg = 'https://cdn.discordapp.com/emojis/721580622518157372.png?v=1'
    }
    let whoisembed = new Discord.MessageEmbed()
        .setDescription(`${taggedUser}`)
        .setAuthor(`${taggedUser.user.tag}`, `${taggedUser.user.displayAvatarURL()}`)
        .setColor("#f66868")
        .setThumbnail(`${taggedUser.user.displayAvatarURL({ format: "png", dynamic: true })}`)
        .addField("Joined",`${moment.utc(taggedUser.joinedAt).format("dddd, MMMM Do YYYY, HH:mm")}`)
        .addField("Registered",`${moment.utc(taggedUser.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm")}`)
        .addField(`Roles [${taggedUser.roles.cache.size - 1}]`,taggedUser.roles.cache.size > 1 ? taggedUser.roles.cache.filter(role => role.id !== message.guild.id).map(r => `${r}`).join(" "): "None")
        .setFooter(`${status} • ID: ${taggedUser.user.id}`, statusimg)
        .setImage('https://cdn.discordapp.com/attachments/720372640858243215/727352449404370954/border-1-5efaa5a23359d.png')
        .setTimestamp();
    message.channel.send(whoisembed);
    }
};