const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
	photoURL: String,
	email:String,
	displayName:String,
	uid: String
})

module.exports = mongoose.model('user', userSchema)
