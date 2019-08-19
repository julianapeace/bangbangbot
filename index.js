// Example of posting server count with supported libraries (Discord.js and Eris)
const dotenv = require('dotenv');
dotenv.config();

const Discord = require("discord.js");
// const { Client, MessageEmbed } = require('discord.js');
const bot = new Discord.Client();

// const DBL = require("dblapi.js");
// const dbl = new DBL(process.env.dbl_token, bot);

console.log('Hello', process.env.dbl_token);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`)
  bot.channels.find(x => x.name === 'test').send('Hello!')
});

bot.on('message', message => {

    if (message.author.bot) return;
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    console.log(`Processing command "${command}"`);

    if (message.content.indexOf(process.env.prefix) !== 0) return;

    try {
        message.channel.send(`Hello ${message.author}!`)
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(bot, message, args)
    } catch (err) {
        return;
    }
})

// Create an event listener for messages
bot.on('message', message => {
  if (message.content === '!!bot') {
    // message.channel.send('pong');
    console.log('I received a call :) ');
    console.log('The call is from ', message.author.username);
    message.reply('hong kong'); //appends senders mention, i think.
    console.log(message.channel);
  }
});

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to Hercules, ${member}`);
});

bot.on('message', message => {
  // If the message is "how to embed"
  if (message.content === 'how to embed') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
    const embed = new MessageEmbed()
      .setTitle('A slick little embed')
      .setColor(0xFF0000)
      .setDescription('Hello, this is a slick embed!');
    message.channel.send(embed);
  }
});

bot.login(process.env.dbl_token);


//
// // Optional events
// dbl.on('posted', () => {
//   console.log('Server count posted!');
// })
//
// dbl.on('error', e => {
//  console.log(`Oops! ${e}`);
// })
//
//
// // Example of using webhooks to receive vote updates
// const dbl = new DBL(dbl_token, { webhookPort: 5000, webhookAuth: 'password' });
// dbl.webhook.on('ready', hook => {
//   console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
// });
// dbl.webhook.on('vote', vote => {
//   console.log(`User with ID ${vote.user} just voted!`);
// });
