const { Command } = require('discord.js-commando')
const tumblr = new (require('../../util/TumblrTools'))()

const blogUrl = 'lady-zenora.tumblr.com'

class Yaoi extends Command {
  constructor (client) {
    super(client, {
      name: 'yaoi',
      group: 'nsfw',
      memberName: 'yaoi',
      throttling: { usages: 1, duration: 5 },
      description: 'Returns a random yaoi image or gif.',
      examples: ['+yaoi']
    })
  }

  async run (msg, args) {
    tumblr.getRandomPhoto(blogUrl).then(photo => {
      msg.channel.send(photo)
    })
  }
}

module.exports = Yaoi
