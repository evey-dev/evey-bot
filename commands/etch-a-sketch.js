const Discord = require('discord.js');
const f = require("../functions/etchasketchfunc.js")

module.exports = {
	name: 'etch-a-sketch',
	description: 'Allows the user to draw on an etch a sketch',
    aliases: ['etch', 'etchasketch'],
	execute(msg) {
        async function etchasketch() {
            let listx = [51]
            let listy = [38]
            let etchembed = await f.etchFunc(msg,listx,listy,0,null)
            // console.log(`embed 1: `, etchembed.files, etchembed.image)
            var message = await msg.channel.send(etchembed)
            await message.react('◀');
            await message.react('▶');
            await message.react('✅');
            await message.react('🔼');
            await message.react('🔽');
            const filter = (reaction, user) => {
                return ['◀', '▶', '✅', '🔼', '🔽'].includes(reaction.emoji.name) && user.id === msg.author.id
            }
            const collector = message.createReactionCollector(filter, {time: 30000})
            var i=0
            collector.on('collect', (reaction, user) => {
                async function collect(message) {
                    if (user.bot) {
                        return
                    }
                    collector.resetTimer()
                    reaction.users.remove(user.id)
                    if (reaction.emoji.name === '◀') {
                        listx.push(listx[i]-1)
                        listy.push(listy[i])
                    }
                    if (reaction.emoji.name === '▶') {
                        listy.push(listy[i])
                        listx.push(listx[i]+1)
                    }
                    if (reaction.emoji.name === '🔼') {
                        listx.push(listx[i])
                        listy.push(listy[i]-1)
                    }
                    if (reaction.emoji.name === '🔽') {
                        listx.push(listx[i])
                        listy.push(listy[i]+1)
                    }
                    if (reaction.emoji.name === '✅') {
                        collector.stop()
                        message.reactions.removeAll()
                        return
                    }
                    i+=1
                    var etchembed = await f.etchFunc(msg,listx,listy)
                    // console.log(`embed ${i+1}: `, etchembed.files, etchembed.image)
                    message.edit(etchembed)
                    //message.channel.send(etchembed)
                }
                collect(reaction.message)
            })
        }
        etchasketch()
    }
};