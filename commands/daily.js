const Discord = require("discord.js");
const ms = require('parse-ms');

module.exports = {
	name: 'daily',
    description: 'Collects daily reward',
    cooldown: 3,
	execute(message, args) {
        const collection = db.collection('profiles')
        var d = new Date();
        const fulldate = `${d.getMonth()}${d.getDate()}${d.getFullYear()}`
        const prof = collection.findOne({id: message.author.id}, {upsert: true},
            (err, prof) => {
                if (prof == null) {
                    collection.insertOne({id: message.author.id}, {setDefaultsOnInsert: true})
                    prof = collection.findOne({id: message.author.id}, {upsert: true})
                }
                let amount = 250;
                let lastDaily = prof.lastDaily || null
                if (lastDaily == fulldate) {
                    const waitdailyembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you already collected your daily reward, please wait until tomorrow to collect it again!`)
                        .setTimestamp()
                    message.channel.send(waitdailyembed)
                }
                else {
                    const dailyembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, succesfully collected $${amount}!`)
                        .setTimestamp()
                    message.channel.send(dailyembed)
                    if (prof.money) {
                        let balance = prof.money;
                        collection.findOneAndUpdate({"id": message.author.id}, {$set : {money: balance + amount, lastDaily: fulldate}}, {upsert: true})
                    }
                    else {
                        collection.findOneAndUpdate({"id": message.author.id}, {$set : {money: amount, lastDaily: fulldate}}, {upsert: true})
                    }
                }
            }
        )
    }
}