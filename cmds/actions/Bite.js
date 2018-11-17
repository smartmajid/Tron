const Command = require('../BaseCmd')

const IOTools = require('../../util/IOTools')
const ioTools = new IOTools()

module.exports = class Bite extends Command {
  constructor (client) {
    super(client, {
      name: 'bite',
      group: 'actions',
      memberName: 'bite',
      guildOnly: true,
      aliases: ['bites', 'nom', 'noms', 'nomnom', 'omnom'],
      description: 'Returns a random bite gif and includes the mentioned users username.',
      examples: ['+bite @Alcha#2625', '+nom', '+noms @Alcha#2625'],
      argsType: 'multiple'
    })
  }

  async run (msg, args) {
    try {
      if (msg.mentions.users.size > 0) {
        var content = `${this.getMentionedUsernames(msg)}, you've been bitten by **${msg.author.username}**.`
      }

      let img = await ioTools.getRandomImage('bite', args)
      if (img !== undefined) {
        return Command.sendMessage(msg.channel, content, this.client.user, { files: [img] })
      } else return Command.sendMessage(msg.channel, 'No image could be found for this command. Please contact support.', this.client.user)
    } catch (err) { console.error(err) }
  }
}
