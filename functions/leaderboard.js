const Discord = require("discord.js");

module.exports = {
	name: 'leaderboard',
    description: 'Shows the server leaderboard.',  
    cooldown: 5,
    aliases: [`top`, 'leader','baltop'],
	execute(message, args) {
        const collection = db.collection('profiles');
        var leaderboard = collection.find({money: {$exists: true}} ).sort({money : -1}).limit(5).toArray();
        var leader
        leaderboard.then((result) => {
            leader = result.map(a => `${client.users.cache.find(user => user.id === a.id).username} - ${a.money} :moneybag:`);
            const topembed = new Discord.MessageEmbed()
                .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())    
                .setColor('#f66868')
                .setTitle('Leaderboard')
                .setTimestamp();
            var i
            for (i = 0; i < 5; i++) {
                topembed.addField(`${i+1}. ${client.users.cache.find(user => user.id === result[i].id).username}`, `${result[i].money} :moneybag:`);
            }
            message.channel.send(topembed);
        },
        (error) => {
            console.log(error)
        })
    }
}    