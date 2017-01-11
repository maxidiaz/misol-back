const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const categorySchema = require('./Category').schema
const userSchema = require('./User').schema

const varietySchema = new Schema({
    name: String,
    category: {type: Schema.ObjectId, ref: 'category'},
    totalSold: {type: Number, default: 0},
    createdBy: userSchema
})

module.exports = mongoose.model('variety', varietySchema)
