const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Hug extends Command {
  constructor (client) {
    super(client, {
      name: 'hug',
      group: 'actions',
      memberName: 'hug',
      guildOnly: true,
      aliases: ['hugs', 'cuddle', 'cuddles'],
      description: 'Returns a random love gif and if a user is mentioned, includes their name.',
      examples: ['+hugs @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you've been hugged by **${msg.author.username}**. :heart:`
      }

      let img = await ioTools.getRandomImage('hug', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
