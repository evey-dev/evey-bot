const Discord = require("discord.js");
const v = require('../functions/vibecheckfunc.js')

module.exports = {
	name: 'vibecheck',
	description: 'Displays the vibe of a user',
    aliases: ['vibe'],
    usage: '[user]',
	execute(message, args) {
        const collection = db.collection('profiles')
        let taggedUser = message.mentions.members.first() || message.author;
        collection.findOne({id: taggedUser.id}, {upsert: true}).then((result) => {
            if (result) {
                const prof = collection.findOne({id: taggedUser.id}, {upsert: true},
                (err, prof) => {
                    if (!prof.vibe) {
                        var uservibe = []
                        for (i=0; i<6; i++) {
                            uservibe[i] = Math.floor(Math.random() * 10) + 1
                        }
                        uservibe[6] = Math.floor(Math.random()*2)
                        collection.findOneAndUpdate({id: taggedUser.id}, {$set : {vibe: uservibe}}, {upsert: true})
                    }
                    v.vibecheck(message, collection, prof, taggedUser, (uservibe || prof.vibe))
                })
            }
            else {
                collection.insertOne({id: taggedUser.id}, {setDefaultsOnInsert: true}).then(
                    collection.findOne({id: taggedUser.id}, {upsert: true}).then((result) => {
                        if (result) {
                            const prof = collection.findOne({id: taggedUser.id}, {upsert: true},
                            (err, prof) => {
                                if (!prof.vibe) {
                                    var uservibe = []
                                    for (i=0; i<6; i++) {
                                        uservibe[i] = Math.floor(Math.random() * 10) + 1
                                    }
                                    uservibe[6] = Math.floor(Math.random()*2)
                                    collection.findOneAndUpdate({id: taggedUser.id}, {$set : {vibe: uservibe}}, {upsert: true})
                                }
                                v.vibecheck(message, collection, prof, taggedUser, (uservibe || prof.vibe))
                            })
                        }
                    })
                )
            }
        })
    }
}