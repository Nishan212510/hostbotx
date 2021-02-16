const { executionAsyncResource } = require("async_hooks");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'purge',
    description: "clear messages!",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('please enter the amount of messages that you want to delete!')
        if(!args[0]) return message.reply(embed);
        let embed1 = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('please enter a real number!')
        if(isNaN(args[0])) return message.reply(embed1);

        let embed2 = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('You cannot delete more than 100 messages!')
        if(args[0] > 100) return message.reply(embed2)
        let embed3 = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('You must delete atleast one message!')
        if(args[0] < 1) return message.reply(embed3);
        
        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);

            let embed4 = new MessageEmbed()
            .setColor('#00b427')
            .setDescription(`I have deleted ${args} messages!`)

            message.channel.send(embed4).then(message => message.delete());
        });
    }
}