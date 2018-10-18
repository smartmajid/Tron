const Command = require('../BaseCmd')
const mongo = new (require('../../util/db/MongoTools'))()

class JoinRole extends Command {
  constructor (client) {
    super(client, {
      name: 'join-role',
      group: 'features',
      memberName: 'join-role',
      guildOnly: true,
      description: 'Join a role from the list of available roles (+list-roles) for this server.',
      examples: ['+join-role NSFW Pass'],
      args: [{
        key: 'role',
        type: 'role',
        prompt: 'Which role would you like to join?',
        label: 'Role'
      }]
    })
  }

  async run (msg, { role }) {
    try {
      const available = await mongo.isRoleAvailable(msg.guild.id, role.name)
      if (available) {
        if (msg.member.manageable) {
          const res = await msg.member.edit({ roles: [role.id] }, 'User requested.')
          console.log(res)
        } else return msg.reply('Unfortunately, I do not have permission to edit this users roles.')
      } else return msg.channel.send('D\'awww, the specified role isn\'t available.')
    } catch (err) { console.error(err) }
  }
}

module.exports = JoinRole
