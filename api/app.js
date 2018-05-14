const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configureMongoose = require('./mongoose');
const db = configureMongoose();

const routes = require('./routes/router')
const app = express();

// app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(cors())

app.use('/api', routes);

app.get('/', function(req, res) {res.send("fuck you :D")});

app.listen(3000, function(){
  console.log("http:/localhost:3000")
});
