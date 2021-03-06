const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Wave extends Command {
  constructor (client) {
    super(client, {
      name: 'wave',
      group: 'actions',
      memberName: 'wave',
      guildOnly: true,
      description: 'Returns a random wave gif and if a user is mentioned, includes their username.',
      examples: ['+wave @Alcha#0042'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    let image = await ioTools.getRandomImage('wave', args)
    return Command.sendMessage(msg.channel, '', this.client.user, { files: [image] })
  }
}
