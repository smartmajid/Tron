const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Slap extends Command {
  constructor (client) {
    super(client, {
      name: 'slap',
      group: 'actions',
      memberName: 'slap',
      guildOnly: true,
      description: 'Returns a random slap gif and includes the mentioned users username.',
      examples: ['+slap @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you've been slapped by **${msg.author.username}**. `
      }

      let img = await ioTools.getRandomImage('slap', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
