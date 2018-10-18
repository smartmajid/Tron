const BaseCmd = require('../BaseCmd')
const mongoUrl = 'mongodb://127.0.0.1/agenda'
const Agenda = require('agenda')
const agenda = new Agenda({ db: { address: mongoUrl } })

class Reminder extends BaseCmd {
  constructor (client) {
    super(client, {
      name: 'reminder',
      memberName: 'reminder',
      group: 'features',
      description: 'Allows you to set a reminder/event for Tron to help you remember.',
      aliases: ['remindme', 'remind', 'timer', 'event'],
      examples: ['+reminder In 24 hours, there is an event to attend.']
    })
  }

  async run (msg, args) {
    agenda.define('test this thing', (job, done) => {
      console.log(`job...`)
      console.log(job)
      done()
    })

    agenda.every('30 seconds', 'test this thing').save()
    agenda.start()
  }
}

module.exports = Reminder
