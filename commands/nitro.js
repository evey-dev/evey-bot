const Discord = require('discord.js');
client = new Discord.Client();
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content == "nitro") {
		message.reply('starting nitro calculation')
		var fullstring = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz1234567890";
		for (i=0;i<fullstring.length;i++) {
			message.channel.send(`discord.gift/aCYSBgzPzzQWeTe4mvq3ZpP${fullstring[i]}`)
		}
	}
	
});

client.login("NzUyMDIzOTE1MTc3NTc0NDMx.X1Rm2Q.-V7a1rtYQ0iVeVFMmyCDXWmeYXc");    
