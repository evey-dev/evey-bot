const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
	.setColor('#ff6584')
module.exports = {
	name: 'staff',
	description: 'Get an aster staff member\'s bio or view the credits for the Aster site!',
	aliases: ['bio','credits'],
	category: 'utilCmds',
	usage: '[dan|justin|emerson|shaedil]',
	execute(message, args) {
		if (!args) {
			embed
				.setTitle(`Aster Staff Credits`)
				.setDescription(`These are all of the staff that have made [Aster](https://aster.nyc) possible.\nAster bot made by <@432319705890553868>`)
				.addField(`Developers`,`<@248273876902084608> - Rebecca\n<@172832102771982336> - Steven\n<@303922359595696138> - Issac\n<@427855045380276234> - Evelyn\n<@432319705890553868> - Shaedil\n<@246715564070797312> - Michael\n<@348208769941110784> - Justin\n<@376562529285046273> - Taurean`)
				.addField(`Designers`,`<@585659475143294987> - Daniel\n<@690811492714414101> - Simon\n<@743052766725013626> - Cadence\n<@676568097246937098> - Nicole`)
				.addField(`Community Managers`,`<@261286698946658305> - Ashley\n<@580509859842359306> - Emerson\n<@436264683909939211> - Ethan\n<@738955981941243956> - Raina`)
			return message.channel.send(embed)
		}
		if (args[0].toLowerCase == 'dan') {
			embed		
				.setTitle(`Dan's Bio`)
				.setDescription('Thanks for inquiring about Dan. You\'ve made the right choice.\n\nDan Viderman\'21 goes to Brooklyn Technical High School. He is a Weston Research Scholar, the most exclusive program in BTHS, on the Math Team, where he got the top score on the AMC10B, on the Debate Team, where he consistently gets awards, and on the NYU ITEST Team, where he was chosen to represent Brooklyn Tech. During his free time, he enjoys cadding, playing chess and debating.\n\nFor more information, visit his [Linktr.ee](https://linktr.ee/DanViderman), as well as his [LinkedIn](https://www.linkedin.com/in/dan-viderman-359784156/).\n\n*Thanks for asking, and if there are any questions, don\'t be hesitant to ping or dm <@638343481596706827>*')
		}
		else if (args[0].toLowerCase == 'justin') {
			embed		
				.setTitle(`Justin's Bio`)
				.setDescription(`Justin is a trumpety seal at Brooklyn Tech that likes to meme around. Other than promoting the egg pudding industry by accident, he likes to mess with his discord bot and grind video games. If you use dark mode, he’s probably very disappointed in you.\nProbably the only data developer that hates math with a passion.`)
		}
		else if (args[0].toLowerCase == 'emerson') {
			embed		
				.setTitle(`Emerson's Bio`)
				.setDescription(`Emerson Chen is a 2023 at Brooklyn Technical. He is the Secretary of the Mural Painting Club and enjoys Volunteering. His hobbies include painting, playing the piano, and experimenting with math while spreading happiness :3.`)
		}
		else if (args[0].toLowerCase == 'shaedil') {
			embed		
				.setTitle(`Shaedil's Bio`)
				.setDescription(`Shaedil is a 2022 in the aerospace major at BTHS, he exists in symbiosis with his environment and friends, adapting when required. His interests range from the intersection of design and data to the lesser known capabilities of the terminal to aerospace and robotics. Once a man like he had entered the terminal, he left there at the entrance, his gui-possessions... He plays the clarinet a little, composes a little, learns a little, sleeps a little, and is known for his persistence in a challenge/problem.`)
		}
		else {
			embed
				.setDescription('That staff member does not exist. Please use \`&help staff\` to see the correct usage of this command.')
		}
		message.channel.send(embed)
	}
}