const Command = require('../BaseCmd')
const ioTools = new (require('../../util/IOTools'))()

class Tickle extends Command {
  constructor (client) {
    super(client, {
      name: 'tickle',
      memberName: 'tickle',
      group: 'actions',
      description: 'Returns a random tickle image/gif.',
      aliases: ['tickles'],
      examples: ['+tickle @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you've been tickled by **${msg.author.username}**!`
      }

      let img = await ioTools.getRandomImage('tickle', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}

module.exports = Tickle
