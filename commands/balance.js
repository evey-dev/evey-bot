const Discord = require("discord.js");

module.exports = {
	name: 'balance',
    description: 'Shows user balance',
    cooldown: 3,
    aliases: ['bal', 'money'],
    usage: '[user]',
	execute(message, args) {
        const collection = db.collection('profiles')
        let taggedUser = message.mentions.members.first() || message.member;
        promise = collection.findOne({id: taggedUser.id})
        promise.then((result) => {
            if (result) {
                const prof = collection.findOne({id: taggedUser.id},
                    (err, prof) => {
                        const balembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setAuthor(`${taggedUser.user.username}`, `${taggedUser.user.displayAvatarURL()}`)
                            .setDescription(`Balance: ${prof.money || 0} :moneybag:`)
                            .setTimestamp()
                        message.channel.send(balembed)
                    }
                )
            }
            else {
                collection.insertOne({id: taggedUser.id})
                const prof = collection.findOne({id: taggedUser.id},
                    (err, prof) => {
                        const balembed = new Discord.MessageyoutbeakssadsadcassEmbed()
                            .setColor('#f66868')
                            .setAuthor(`${taggedUser.user.username}`, `${taggedUser.user.displayAvatarURL()}`)
                            .setDescription(`Balance: ${prof.money || 0} :moneybag:`)
                            .setTimestamp()
                        message.channel.send(balembed)
                    }
                )
            }
        })
    }
}