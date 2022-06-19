const Discord = require("discord.js");
var script = `We're no strangers to love, You know the rules and so do I
A full commitment's what I'm thinking of, You wouldn't get this from any other guy
I just wanna tell you how I'm feeling, Gotta make you understand
Never gonna give you up, Never gonna let you down
Never gonna run around and desert you, Never gonna make you cry
Never gonna say goodbye, Never gonna tell a lie and hurt you`;
module.exports = {
	name: 'surprise',
    description: 'Gives the user a surprise ;)',  
    cooldown: 30,
	execute(message, args) {
        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function printSong(song) {
            var lyricList = song.split("\n");
            for (var i = 0; i < lyricList.length; i++) {
                message.channel.send(lyricList[i]);
                await timeout(3000);
            };            
        }
        printSong(script);       
    }
}