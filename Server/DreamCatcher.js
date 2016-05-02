var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();
var url = 'mongodb://localhost:27017/firstdb';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post ('/', function(req, res){
	console.log(req.body);
	MongoClient.connect(url, function(err, db){
		db.collection('col').insertOne(req.body, function (err, result){
			assert.equal(err, null);
			console.log('Inserted a document');
			db.close();
		});
		//db.close();
	});
	res.send('ok');
});

app.listen(8000);
