const Discord = require('discord.js')
const db = require('quick.db')

/*****
* Administrator can add a team member
*****/

module.exports.run = async (bot, message, args) => {

    // if (!message.author.hasPermission('ADMINISTRATOR')) {
    //     return message.reply('You do not have enough permission to use this command.')
    // }

    if (!args[0]) return message.reply('Please specify a member to add.')

    let user = message.mentions.users.first()

    //db.set('team.members', []) //resets member list
    if (!db.get('team.members').includes(user.id)) {
      db.push('team.members', user.id)
      let person = await bot.fetchUser(user.id)
      message.channel.send('Successfully added ' + person.username + ' to the team')
    } else {
      message.channel.send('User has already been added.')
    }

    let team = db.get('team.members')
    message.channel.send(`Here's the whole team \n ${team}`)
}
