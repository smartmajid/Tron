const Command = require('../BaseCmd')

const ioTools = new (require('../../util/IOTools'))()

class Miku extends Command {
  constructor (client) {
    super(client, {
      name: 'miku',
      group: 'user',
      memberName: 'miku',
      description: 'Returns a random image/gif given to me by Miku.',
      examples: ['+miku']
    })
  }

  async run (msg, args) {
    ioTools.getRandomImage('miku', args).then(image => {
      Command.sendMessage(msg.channel, '', this.client.user, { files: [image] })
    })
  }
}

module.exports = Miku
