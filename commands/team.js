const Discord = require('discord.js')
const db = require('quick.db')

/*****
* Get a snippet of what everyone is working on today
*****/
module.exports.run = async (bot, message, args) => {

    let members = db.get('team.members')

    message.channel.send(members)




}
