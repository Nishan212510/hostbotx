const { stripIndents } = require('common-tags');
const Discord = require('discord.js')

const { Client, MessageEmbed } = require('discord.js');

const client = new Discord.Client();
const prefix = '^';
const config = require("./config.json")

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const ms = require('ms')

client.once('ready', () => {
    console.log('bot is online!');
});

client.on('message', async message =>{
if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'owner') {
        message.channel.send("The owner of our server is [̲̅L][̲̅P][̲̅D]✯TheNishBOY")
    }

    if(command === 'invite') {
        message.channel.send("Here is the invite to our server https://discord.gg/FNgSGeWmKZ")
    }

    if(command === 'youtubel') {
        message.channel.send("Pls subscribe to these channels https://www.youtube.com/channel/UCegJVv6WHhTYi8VsEg-1GpQ https://youtube.com/channel/UC18BQNxSrybxzUP3s-jH4eQ")
    }

    if(command === 'legit?') {
        message.channel.send("BRUH ofc if u dont believe me check the proofs channel")
    }

    if(command === 'info') {
        message.channel.send("In our server where you can play pokemon and dank memer and participate in legit giveaways all in one!!!")
    }

    if(command === 'purge') {
        message.delete()
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
    if(command === 'fortnite') {
        const platforms = ["pc", "xbl", "psn"];
        const api_key = '3584c7fe-1144-4e1b-9373-18aac86af368'
        const Client = require("fortnite");
        const ft = new Client(api_key);

        const lastWord = args;

        let platform, username;

        if(platforms.includes(lastWord)) {
            username = args.slice(0, args.length = 1).join(" ");
            platform = lastWord;
        } else {
            username = args.join(" ");
            platform = "pc";
        }

        const search = await ft.user(username, platform);

        if(!search.username) {
            let fembed = new MessageEmbed()
            .setColor('#cf03fc')
            .setDescription(`Couldn't find that player!`)
            return message.channel.send(fembed)
        }

        const lifetime = search.stats.lifetime;
        const solo = search.stats.solo;
        const duo = search.stats.duo;
        const squad = search.stats.squad;
        

        const embed10 = new MessageEmbed()
        .setColor('#cf03fc')
        .setTitle(`${args[0]}'s Fortnite Stats`)
        .setURL(search.url)
        .setFooter("Fortnite Stats", message.author.displayAvatarURL)
        .setTimestamp()
        .addField("Solo", stripIndents`**-Wins:** ${solo.wins}
        **-KD:** ${solo.kd}
        **-Kills:** ${solo.kills}
        **-Kills per match:** ${solo.kills_per_match}`, true)
        .addField("Duo", stripIndents`**-Wins:** ${duo.wins}
        **-KD:** ${duo.kd}
        **-Kills:** ${duo.kills}
        **-Kills per match:** ${duo.kills_per_match}`, true)
        .addField("Squad", stripIndents`**-Wins:** ${squad.wins}
        **-KD:** ${squad.kd}
        **-Kills:** ${squad.kills}
        **-Kills per match:** ${squad.kills_per_match}`, true)
        .addField("Lifetime", stripIndents`**-Wins:** ${lifetime.wins}
        **-KD:** ${lifetime.kd}
        **-Kills:** ${lifetime.kills}`, false);

        message.channel.send(embed10);
    }

});

client.on('message', async message => {
    
    let args = message.content.substring(prefix.length).split(" ")
    if(message.member.permissions.has('MANAGE_GUILD')){
   if(message.content.startsWith(`${prefix}gstrt`)) {
       let time = args[1]
       let gembed6 = new MessageEmbed()
       .setColor('#fc0000')
       .setDescription('You did not specify a time!')
   
   if(!time) return message.channel.send(gembed6);

   let gembed5 = new MessageEmbed()
   .setColor('#fc0000')
   .setDescription('You need to use d (days), h (hours), m (minutes, or s (seconds)')

   if(
       !args[1].endsWith("d") &&
       !args[1].endsWith("h") &&
       !args[1].endsWith("m") &&
       !args[1].endsWith("s")
   )

   return message.channel.send(gembed5)

   let gembed4 = new MessageEmbed()
   .setColor('#fc0000')
   .setDescription('I cannot find that channel in the server!')
   
   let gchannel = message.mentions.channels.first();
   if (!gchannel) return message.channel.send(gembed4)

   let prize = args.slice(3).join(" ")
   let gembed3 = new MessageEmbed()
   .setColor('#fc0000')
   .setDescription('Argument missing. What is the prize?')
   if(!prize) return message.channel.send(gembed3)

   message.delete()
   gchannel.send(":tada: **NEW GIVEAWAY** :tada:")
   let gembed = new Discord.MessageEmbed()
   .setTitle('LEGIT Giveaway')
   .setDescription(`React with :tada: to enter the giveaway !\nHosted By: **${message.author}**\nTime: **${time}**\nPrize: **${prize}**`)
   .setTimestamp(Date.now + ms(args[1]))
   .setColor('#fc0000')
   let n = await gchannel.send(gembed)
   n.react("🎉")
   setTimeout(() => {
       if(n.reactions.cache.get("🎉").count <= 1) {
           let gembed2 = new MessageEmbed()
           .setColor('#fc0000')
           .setDescription("Not enough people for me to draw a winner 😢")
           return message.channel.send(gembed2)
       }

       let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
       let gembed1 = new MessageEmbed()
       .setColor('#fc0000')
       .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7sBGHgI_EEedUXUd8dUxdRlZZ5807UcFTA&usqp=CAU')
       .setDescription(`Congratulations ${winner}!\nYou just won the **${prize}** 🎉🎉!\n\nGiveaway by **${message.author}**`)
       .setFooter(`Hope you enjoyed ur reward!`)
       gchannel.send(gembed1);
   }, ms(args[1]));
    }
   }
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const ytdl = require('ytdl-core');
    const ytSearch = require('yt-search');
    
    if (command === 'play') {
        const voiceChannel = message.member.voice.channel;
        let membed = new MessageEmbed() 

        .setColor('#00b427')
        .setDescription('You need to be in a voice channel to use that command!')

        if(!voiceChannel) return message.channel.send(membed)

        const permissions = voiceChannel.permissionsFor(message.client.user);

        let embeds = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('You do not have the correct permissions!')

        if(!permissions.has('CONNECT', 'SPEAK')) return message.channel.send(embeds)

        let embed1 = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('You need to write the name of the music!')

        if(!args.length) return message.channel.send(embed1);

        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        if(validURL(args[0])){

            const connection = await voiceChannel.join()
            const stream = ytdl(args[0], {filter: 'audioonly'});

            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
            let muembedw = new MessageEmbed()

            .setColor('#00b427')
            .setTitle('🎵 Now Playing 🎵')
            .setDescription(`**YOUR LINK!**`)
            .setFooter(`Requested by ${message.author.username}`)
            await message.reply(muembedw)

            return
        }

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', ()=>{
                voiceChannel.leave();
            });

            let muembed1 = new MessageEmbed()

            .setColor('#00b427')
            .setThumbnail(`${video.image}`)
            .setTitle('🎵 Now Playing 🎵')
            .setDescription(`**${video.title}**`)
            .setFooter(`Requested by ${message.author.username}`)


            await message.reply(muembed1)
        } else {
            let muembed = new MessageEmbed()

            .setColor('#00b427')
            .setDescription('No video results found.')
            message.channel.send(muembed);
        }

    } else if (command === 'stop') {
        const voiceChannel = message.member.voice.channel;
        let muembed3 = new MessageEmbed() 

        .setColor('#00b427')
        .setDescription('You need to be in a voice channel to use that command!')

        if(!voiceChannel) return message.channel.send(muembed3)
        let membeds = new MessageEmbed()

        .setColor('#00b427')
        .setDescription('👍 OK stopping')
        await voiceChannel.leave();
        await message.channel.send(membeds)
    }

    if(command === 'purge') {
        client.commands.get('purge').execute(message, args);
    }
    if(command === 'status') {
        if(!message.member.permissions.has('ADMINISTRATOR')) {
            return;
        }
        else {
            message.channel.send("Im online!")
        }
    }
    else if(command === 'kick') {
        if(!message.member.permissions.has('KICK_MEMBERS')) {
            let pembed = new MessageEmbed()
            .setColor('#cf03fc')
            .setDescription(`You do not have permissions to use this command!`)
        message.channel.send(pembed)
    }

        else {
            client.commands.get('kick').execute(message, args);
        }
    }
 if(command === 'mute') {
    let embedg = new MessageEmbed()
    .setColor('#00b427')
    .setDescription(`You dont have the permissions to use this command!`)
    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(embedg)
    const target = message.mentions.users.first()
        if(target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            let memberTarget = message.guild.members.cache.get(target.id);

            if(!args[1]){
            memberTarget.roles.add(muteRole.id);
            memberTarget.roles.remove(mainRole.id);
            let embed = new MessageEmbed()
            .setColor('#00b427')
            .setDescription(`${memberTarget} has been muted!`)
            message.channel.send(embed)
            return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            let embedsss = new MessageEmbed()
            .setColor('#00b427')
            .setDescription(`${memberTarget} has been muted for ${ms(ms(args[1]))}!`)
            message.channel.send(embedsss);

            setTimeout(function(){
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        } else {
            let embedss = new MessageEmbed()
            .setColor('#00b427')
            .setDescription('Cant find that member!')
            message.channel.send(embedss);
        }
}
if(command === 'unmute') {
    let embedh = new MessageEmbed()
    .setColor('#00b427')
    .setDescription(`You dont have the permissions to use this command!`)
    if(!message.member.hasPermission(`MUTE_MEMBERS`)) return message.channel.send(embedh)
    const target = message.mentions.users.first()
    if(target) {
        let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
        let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

        let memberTarget = message.guild.members.cache.get(target.id);

        memberTarget.roles.remove(muteRole.id);
        memberTarget.roles.add(mainRole.id);
        let tembed = new MessageEmbed()
        .setColor('#00b427')
        .setDescription(`${memberTarget} has been unmuted!`)
        message.channel.send(tembed);
    } else {
        let tembeds = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('Cant find that member!')
        message.channel.send(tembeds);
    }
}

});

client.on('message',async message => {
   if(!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).split(/ +/);
   const command = args.shift().toLowerCase();

   if(command === 'rules'){
       client.commands.get('command').execute(client, message, args, Discord);
   }
   if(command === 'profile') {
       const args = message.content.split(' ');
       if(args.length > 2) {
           let aembed = new MessageEmbed()
           .setColor('#00b427')
           .setDescription(`Incorrect usage: ${prefix}profile @mention`)
           message.channel.send(aembed)
       } else if(args.length === 2) {
           const members = message.mentions.members.first();
           const embed = new MessageEmbed()
          

           .setAuthor(`${members.user.tag} (ID-${members.id})`, members.user.displayAvatarURL())
           .setColor('#00b427')
           .setThumbnail(members.user.displayAvatarURL())
           .addField('USER INFO', stripIndents`> **Name**: ${members.user.username}
           > **Account Created**: ${members.user.createdAt}
           > **Joined Server**: ${members.joinedAt}
           > **Status**: ${members.presence.status}`)
           .addField( '**Voice Channel**:', members.voice.channel ? members.voice.channel.name + `(ID-${members.voice.channel.id})` : 'None')

           
           message.channel.send(embed)
       } else {
        let aembed1 = new MessageEmbed()
        .setColor('#00b427')
        .setDescription("I couldn't find that member")
        message.channel.send(aembed1)
       }
   }
   else if(command === 'serverinfo') {
        const {guild} = message;
        const embed = new MessageEmbed()
        .setColor('#00b427')
        .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
        .setThumbnail(guild.iconURL())
        .addField('Created On', guild.createdAt.toLocaleString(), true)
        .addField('Guild Owner', guild.owner)
        .addField('Total Members', guild.memberCount, true)
        .addField('Total Real members', guild.members.cache.filter(members => !members.user.bot).size)
        .addField('Total Bots', guild.members.cache.size)
        .addField('Total Channels', guild.channels.cache.size)
        .addField('Total Text Channel', guild.channels.cache.filter(ch => ch.type === 'text').size)
        .addField('Total Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size)
        .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);

        message.channel.send(embed)
   }

   else if(message.content.startsWith(`^help`)) {
       const embed = new MessageEmbed()

       .setColor('#00b427')
       .setTitle('Commands(1/2)')
       .addField('📜Server Questions and Info', `> **owner**: Shows the name of the owner of our server👑
       > **invite**: Gives a permanent invite link of our server📩
       > **youtubel**: Gives link to youtube channel which you shud subscribe📷
       > **legit?**: Shows how legit we are ✅
       > **rules**: Shows the rules📃
       > **official**: Shows how to become an official 👨‍💼
       > **serverinfo**: Shows Profile of a server
       If you want to know the prefix of the server just type prefix? and you will get it!`)
       .addField('⚙Administrator Commands', `> **purge(amount of messages)**: Deletes messages ❌
       > **kick <user_mention>**: Kicks the user from the guild 🦵
       > **ban @mention**: Bans the user from the guild 🧨
       > **unban <user_id>**: Unbans the user from the guild(do not mention the user to unban as it wont work ❌)
       > **mute @mention**: Mutes the user permanently🔇
       > **mute @mention (time: example 10s)**: Mutes the user for 10s🔇
       > **unmute @mention**: Unmutes the member🔉
       For the mute commands, make sure that ur mute role name is mute and main role(role given to all members) is member`)
       .addField('🎉Giveaway', `> **gstrt <time(example: 1d means 1 day)><#channel><prize>** It starts the giveaway in a specific channel 🎊`)
       .setFooter('In order to view the next set of commands, pls type ^h2') 
       
       message.channel.send(embed)
   }
   else if(message.content.startsWith(`^h2`)) {
       let embed = new MessageEmbed()

       .setColor('#00b427')
       .setTitle('Commands(2/2)')
       .addField(`👥 For Users`, `
       **profile @mention**: Shows the user info 👤
       **play (music name)**: It plays music of your choice 🎶. If your music doesnt play, you can provide a youtube link too! The bot only accepts youtube urls
       **stop**: It stops the music 🎵🛑. Pls be in a voice channel when using the music commands.
       **meme**: Sends an epic meme 🤣🐸!
       **fortnite <username>:** Shows fortnite stats of the player. 🦙⛏
       **mcserver <ip address> <port number>(if the server doesnt have port number, default is 25565):** Shows minecraft server stats ⛏📦
       **search <name of image>:** It sends an image of whatever you typed 🖼🔍`)
       .setFooter('Thank you for using our bot 🙏!')

       message.channel.send(embed)
   }

   if(command === 'search') {
       const Scraper = require('images-scraper')
       const google = new Scraper({
           puppeteer: {
               headless: true
           }
       })
       const image_query = args.join(' ');
       let sembed = new MessageEmbed()
       .setColor('#00b427')
       .setDescription('Please enter an image name')
       if(!image_query) return message.channel.send(sembed);

       const image_results = await google.scrape(image_query, 1);
       message.channel.send(image_results[0].url);
   }
});

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);

    let cmd = messageArray[0];

    if(cmd === 'prefix?') {
        message.channel.send(`The prefix is ^`)
    }

    if(cmd === `^ban`) {
        let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        let embeda = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('You need permissions!')

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embeda)
        
        let embedb = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('Bot needs permissions!') 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedb) 

        toBan.ban(toBan)
        
        let embedc = new MessageEmbed()
        .setColor('#00b427')
        .setDescription(`${toBan} has been banned from the server!`)
        message.channel.send(embedc)
    }

    if(cmd === `^unban`) {
        let toBan = await client.users.fetch(args[0])
        
        let embedd = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('You need permissions!')

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embedd) 
        
        let embede = new MessageEmbed()
        .setColor('#00b427')
        .setDescription('Bot needs permissions!')
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embede) 

        message.guild.members.unban(toBan)

        
        let embedf = new MessageEmbed()
        .setColor('#00b427')
        .setDescription(`${toBan} has been unbanned from the server!`)

        message.channel.send(embedf)
    }
    if(cmd === `^official`) {
        let embed = new MessageEmbed()
        .setColor('#00b427')
        .setTitle('How to apply for official')
        .setURL('https://www.youtube.com/channel/UCegJVv6WHhTYi8VsEg-1GpQ')
        .setThumbnail('https://image.shutterstock.com/image-vector/official-rubber-stamp-red-seal-260nw-1427132093.jpg')
        .addField('Things to do', `1. To put [̲̅L][̲̅P][̲̅D]✯ before ur name.
        2. Must have atleast 500 messages in this server.
        3. The time when u want to apply must get atleast 3 invites.
        4. Must be active.
        5. Must sub to the channels. Do ^youtubel to view them.`)
        .setImage('https://cdn.bulbagarden.net/upload/thumb/1/10/Mega_Rayquaza_anime.png/250px-Mega_Rayquaza_anime.png')
        .setFooter('Once you have all the requirements dm the owner and show proof. Then you will get the [̲̅L][̲̅P][̲̅D]✯OFFICIALS role. If u are active and invite more people then we will promote you 🎊')

        message.channel.send(embed)
    }
    if(cmd === '^fortnite') {
        
    }
});
    const got = require('got');
const { TIMEOUT } = require('dns');

    client.on('message', message => {
        if(message.content === `^meme`){
            let embed = new MessageEmbed()
            got('https://www.reddit.com/r/memes/random/.json').then(response => {
                let content = JSON.parse(response.body);
                let permalink = content[0].data.children[0].data.permalink;
                let memeURL = `https://reddit.com${permalink}`;
                let memeImage = content[0].data.children[0].data.url;
                let memeTitle = content[0].data.children[0].data.title;
                let memeUpvotes = content[0].data.children[0].data.ups;
                let memeDownvotes = content[0].data.children[0].data.downs;
                let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeURL}`)
            embed.setImage(`${memeImage}`)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })
    }

    if(message.content === 'rule') {
        let rembed = new MessageEmbed()
        .setColor('#00b427')
        .setTitle('RULES')
        .addFields(
            {name: 'Rule 1', value: 'Be nice and no toxic.'},
            {name: 'Rule 2', value: 'No pinging others too much'},
            {name: 'Rule 3', value: 'Be active for class updates and stuff.'},
            {name: 'Rule 4', value: 'No spamming allowed.'},
            
        )
        .setImage('https://i0.wp.com/www.pultimate.ca/wp-content/uploads/2020/03/Screen-Shot-2020-03-03-at-11.11.17-AM.png?w=312&ssl=1')
        .setFooter('STAY SAFE EVERYONE!')
        message.channel.send(rembed)
    }

    if(message.content === 'SMP 7Q') {
        if(!message.member.guild.id == '810392270342979584') {
            return message.channel.send('This command is not allowed to be used in this server!')
        } else {
        let membedm = new MessageEmbed()
        .setColor('#fc0000')
        .setTitle('SMP 7Q')
        .setDescription(`What is the 7Q SMP?

        It is a minecraft server solely devoted to 7Q members or freinds of 7Q members this server has gone through many changes and is in the prime of its life
        
        
        What version is it?
        It is on Java 1.16.4
        Or bedrock 1.16.40
        
        Can I use crack/tlauncher? 
        Sure you can for Java but for bedrock were still working on it! 
        
        
        Who is the admin? 
        
        No one we decided it would be most fair if no one was an admin`)
        .setImage('https://media.discordapp.net/attachments/810402553162104854/810743042502819890/IMG_20210215_092304.jpg')
        .setFooter('kill the innocent!')
        message.channel.send(membedm)
        }    
    }


    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);

    let cmd = messageArray[0];
    if(cmd === `${prefix}mcserver`) {
        
        const util = require('minecraft-server-util');
        if(!args[0]) return message.channel.send('Please enter a minecraft a server ip');
        if(!args[1]) return message.channel.send('Please enter a minecraft server port')

        util.status(args[0], {port: parseInt(args[1])}).then((response)=>{
            const miembed = new Discord.MessageEmbed()
            .setColor('#00b427')
            .setTitle('Mc server status')
            .addFields(
                {name: 'Server IP', value: response.host},
                {name: 'Online Players', value: response.onlinePlayers},
                {name: 'Max Players', value: response.maxPlayers},
                {name: 'Version', value: response.version}
            )
            .setImage('https://cdn.vox-cdn.com/thumbor/3Y-cQ6fNNy_gmXC7G9aeTQZZ_8g=/0x0:767x431/920x613/filters:focal(323x155:445x277):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63226878/0fe20042_0bb8_4781_82f4_7130f928b021.0.jpg')

            message.channel.send(miembed)
        })
        .catch ((error) =>{
            let miembed2 = new MessageEmbed()
            .setColor('#00b427')
            .setDescription('There was an error finding this server')
            message.channel.send(miembed2);
            throw error;
            
        })
    }
    });

client.login(process.env.token)