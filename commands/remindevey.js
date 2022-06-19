const Discord = require("discord.js");

module.exports = {
	name: 'remindevey',
	description: 'Reminds Evey to watch netflix (For Adam only)',
    usage: '[watch netflix with me | pay attention]',
	execute(message, args) {
        if (message.author.id === "577579875330818048") {
            if (args.join(' ') === 'watch netflix with me') {
                message.channel.send('<@427855045380276234> watch netflix with adam dumbass') 
            }
            else if (args.join(' ') === 'pay attention') {
                message.channel.send('<@427855045380276234> pay attention to the show dumbass') 
            }
        }
    }
}