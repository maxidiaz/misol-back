const mongoose = require('mongoose')
const Schema = mongoose.Schema
const varietySchema = require('./Variety').schema
const userSchema = require('./User').schema
varietySchema.add({count: Number})

const orderSchema = new Schema({
  name: String,
  varieties: [varietySchema],
  price: Number,
  address: String,
  datetime: Date,
  deliveredOn: Date,
  note: String,
  pay: Number,
  status: String,
  paid: Boolean,
  createdBy: userSchema,
  deliveredBy: userSchema
}, {
  timestamps: true
})

module.exports = mongoose.model('order', orderSchema)
