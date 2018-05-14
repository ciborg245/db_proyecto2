
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TweetSchema = new Schema({
	
	created_at: Date,
	twitterId: {
		type: Number,
		index: true,
		unique: true,
	},
	text: String,
	user: {
		id: Number,
		name: String,
		screen_name: String,
		image: String,
	},
	favorites: Number,
	retweets: Number,
});

mongoose.model('Tweet', TweetSchema);