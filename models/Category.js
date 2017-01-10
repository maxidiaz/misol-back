const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = require('./User').schema

const categorySchema = new Schema({
  name: String,
  price: Number,
  createdBy: userSchema,
  updatedBy: userSchema
})

module.exports = mongoose.model('category', categorySchema)
