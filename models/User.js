const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    profile_img: String
})

module.exports = mongoose.model('user', userSchema)
