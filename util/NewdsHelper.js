/**
 * Created on: 2018/06/20 @ 00:34
 * Filename:   NewdsHelper.js
 *
 * The class responsible for helping the Newds command connect to the MongoDB
 * backend so we can verify a user has granted Tron to send them lewd photos.
 *
 * @author Alcha <admin@alcha.org>
 * @version 1.0.0
 */
const mongoose = require('mongoose')
const config = require('./config.json')
const conn = mongoose.createConnection(config.mongoUrl)

const UserSchema = new mongoose.Schema({
  _id: String,
  nsfwOptIn: Boolean
})

const UserModel = conn.model('User', UserSchema, 'users')

module.exports = class NewdsHelper {
  /**
   * Default constructor for the NewdsHelper class. Allows the user id of the
   * user of interest in order to work with the mongo connection.
   *
   * @param {string} userId
   *
   * @constructor
   */
  constructor (userId = undefined) {
    this.userId = userId
  }

  hasUserOptedIn (userId = this.userId) {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  stored (userId = this.userId) {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId, (err, res) => {
        if (err) reject(err)
        else if (res !== null) resolve(true)
        else resolve(false)
      })
    })
  }

  async updateOptIn (userId, optIn) {
    if (await this.stored(userId)) {
      return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate({ _id: userId }, { nsfwOptIn: optIn }, (err, raw) => {
          if (err) reject(err)
          else resolve(raw)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        const newUser = new UserModel({ _id: userId, nsfwOptIn: optIn })
        newUser.save(err => {
          if (err) reject(err)
          else resolve()
        })
      })
    }
  }
}
