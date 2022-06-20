const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, url } = require('./config.json');
const moment = require('moment');
const Canvas = require('canvas');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
db = null; 

client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}





client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("for +help",{type:'WATCHING'});
	client.user.setStatus("dnd");
});

const cooldowns = new Discord.Collection();

client.on('message', message => {
	if (message.channel.type == "dm") return;
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	if (!commandName) return;
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
			const waitembed = new Discord.MessageEmbed()
                .setColor('#ff9191')
                .setDescription(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
                .setTimestamp()
			return message.channel.send(waitembed).then(newMessage => newMessage.delete({ timeout: timeLeft*1000}));
	
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
        console.error(error);
        const errorembed = new Discord.MessageEmbed()
            .setColor('#ff9191')
            .setDescription(`There was an error trying to execute that command!\nIf this is unexpected, please DM <@427855045380276234> a screenshot of the command you sent, along with this message	.`)
            .setTimestamp()
        message.channel.send(errorembed);
	}
});

// client.on('guildMemberAdd', member => {
// 	let membercountchannel = member.guild.channels.cache.find(c => c.id === "722148602410958890");
// 	membercountchannel.setName(`«🚻»Member Count: ${member.guild.memberCount}`)
// });

// client.on('guildMemberRemove', member => {
// 	let membercountchannel = member.guild.channels.cache.find(c => c.id === "722148602410958890");
// 	membercountchannel.setName(`«🚻»Member Count: ${member.guild.memberCount}`)
// });


const dbclient = new MongoClient(url,  {
    useUnifiedTopology: true,
	useNewUrlParser: true,
	connectTimeoutMS: 10000,
});

dbclient.connect(function(err) {
    assert.equal(null, err);
    db = dbclient.db('bot');
    const collection = db.collection('profiles')

    console.log("DB Connected!")
	client.login(token);    
  });
