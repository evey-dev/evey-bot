const Discord = require("discord.js");

module.exports = {
	name: 'money',
    description: 'Manage a user\'s balance. (For Evey only)',  
    cooldown: 0,
    aliases: [`m`],
    usage: `[user] [add|remove] [amount]`,
	execute(message, args) {
        let taggedUser = message.mentions.members.first() || message.member;
        const collection = db.collection('profiles');
        collection.findOne({id: taggedUser.id}, {upsert: true}).then((result) => {
            if (result) {
                const prof = collection.findOne({id: taggedUser.id}, {upsert: true},
                (err, prof) => {
                    if (message.author.id != `427855045380276234`) {
                        return
                    }
                    var balance = prof.money || 0
                    if (['a', 'add'].includes(args[1])) {
                        collection.findOneAndUpdate({"id": taggedUser.id}, {$set : {money: balance + parseInt(args[2])}}, {upsert: true})
                        const addembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`Succesfully added ${args[2]} :moneybag: to ${taggedUser}'s balance.`)
                            .setTimestamp()
                        message.channel.send(addembed);
                    }
                    else if (['r', 'remove', 's', 'subtract'].includes(args[1])) {
                        collection.findOneAndUpdate({"id": taggedUser.id}, {$set : {money: balance - parseInt(args[2])}}, {upsert: true})
                        const subembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`Succesfully removed ${args[2]} :moneybag: from ${taggedUser}'s balance.`)
                            .setTimestamp()
                        message.channel.send(subembed);
                    }
                })
            }
            else {
                collection.insertOne({id: taggedUser.id}, {setDefaultsOnInsert: true})
                collection.findOne({id: taggedUser.id}, {upsert: true}).then((result) => {
                    if (result) {
                        const prof = collection.findOne({id: taggedUser.id}, {upsert: true},
                        (err, prof) => {
                            if (message.author.id != `427855045380276234`) {
                                return
                            }
                            var balance = prof.money || 0
                            if (['a', 'add'].includes(args[1])) {
                                collection.findOneAndUpdate({"id": taggedUser.id}, {$set : {money: balance + parseInt(args[2])}}, {upsert: true})
                                const addembed = new Discord.MessageEmbed()
                                    .setColor('#f66868')
                                    .setDescription(`Succesfully added ${args[2]} :moneybag: to ${taggedUser}'s balance.`)
                                    .setTimestamp()
                                message.channel.send(addembed);
                            }
                            else if (['r', 'remove', 's', 'subtract'].includes(args[1])) {
                                collection.findOneAndUpdate({"id": taggedUser.id}, {$set : {money: balance - parseInt(args[2])}}, {upsert: true})
                                const subembed = new Discord.MessageEmbed()
                                    .setColor('#f66868')
                                    .setDescription(`Succesfully removed ${args[2]} :moneybag: from ${taggedUser}'s balance.`)
                                    .setTimestamp()
                                message.channel.send(subembed);
                            }
                        })
                    }
                })
            }
        })
    }
}