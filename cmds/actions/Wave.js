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
      examples: ['+wave @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      let img = await ioTools.getRandomImage('wave', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, undefined, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
