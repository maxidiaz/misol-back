const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./User').schema

/**
  action : ADD-{} REMOVE-{} UPDATE-{}  ..... {} = ORDER VARIETY CATEGORY 
*/

const recentSchema = new Schema({
  user: userSchema,
  action: String,
  actionId: Schema.ObjectId
})

module.exports = mongoose.model('category', recentSchema)
