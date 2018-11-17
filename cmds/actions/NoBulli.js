const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class NoBulli extends Command {
  constructor (client) {
    super(client, {
      name: 'nobulli',
      group: 'actions',
      memberName: 'nobulli',
      guildOnly: true,
      description: 'Warns @User1 not to bully @User2.',
      examples: ['+nobulli @User1 @User2'],
      args: [{
        key: 'user1',
        type: 'user',
        prompt: 'Which user needs a warning?'
      }, {
        key: 'user2',
        type: 'user',
        prompt: 'Which user needs protecting?'
      }]
    })
  }

  async run (msg, { user1, user2 }) {
    try {
      if (msg.mentions.users.size > 1) {
        var content = `**${user1.username}**, don't you dare bulli **${user2.username}**!`
      }

      let img = await ioTools.getRandomImage('nobulli')

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
