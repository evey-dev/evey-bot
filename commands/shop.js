const Discord = require("discord.js");
const s = require('../functions/shopfunc')

module.exports = {
	name: 'shop',
	description: 'Displays the user shop',
    aliases: ['buy', 'store'],
    usage: '[background name|color]',
	execute(message,args) {
        const collection = db.collection('profiles')
        const ogauthor = message.author.id
        collection.findOne({id: ogauthor}, {upsert: true}).then((result) => {
            if (result) {
                const prof = collection.findOne({id: ogauthor}, {upsert: true},
                (err, prof) => {
                    s.shop(message, args, collection, prof, ogauthor) 
                })
            }
            else {
                collection.insertOne({id: ogauthor}, {setDefaultsOnInsert: true})
                collection.findOne({id: ogauthor}, {upsert: true}).then((result) => {
                    if (result) {
                        const prof = collection.findOne({id: ogauthor}, {upsert: true},
                        (err, prof) => {
                            s.shop(message, args, collection, prof, ogauthor)
                        })
                    }
                })
            }
        })
    }
}