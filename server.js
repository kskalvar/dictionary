var sys = require("sys");
var url = require("url");
var httpd = require("http");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dict');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {console.log("connection success");});

var putMap = [];
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
var dictionaryModel = mongoose.model('dictionary', dictionarySchema, "atrb_mtdt");

var parse = function(o, f) {
	JSON.parse(JSON.stringify(o), f);
};

var put = function(url) {
	if(typeof url !== 'string') {
		console.log("Invalid get request");
		return;
	}
	var seen = false;
	for(i in putMap) {
		if(putMap[i] === url) {
			seen = true;
			console.log(url + " has already been logged");
			return;
		}
	}
	if(seen === false) {
		putMap.push(url);
		putMap.sort();
		console.log(url + " logged");
	}
}

var get = function(req, callback) {
	if(req.method !== 'GET') {
		return;
	}
	var pathname = url.parse(req.url).pathname;
	for(i in putMap) {
		if(putMap[i] === pathname) {
			return;
		}
	}
	callback();
}

httpd.createServer(function(request, response) {
	put("/api/dictionary/");
	var body = '';
	if(request.method === 'GET') {
		var pathname = url.parse(request.url).pathname;
		for(i in putMap) {
			if(putMap[i] == pathname) {
				var query = dictionaryModel.find();
				query.exec(function(err, result) {
					if(err) {
						body += "DB Error";
					} else {
						body = JSON.stringify(result);
					}
				});
			}
		}
	}
	});
	response.writeHead(200, {"Content-type": "text/html"});
	response.write(body);
	response.end();
	console.log("Connection closed");
	
}).listen(80);
console.log("Server running on port 80");
