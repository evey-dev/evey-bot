const Discord = require("discord.js");
const list = require('./lists')
const mongo = require('mongodb').MongoClient

function shop(message, args, collection, prof, ogauthor) {
    if (!args.length) {
        const shopinfo = '**Color**\nUse \`+shop color\` to purchase the ability to choose your profile text color.\n*Profle text color costs 10000 :moneybag:*\n**Backgrounds**\nUse \`+shop [background name]\` to purchase a background.\n*Each background costs 5000 :moneybag:*\n'
        const result = list.backs.map(function(b, i) {return `**${i+1}. [${b[0].toUpperCase()+b.slice(1)}](${list.backurl[i]})**`;});
        const shopembed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setTitle(':frame_photo: Profile Shop')
            .setColor("#f66868")
            .setDescription(shopinfo + result.slice(0,10).join(`\n`))
            .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            .setTimestamp();
        message.channel.send(shopembed)
        .then(async function (message) {
            await message.react('◀');
            await message.react('❌');
            await message.react('▶');
            const filter = (reaction, user) => {
                return ['◀', '❌', '▶'].includes(reaction.emoji.name) && user.id === ogauthor
            }
            const collector = message.createReactionCollector(filter, {time: 30000})
            var page = 1
            collector.on('collect', (reaction, user) => {
                collector.resetTimer()
                reaction.users.remove(user.id)
                if (!user.bot) {
                    if
                     (reaction.emoji.name === '◀') {
                        if (page != 1) {
                            page -=1
                        }
                        shopembed.setDescription(shopinfo + result.slice((page-1)*10,page*10).join(`\n`))
                        message.edit(shopembed)
                    }
                    if (reaction.emoji.name === '▶') {
                        if (page != 4) {
                            page +=1
                        }
                        shopembed.setDescription(shopinfo + result.slice((page-1)*10,page*10).join(`\n`))
                        message.edit(shopembed)
                    }
                    if (reaction.emoji.name === '❌') {
                        collector.stop()
                        message.delete()
                    }
                }
            });
        })
    }
    else if (['color','hex'].includes(args[0])) {
        if (!prof.money || prof.money < 10000) {
            const lmoneyembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setTitle(':frame_photo: Profile Shop')
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setDescription(`You do not have enough money to purchase this item.\n\n**Item:** Profile Text Color\n**Price: 10000** :moneybag:\n**Balance: ${prof.money || '0'}** :moneybag:`)
                .setTimestamp()
                .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            message.channel.send(lmoneyembed)
        }
        else if (prof.boughthex === true) {
            const boughthexembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setTitle(':frame_photo: Profile Shop')
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setDescription(`You already own this item.\nPlease use \`+profile config color [hex code]\` to set your profile hex code.`)
                .setTimestamp()
                .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            message.channel.send(boughthexembed)
        }
        else {
            const colorbuyembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setTitle(':frame_photo: Profile Shop')
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setDescription(`**Item:** Profile Text Color\n**Price:** 10000 :moneybag:\n*Please react with ✅ to confirm or with ❌ to cancel your purchase.*`)
                .setTimestamp()
                .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            message.channel.send(colorbuyembed)
            .then(async function (message) {
                await message.react('✅');
                await message.react('❌');
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === ogauthor
                }
                const collector = message.createReactionCollector(filter, {time: 30000})
                collector.on('collect', (reaction, user) => {
                    if (!user.bot) {
                        collector.stop()
                        message.reactions.removeAll()
                        if (reaction.emoji.name === '✅') {
                            var newamount = prof.money - 10000
                            collection.findOneAndUpdate({id: ogauthor}, {$set : {boughthex: true}}, {upsert: true})
                            collection.findOneAndUpdate({id: ogauthor}, {$set : {money: newamount}}, {upsert: true})
                            colorbuyembed.setDescription('Thank you for purchasing **Profile Text Color** for **10000** :moneybag:\nPlease use \`+profile config color [hex code]\` to set your profile hex code.')
                            message.edit(colorbuyembed)
                        }
                        if (reaction.emoji.name === '❌') {
                            colorbuyembed.setDescription('Your purchase of **Profile Text Color** for **10000** :moneybag: has been cancelled.')
                            message.edit(colorbuyembed)
                        }
                    }
                })
            })
        }
    }
    else if (list.backs.includes(args[0].toLowerCase())) {
        var chosenback = args[0].toLowerCase()
        if (prof.money <5000) {
            const lmoneyembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setTitle(':frame_photo: Profile Shop')
                .setDescription(`You do not have enough money to purchase this item.\n\n**Item:** Background: ${chosenback[0].toUpperCase()+chosenback.slice(1)}\n**Price: 5000** :moneybag:\n**Balance: ${prof.money || '0'}** :moneybag:`)
                .setTimestamp()
            return message.channel.send(lmoneyembed);
        }
        if (prof.boughtbacks.includes(chosenback)) {
            const ownedbackembed = new Discord.MessageEmbed()
                .setColor('#f66868')
                .setTitle(':frame_photo: Profile Shop')
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setDescription(`You already own the item **Background: ${chosenback[0].toUpperCase()+chosenback.slice(1)}**.\nPlease use \`+profile config background\` to see your owned backgrounds.`)
                .setTimestamp()
                .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
            return message.channel.send(ownedbackembed);
        }
        const backbuyembed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setTitle(':frame_photo: Profile Shop')
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setDescription(`**Item:** Background: ${chosenback[0].toUpperCase()+chosenback.slice(1)}\n**Price:** 5000 :moneybag:\n*Please react with ✅ to confirm or with ❌ to cancel your purchase.*`)
            .setTimestamp()
            .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        message.channel.send(backbuyembed)
        .then(async function (message) {
            await message.react('✅');
            await message.react('❌');
            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === ogauthor
            }
            const collector = message.createReactionCollector(filter, {time: 30000})
            collector.on('collect', (reaction, user) => {
                if (!user.bot) {
                    collector.stop()
                    message.reactions.removeAll()
                    if (reaction.emoji.name === '✅') {
                        if (!prof.boughtbacks) {
                            collection.findOneAndUpdate({id: ogauthor}, {$set : {boughtbacks: [chosenback]}}, {upsert: true})
                        }
                        else {
                            var newownedbacks = prof.boughtbacks 
                            newownedbacks[newownedbacks.length] = chosenback
                            newownedbacks.sort()
                            collection.findOneAndUpdate({id: ogauthor}, {$set : {boughtbacks: newownedbacks}}, {upsert: true})
                        }
                        var newamount = prof.money - 5000
                        collection.findOneAndUpdate({id: ogauthor}, {$set : {money: newamount}}, {upsert: true})
                        backbuyembed.setDescription(`Thank you for purchasing **Background: ${chosenback[0].toUpperCase()+chosenback.slice(1)}** for **5000** :moneybag:\nPlease use \`+profile config background\` to view your backgrounds.`)
                        message.edit(backbuyembed)
                    }
                    if (reaction.emoji.name === '❌') {
                        colorbuyembed.setDescription(`Your purchase of **Background: ${chosenback[0].toUpperCase()+chosenback.slice(1)}** for **5000** :moneybag: has been cancelled.`)
                        backbuyembed.edit(backbuyembed)
                    }
                }
            })
        })
    }
    else {
        const itembadembed = new Discord.MessageEmbed()
            .setColor('#f66868')
            .setTitle(':frame_photo: Profile Shop')
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setDescription(`This item does not exist.\nPlease use \`+shop\` to view all items.`)
            .setTimestamp()
            .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        return message.channel.send(itembadembed);
    }
}

module.exports = {
    shop
}