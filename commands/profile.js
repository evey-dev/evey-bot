const Discord = require("discord.js");
const assert = require('assert')
const mongo = require('mongodb').MongoClient
const c = require('../functions/canvas')
const files = require('../functions/lists')
const f = require('../functions/canvasfunctions.js');

module.exports = {
	name: 'profile',
    description: 'Shows user profile',
    cooldown: 3,
    usage: `[user]\n+profile config [nick|bio|back|year|school|borough|color] [value]`,
    aliases: ['p'],
	execute(message, args) {
        const collection = db.collection('profiles')
        function isHexColor (hex) {
            return typeof hex === 'string'
                && hex.length === 6
                && !isNaN(Number('0x' + hex))
        }
        if (['c', 'con', 'config'].includes(args[0])) {
            if(['nick', 'name', 'nickname'].includes(args[1])) {
                if (!args[2]) {
                    const badargsembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you must specify a nickname.`)
                        .setTimestamp()
                    return message.channel.send(badargsembed);
                }
                if (args.slice(2).join(" ").length > 32) {
                    const longembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, that nickname is too long. Max characters = 32.`)
                        .setTimestamp()
                    return message.channel.send(longembed);
                }
                else {
                    collection.findOneAndUpdate({id: message.author.id}, {$set : {nick: args.slice(2).join(" ")}}, {upsert: true})
                    const nickembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, Your nickname has been set to ${args.slice(2).join(" ")}`)
                        .setTimestamp()
                    return message.channel.send(nickembed);
                }
            }
            else if(['bio', 'about'].includes(args[1])) {
                if (!args[2]) {
                    const badargsembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you must specify a bio.`)
                        .setTimestamp()
                    return message.channel.send(badargsembed);
                }
                var oldbio = args.slice(2).join(" ")
                var newbio = ""; 
                
                for(var i = 0; i < oldbio.length; i++) {
                    if(!(oldbio[i] == '\n' || oldbio[i] == '\r') ) {
                        newbio += oldbio[i]; 
                    }
                }
                longword = false
                var words = newbio.split(' ');
                for(var n = 0; n < words.length; n++) {
                    if (words[n].length > 17) {
                        longword = true
                    }
                }
                if (longword === true) {
                    const longwordembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, one or more of the words in your bio is too long. Max characters per word = 17.`)
                        .setTimestamp()
                    return message.channel.send(longwordembed);
                }
                else {
                    if (newbio.length > 68) {
                        const longembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`${message.author}, that bio is too long. Max characters = 68.`)
                            .setTimestamp()
                        return message.channel.send(longembed);
                    }
                    else {
                        collection.findOneAndUpdate({id: message.author.id}, {$set : {bio: newbio}}, {upsert: true})
                        const bioembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`${message.author}, Your bio has been set to ${newbio}`)
                            .setTimestamp()
                        return message.channel.send(bioembed);
                    }
                }
            }
            else if(['back', 'background', 'b'].includes(args[1])) {
                collection.findOne({id: message.author.id}).then((result) => {
                    if (result) {
                        const prof = collection.findOne({id: message.author.id},
                        (err, prof) => {
                            if (!args[2]) {
                                const badargsembed = new Discord.MessageEmbed()
                                    .setColor('#f66868')
                                    .setDescription(`${message.author}, you must specify a background.`)
                                    .setTimestamp()
                                return message.channel.send(badargsembed);
                            }
                            if (!prof.boughtbacks){
                                const backembed = new Discord.MessageEmbed()
                                    .setColor('#f66868')
                                    .setDescription(`${message.author}, you do not own a background with that name. Your owned backgrouds are:\n\`default\`, \`${prof.boughtbacks.join('\`, \`')}\``)
                                    .setTimestamp()
                                return message.channel.send(backembed);
                            }
                            if (prof.boughtbacks.includes(args[2]) || args[2] === 'default') {
                                collection.findOneAndUpdate({id: message.author.id}, {$set : {back: args[2]}}, {upsert: true})
                                const yearembed = new Discord.MessageEmbed()
                                    .setColor('#f66868')
                                    .setDescription(`${message.author}, Your background has been set to \`${args[2]}\`.`)
                                    .setTimestamp()
                                return message.channel.send(yearembed);
                            }
                            const backembed = new Discord.MessageEmbed()
                                .setColor('#f66868')
                                .setDescription(`${message.author}, you do not own a background with that name. Your owned backgrouds are:\n\`default\`, \`${prof.boughtbacks.join('\`, \`')}\``)
                                .setTimestamp()
                            return message.channel.send(backembed);
                        })
                    }
                })
            }            
            else if(['year', 'y', 'yr'].includes(args[1])) {
                if (!args[2]) {
                    const badargsembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you must specify a bio.`)
                        .setTimestamp()
                    return message.channel.send(badargsembed);
                }
                if (['2019','2020', '2021', '2022', '2023', '2024'].includes(args[2])) {
                    collection.findOneAndUpdate({"id": message.author.id}, {$set : {year: parseInt(args[2])}}, {upsert: true})
                    const yearembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, Your graduation year has been set to \`${args[2]}\``)
                        .setTimestamp()
                    return message.channel.send(yearembed);
                }
                else {
                    const fakeyearembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, Your graduation year is not a valid year. The current choices for graduation years are 2019, 2020, 2021, 2022, 2023, and 2024.\nPlease DM <@427855045380276234> if you want your graduation year included.`)
                        .setTimestamp()
                    return message.channel.send(fakeyearembed);
                }
            }
            else if(['school', 's'].includes(args[1])) {
                if (files.schools.includes(args.slice(2).join(" "))) {
                    collection.findOneAndUpdate({"id": message.author.id}, {$set : {school: args.slice(2).join(" ")}}, {upsert: true})
                    const schoolembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, Your school has been set to \`${args.slice(2).join(" ")}\`.`)
                        .setTimestamp()
                    return message.channel.send(schoolembed);
                }
                else {
                    const fakeschoolembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, This school is not verified. Make sure you use propper capitalization. \nThe verified schools are:\n\`${files.schools.join('\`, \`')}\`\nPlease DM <@427855045380276234> if you want your school included.`)
                        .setTimestamp()
                    return message.channel.send(fakeschoolembed);
                }
            }
            else if(['bor', 'borough'].includes(args[1])) {
                if (files.boroughs.includes(args.slice(2).join(" "))) {
                    collection.findOneAndUpdate({"id": message.author.id}, {$set : {borough: args.slice(2).join(" ")}}, {upsert: true})
                    const boroughembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, Your borough has been set to \`${args.slice(2).join(" ")}\`.`)
                        .setTimestamp()
                    return message.channel.send(boroughembed);
                }
                else {
                    const fakeboroughembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, This borouhg is not valid. The valid boroughs are:\n\`${files.boroughs.join('\`, \`')}\``)
                        .setTimestamp()
                    return message.channel.send(fakeboroughembed);
                }
            }
            else if (['color', 'hex', 'c', 'h'].includes(args[1])) {
                const prof = collection.findOne({id: message.author.id}, {upsert: true},
                (err, prof) => {
                    if (prof.boughthex === false) {
                        const nbcolorembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`${message.author}, you do not own the item **Profile Hex Color.**\nPlease use \`+shop\` to buy it.`)
                            .setTimestamp()
                        return message.channel.send(nbcolorembed);
                    }
                    else if (isHexColor(args[2])) {
                        collection.findOneAndUpdate({"id": message.author.id}, {$set : {hex: args[2]}}, {upsert: true})
                        const yearembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`${message.author}, your profile hex color has been set to \`${args[2]}\``)
                            .setTimestamp()
                        return message.channel.send(yearembed);
                    }
                    else {
                        const fakecolorembed = new Discord.MessageEmbed()
                            .setColor('#f66868')
                            .setDescription(`${message.author}, \`${args[2]}\` is not a valid hex color.`)
                            .setTimestamp()
                        return message.channel.send(fakecolorembed);
                    }
                })
            }
            else {
                const badargsembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setDescription(`${message.author}, the correct usage for this command is \`+profile config [nick|bio|back|year|school|borough|color] [value]\``)
                    .setTimestamp()
                return message.channel.send(badargsembed);
            }
        }
        else {
            let taggedUser = message.mentions.members.first() || message.member;
            promise = collection.findOne({id: taggedUser.id})
            promise.then((result) => {
                if (result) {
                    c.canvas(message, taggedUser)
                }
                else {
                    collection.insertOne({id: taggedUser.id}, {setDefaultsOnInsert: true})
                    const profcreated = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, your profile has been set up. Please use \`+p\` again to view it.`)
                        .setTimestamp()
                    return message.channel.send(profcreated);
                }
            }, (error) => {
                console.log('error: ' + error)
            })
        }
 	},
};
