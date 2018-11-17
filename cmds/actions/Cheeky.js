const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Cheeky extends Command {
  constructor (client) {
    super(client, {
      name: 'cheeky',
      group: 'actions',
      memberName: 'cheeky',
      guildOnly: true,
      aliases: ['bleh'],
      description: 'Returns a random cheeky gif.',
      examples: ['+cheeky', '+bleh'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      let img = await ioTools.getRandomImage('cheeky', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, '', this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
