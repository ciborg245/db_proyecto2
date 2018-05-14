
const Tweet = require('mongoose').model('Tweet');
const User = require('mongoose').model('User');
const Twitter = require('twitter');


const client = new Twitter({
    consumer_key: '2eIK8c3fujiizlga6tjOjMvvW',
    consumer_secret: 'aqKkZaMjqe6agf6WgyFUUbt3bBLkad7nM6gxya37cDU8NnJ6I2',
    access_token_key: '966478441557184513-FDl8UtTkAxmaicaTMBL23k8wUd9Ndd8',
    access_token_secret: 'lKVnRuORvzYBBHCaPlzy8Fpr0swofu6eBOyCzJy2CZQcn'
});

var twitterController = {};


twitterController.createTweetsByScreenName = function(req, res) {

	const params = {
		screen_name: req.params.screenName,
		count: 20,
	}

	console.log(params);
	client.get('statuses/user_timeline', params)
	.then(tweets => {
		
		for (var i in tweets){
			var tweet = new Tweet(cleanTweet(tweets[i]));
			user.tweets.push(tweet._id);
			tweet.save(error => {
				if (error)
					console.log(error);
			})
		}

		res.status(200).send({
			msg: 'Los tweets han sido guardados con exito.'
		});
	})
	.catch(error => {
		res.status(400).send({
			error: error
		});
	});
}


twitterController.createTweetsByUserId = function(req, res) {

	const params = {
		user_id: req.params.twitterId,
		count: 20,
	}

	client.get('statuses/user_timeline', params)
	.then(tweets => {
		
		for (var i in tweets){
			var tweet = new Tweet(cleanTweet(tweets[i]));
			user.tweets.push(tweet._id);
			tweet.save(error => {
				if (error)
					console.log(error);
			})
		}

		res.status(200).send({
			msg: 'Los tweets han sido guardados con exito.'
		});
	})
	.catch(error => {
		res.status(400).send({
			error: error
		});
	});
}


twitterController.getTweetsByUserId = function(req, res) {

	Tweet.find({ 'user.twitterId': req.params.twitterId}, function(error, tweets) {
		if (!error) {
			res.status(200).send({
				success: true,
				tweets: tweets,
			});
		} else {
			res.status(200).send({
				success: true,
				tweets: []
			});
		}

	});
}


twitterController.searchTweetsByUserId = function(req, res) {

	Tweet.find({text: { $regex: '.*' + req.params.word + '.*', $options: 'i'}, 'user.twitterId': req.params.twitterId}, function(error, tweets) {
		if (!error) {
			res.status(200).send({
				success: true,
				tweets: tweets,
			});
		} else {
			res.status(200).send({
				success: true,
				tweets: []
			});
		}

	});
}

twitterController.searchTweets = function(req, res) {

	Tweet.find({text: { $regex: '.*' + req.params.word + '.*', $options: 'i'}}, function(error, tweets) {
		if (!error) {
			res.status(200).send({
				success: true,
				tweets: tweets,
			});
		} else {
			res.status(200).send({
				success: true,
				tweets: []
			});
		}

	});
}

twitterController.searchTweetsByScreenName = function(req, res) {

	Tweet.find({text: { $regex: '.*' + req.params.word + '.*', $options: 'i'}, 'user.screen_name': req.params.screenName}, function(error, tweets) {
		if (!error) {
			res.status(200).send({
				success: true,
				tweets: tweets,
			});
		} else {
			res.status(200).send({
				success: true,
				tweets: []
			});
		}

	});
}


twitterController.deleteTweetsByUserId = function(req, res) {

	Tweet.remove({'user.twitterId': req.params.twitterId}, function(err) {
		if (erro) {
			res.status(400).send({
				success: false,
				msg: 'No se elimino ningun tweet.',
			});
		} else {
			res.status(200).send({
				success: true,
				msg: 'Se eleminaron los tweets.',
			});
		}
	});
}


module.exports = twitterController;


const cleanTweet = function(tweet) {

	return {
			created_at: tweet.created_at,
			twitterId: tweet.id,
			text: tweet.text,
			user: {
				id: tweet.user.id,
				name: tweet.user.name,
				screen_name: tweet.user.screen_name,
				image: tweet.user.profile_image_url,
			},
			favorites: tweet.favorite_count,
			retweets: tweet.retweet_count,
		}
}