const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    description: "This command kicks a member",
    execute(client, message, args){
        const member = message.mentions.users.first();
        if(member) {
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.kick();
            let embeds = new MessageEmbed()
            .setColor('#00b427')
            .setDescription(`**${member}** was kicked!`)
            message.channel.send(embeds);
        } else {
            let embed = new MessageEmbed()
            .setColor('#00b427')
            .setDescription('You couldnt kick that member!')
            message.channel.send(embed);
        }
    }
}