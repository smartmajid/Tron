const Command = require('../BaseCmd')

const ioTools = new (require('../../util/IOTools'))()

class Confused extends Command {
  constructor (client) {
    super(client, {
      name: 'confused',
      group: 'reactions',
      memberName: 'confused',
      description: 'Returns a random confused gif.',
      examples: ['+confused']
    })
  }

  async run (msg, args) {
    ioTools.getRandomImage('confused', args).then(image => {
      Command.sendMessage(msg.channel, '', this.client.user, { files: [image] })
    })
  }
}

module.exports = Confused
