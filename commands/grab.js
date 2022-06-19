const Discord = require('discord.js');

module.exports = {
    name: 'grab',
    description: 'Grabs the first person who talks',
	execute(message) {
        async function test() {
            await message.channel.send("https://images-ext-1.discordapp.net/external/6_6Ftsle2f01rz6yl0UmNe89wMJx4reAcj_UQcCNAsQ/https/images-ext-1.discordapp.net/external/qm7X1L8OEPsTwu1OGR8jNT_7IlhsFagtXJ5-192NEUg/https/images-ext-2.discordapp.net/external/Xy1oECWlGVn7yiu6Kb8qP5AIJfLbfDM2llEfAJhar2s/https/media.discordapp.net/attachments/600497372648308755/738136229102485504/851pg9.png")
            message.channel.awaitMessages(m => m.channel == message.channel,
                {max: 1, time: 15000}).then(collected => {
                    message.channel.send("https://images-ext-1.discordapp.net/external/WdRTXns3dF7ywMRcMU9gzvgiecvdkOsORNuK_97GHWA/https/media.discordapp.net/attachments/600497372648308755/738136244193591356/8514co.png")
                }).catch(() => {
                    message.channel.send("No one replied...\nI guess I'll just grab my own message!");
                    message.channel.send("https://images-ext-1.discordapp.net/external/WdRTXns3dF7ywMRcMU9gzvgiecvdkOsORNuK_97GHWA/https/media.discordapp.net/attachments/600497372648308755/738136244193591356/8514co.png")
                });
        }
        test()
    }
};
