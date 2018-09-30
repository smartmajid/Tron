const Command = require('../BaseCmd')

const ioTools = new (require('../../util/IOTools'))()

class Dance extends Command {
  constructor (client) {
    super(client, {
      name: 'dance',
      group: 'reactions',
      memberName: 'dance',
      description: 'Returns a random dancing gif.',
      examples: ['+dance']
    })
  }

  async run (msg, args) {
    ioTools.getRandomImage('dance', args).then(image => {
      Command.sendMessage(msg.channel, '', this.client.user, { files: [image] })
    })
  }
}

module.exports = Dance
