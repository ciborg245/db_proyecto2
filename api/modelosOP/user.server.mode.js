
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	
	twitterId: {
		type: Number,
		index: true,
		unique: true,
	},
	name: String,
	screen_name: String,
	tweets: [Number],
});


mongoose.model('User', UserSchema);