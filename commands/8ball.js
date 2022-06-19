const Discord = require('discord.js');
module.exports = {
	name: '8ball',
    description: 'Answer a yes or no question',
    cooldown: 3,
    aliases: ['8b'],
    usage: '[question]',
	execute(message, args) {
        if(!args[0]) {
            return message.reply("Please ask a full question!");
        }
        
        let replies = ["It is certain", "It is decidedly so", "Without a doubt", "Yes – definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

        let result = replies[Math.floor((Math.random() * replies.length))];
        let question = args.slice(0).join(" ");
        if (['what is love?', 'what is love'].includes(question.toLowerCase())) {
            result = 'Baby don\'t hurt me'
        }
        let ballembed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setColor("f66868")
            .addField("Question", question)
            .addField("Answer", result);

        message.channel.send(ballembed); 
    }
}