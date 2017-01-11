const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./User').schema

/**
  action : ADD-{} REMOVE-{} UPDATE-{}  ..... {} = ORDER VARIETY CATEGORY
*/

const recentSchema = new Schema({
  user: userSchema,
  message: String,
  action: String,
  actionId: Schema.ObjectId,
  date: Date
})

module.exports = mongoose.model('RecentTransactions', recentSchema)
