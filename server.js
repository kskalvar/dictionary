var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/dict');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {console.log("connection success");});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

var atrbSchema = mongoose.Schema({
	_id: Number,
	name: String
});

var atrb = mongoose.model('sample', atrbSchema, "sample");

app.get('/api/sample', function(req, res) {
	var query = atrb.find();
	query.exec(function(err, row) {
		if(err) {
			res.send(err);
		} else {
			res.json(row);
		}
	});
});

app.post('/api/sample', function(req, res) {
	atrb.create({
			_id: req.body._id,
			name: req.body.name,
			done: true
	}, function(err, row) {
		if(err) {
			res.send(err);
		} else {
			atrb.find(function(err, newRow) {
				if(err) {
					res.send(err);
				} else {
					res.json(newRow);
				}
			});
		}
	});
});

app.delete('/api/sample/:dictRowId', function(req, res) {
	atrb.remove({
		_id : req.params.dictRowId,
	}, function(err, row) {
		if(err) {
			res.send(err);
		} else {
			atrb.find(function(err, newRow) {
				if(err) {
					res.send(err);
				} else {
					res.json(newRow);
				}
			});
		}
	});
});

app.get("*", function(req, res) {
	res.sendfile('./public/index.html');
});

app.listen(80);
console.log("App listening on port 80");