const Command = require('../BaseCmd')
const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Shank extends Command {
  constructor (client) {
    super(client, {
      name: 'shank',
      group: 'actions',
      memberName: 'shank',
      guildOnly: false,
      aliases: ['stab', 'shanks'],
      description: 'Returns a random shank gif and includes the mentions users username.',
      examples: ['+shank @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you've been shanked by **${msg.author.username}**! :knife:`
      }

      let img = await ioTools.getRandomImage('shank', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
