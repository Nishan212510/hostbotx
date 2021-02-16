const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'command',
    description: 'Embeds!',
    execute(client, message, args, Discord) {
        const newEmbed = new MessageEmbed()
        .setColor('#00b427')
        .setTitle('Rules')
        .setDescription('Pls follow these rules!')
        .addFields(
            {name: 'Rule 1', value: 'Be nice and no toxic.'},
            {name: 'Rule 2', value: 'PLS subscribe to our youtube channels(do -youtubel to view them).'},
            {name: 'Rule 3', value: 'Be active.'},
            {name: 'Rule 4', value: '   For other rules pls check the rules channel.'},
            
        )
        .setImage('https://i0.wp.com/www.pultimate.ca/wp-content/uploads/2020/03/Screen-Shot-2020-03-03-at-11.11.17-AM.png?w=312&ssl=1')
        .setFooter('Make sure to react to ✅ after reading the rules.');
        
        message.channel.send(newEmbed)
        }
}