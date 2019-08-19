const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

/*****
* Do your daily stand-up
*****/
exports.run = async (client, message, args) => {


    // let timeout = 86400000 // 24 hours in milliseconds
    let timeout = 10000
    let amount = 500
    // random amount: Math.floor(Math.random() * 1000) + 1;


    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(`You already did your daily stand-up, come back again in **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    } else {
      /*****
      * Start Stand-Up
      *****/
    let embed = new Discord.RichEmbed()
    .setAuthor(`Daily Stand Up`, message.author.displayAvatarURL)
    .setColor("#d600ff") //
    // .setImage("https://i.imgur.com/XCSEtMf.png") // TODO: get random image from IMGUR: https://apidocs.imgur.com/?version=latest
    .setThumbnail("https://i.imgur.com/XCSEtMf.png")
    .setDescription(`**Daily Update**`)
    .addField(`What did you do yesterday?`, amount)
    .addBlankField(true)
    .addField(`What will you do today?`, amount)
    .addBlankField(true)
    .addField(`Are there any blockers preventing you from doing your work?`, amount)
    .addBlankField(true)
    .setTimestamp()
    .setFooter("Generated:", "http://i.imgur.com/w1vhFSR.png")

    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    db.set(`daily_${message.author.id}`, Date.now())

    }

}
