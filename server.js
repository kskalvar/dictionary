var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/dict');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', function(callback) {console.log("DB connection success");});

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

var dictionarySchema = mongoose.Schema({
	id_atrb: Number,
	id_atrb_vrsn: Number,
	dt_eff: Number,
	dt_exptn: Number,
	name_data_type: String,
	name_atrb: String,
	cd_atrb_type: Number,
	name_atrb_dsply: String,
	name_ety: String,
	cd_atrb_sts: Number,
	cd_atrb_src: Number,
	int_rtrd_atrb: Boolean,
	id_lst_updt: Number,
	id_lst_updt_usr: String,
	id_create_usr: String,
	dttm_create: Number
});

var atrb = mongoose.model('sample', atrbSchema, "sample");

var dictionaryModel = mongoose.model('dictionary', dictionarySchema, "atrb_mtdt");

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

app.get('/api/dictionary', function(req, res) {
	var query = dictionaryModel.find();
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