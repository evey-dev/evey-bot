const Discord = require("discord.js");

module.exports = {
	name: 'slots',
    description: 'Bet your money in a slot machine',  
    cooldown: 5,
    aliases: [`slot`],
    usage: `[bet]`,
	execute(message, args) {
        const collection = db.collection('profiles');
        const prof = collection.findOne({id: message.author.id}, {upsert: true},
            (err, prof) => {
                var bet
                if (!args[0]) {
                    bet = 1
                }
                else {
                    bet = parseInt(args[0])
                }
                if (!Number.isInteger(bet) || bet < 1 || bet > 100000) {
                    const intembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, your bet must be a positive whole number between 1 and 100000.`)
                        .setTimestamp()
                    return message.channel.send(intembed)
                }
                if (!prof.money || prof.money == 0) {
                    const nomoneyembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you have no money to bet.`)
                        .setTimestamp()
                    return message.channel.send(nomoneyembed)
                }
                if (prof.money < bet) {
                    const nomoneyembed = new Discord.MessageEmbed()
                        .setColor('#f66868')
                        .setDescription(`${message.author}, you do not have enough money to bet ${bet} :moneybag:.`)
                        .setTimestamp()
                    return message.channel.send(nomoneyembed)
                }
                const slots = `<a:slots:724843630594097165>`;
                const apple = `<:apple:724843625439166475>`;
                const cherry = `<:cherries:724843625347022849>`;
                const orange = `<:orange:724843627351638096>`
                const money = `<:money:724843625279651861>`;
                const purple = `<:purplebird:724843628052348929>`;
                const rainbow = `<:rainbowbird:724843627922063430>`;
                const bb = `<:bottomborder:725088712266088569>`;
                const cbl = `<:cornerborderleft:725086858505093263>`;
                const cbr = `<:cornerborderright:725088534096248852>`;
                const b = `<:border:725082015275155537>`;
                const tb = `<:topborder:725162204508454982>`;
                const ctr = `<:cornerborderright2:725162204491546624>`;
                const ctl = `<:cornerborderleft2:725162204508323890>`;
                const slotstop = `<:s:725168987821834260><:l:725168987616575538><:o:725168987666645064><:t:725168987578564631><:s:725168987821834260>`;
                
                const slotsarray = [apple, cherry, orange, money, purple, rainbow];
                
                const outcome = Math.floor(Math.random() * 1000) + 1;
                slotsarray.sort(() => Math.random() - 0.5);
                var multiplyer
                if (outcome <= 200) {
                    slot1 = slotsarray[0];
                    slot2 = slotsarray[1];
                    slot3 = slotsarray[2];
                    multiplyer = 0
                }
                else if (outcome >= 201 && outcome <= 250) {
                    slot1 = slotsarray[0];
                    slot2 = slotsarray[1];
                    slot3 = slotsarray[0];
                    multiplyer = 0
                }
                else if (outcome >= 251 && outcome <= 300) {
                    slot1 = slotsarray[1];
                    slot2 = slotsarray[1];
                    slot3 = slotsarray[0];
                    multiplyer = 0
                }
                else if (outcome >= 301 && outcome <= 450) {
                    slot1 = slotsarray[0];
                    slot2 = slotsarray[1];
                    slot3 = slotsarray[1];
                    multiplyer = 0
                }
                else if (outcome >= 451 && outcome <= 800) {
                    slot1 = slot2 = slot3 = apple;
                    multiplyer = 1
                }
                else if (outcome >= 801 && outcome <= 900) {
                    slot1 = slot2 = slot3 = cherry;
                    multiplyer = 2
                }
                else if (outcome >= 901 && outcome <= 950) {
                    slot1 = slot2 = slot3 = orange;
                    multiplyer = 3
                }
                else if (outcome >= 951 && outcome <= 975) {
                    slot1 = slot2 = slot3 = money;
                    multiplyer = 4
                }
                else if (outcome >= 976 && outcome <= 995) {
                    slot1 = slot2 = slot3 = purple;
                    multiplyer = 5
                }
                else if (outcome >= 996 && outcome <= 1000) {
                    slot1 = slot2 = slot3 = rainbow;
                    multiplyer = 10
                }
                const slotsembed = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setDescription(`${slotstop}\n${ctl}${tb}${tb}${tb}${ctr}\n${b}${slots}${slots}${slots}${b}\n${cbl}${bb}${bb}${bb}${cbr}`)
                const slotsembed1 = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setDescription(`${slotstop}\n${ctl}${tb}${tb}${tb}${ctr}\n${b}${slot1}${slots}${slots}${b}\n${cbl}${bb}${bb}${bb}${cbr}`)
                const slotsembed2 = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setDescription(`${slotstop}\n${ctl}${tb}${tb}${tb}${ctr}\n${b}${slot1}${slot2}${slots}${b}\n${cbl}${bb}${bb}${bb}${cbr}`)
                const slotsembed3 = new Discord.MessageEmbed()
                    .setColor('#f66868')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setDescription(`${slotstop}\n${ctl}${tb}${tb}${tb}${ctr}\n${b}${slot1}${slot2}${slot3}${b}\n${cbl}${bb}${bb}${bb}${cbr}\nBet: ${bet} :moneybag:\nWon: ${bet*multiplyer} :moneybag:`)
                message.channel.send(slotsembed)
                .then((msg)=> {
                    setTimeout(function(){msg.edit(slotsembed1);}, 1000),
                    setTimeout(function(){msg.edit(slotsembed2);}, 2000),
                    setTimeout(function(){msg.edit(slotsembed3);}, 3000)
                });
                var balance = prof.money
                collection.findOneAndUpdate({"id": message.author.id}, {$set : {money: balance + bet*(multiplyer-1)}}, {upsert: true})
            }
        ) 
	}
};
