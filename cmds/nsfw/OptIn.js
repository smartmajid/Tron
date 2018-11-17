const BaseCmd = require('../BaseCmd')
const dobby = new (require('../../util/NewdsHelper'))()
const { getSetting } = require('../util/Config')

class OptIn extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'optin',
      description: 'Allows you to opt-in to receive NSFW content from Tron.',
      group: 'nsfw',
      memberName: 'optin',
      args: [{
        key: 'choice',
        label: 'Yes/No',
        prompt: 'Do you wish to receive NSFW content from Tron? (y)es/(n)o',
        type: 'string'
      }]
    })
  }

  async run (msg, { choice }) {
    if (msg.author.id === getSetting('owner')) {
      console.log(`choice...`)
      console.log(typeof choice)
      if (choice.toLowerCase() === 'yes' || choice.toLowerCase() === 'y') {
        dobby.updateOptIn(msg.author.id, true).then(raw => {
          msg.channel.send('It seems to have worked.')
          console.log(raw)
        }).catch(err => { console.log(err) })
      } else {
        dobby.updateOptIn(msg.author.id, false).then(raw => {
          msg.channel.send('It seems to have worked.')
          console.log(raw)
        }).catch(err => { console.log(err) })
      }
    } else return msg.reply('this command is currently under development and is not publicly available.')
  }
}

module.exports = OptIn
