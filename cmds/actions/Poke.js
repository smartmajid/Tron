const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Poke extends Command {
  constructor (client) {
    super(client, {
      name: 'poke',
      group: 'actions',
      memberName: 'poke',
      guildOnly: true,
      description: 'Returns a random poke gif and includes the mentioned users username.',
      examples: ['+poke @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you've been poked by **${msg.author.username}**.`
      }

      let img = await ioTools.getRandomImage('poke', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
