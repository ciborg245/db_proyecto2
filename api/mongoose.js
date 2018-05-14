
const mongoose = require('mongoose');

module.exports = function() {
	
	const db = mongoose.connect('mongodb://panito:fresh@ds133964.mlab.com:33964/panitofresh');

	require('./modelosOP/tweet.server.model');

	return db;
}
