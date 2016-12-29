const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const categorySchema = require('./Category').schema

const varietySchema = new Schema({
    name: String,
    category: {type: Schema.ObjectId, ref: 'category'}
})

module.exports = mongoose.model('variety', varietySchema)
