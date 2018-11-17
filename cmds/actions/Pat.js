const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Pat extends Command {
  constructor (client) {
    super(client, {
      name: 'pat',
      group: 'actions',
      memberName: 'pat',
      guildOnly: true,
      description: 'Returns a random pat gif and includes the mentioned users username.',
      examples: ['+pat @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you got a pat from **${msg.author.username}**.`
      }

      let img = await ioTools.getRandomImage('pat', args)

      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel.id, 'No images could be found for this command. Please contact `+support`.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
