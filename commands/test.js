const Discord = require('discord.js');
const APIMessage = require('../node_modules/discord.js/src/structures/APIMessage.js');

module.exports = {
	name: 'testy',
	execute(message) {
        async function test() {
            function timeout(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            const testembed1 = new Discord.MessageEmbed()
                .attachFiles([`C:/Users/victor/Desktop/Evelyn/NYCHS Bot/images/buttons.png`])
                .setImage('attachment://buttons.png')
            const testembed2 = new Discord.MessageEmbed()
                .attachFiles([`C:/Users/victor/Desktop/Evelyn/NYCHS Bot/images/drake.png`])
                .setImage('attachment://drake.png')
            newMessage = await message.channel.send(testembed1)
            console.log("embed 1: ", testembed1.files, testembed1.image)
            await timeout(3000)
            // console.log(newMessage.embeds[0].image)
            console.log(APIMessage.create(newMessage, testembed2).resolveData())


            var message2 = await newMessage.edit(testembed2)
            console.log("embed 2: ", testembed2.files, testembed2.image)
            // console.log(newMessage.embeds[0].image)

        }
        test()
    }
};
