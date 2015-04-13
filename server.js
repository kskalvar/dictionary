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
	var seen = false;
	for(i in putMap) {
		if(putMap[i] === pathname) {
			callback();
			return;
		}
	}
}


//app.get('/api/dictionary', function(req, res) {
//	var query = dictionaryModel.find();
//	query.exec(function(err, row) {
//		if(err) {
//			res.send(err);
//		} else {
//			res.json(row);
//		}
//	});
//});

httpd.createServer(function(request, response) {
	put("/api/");
	if(url.parse(request.url).pathname === '/api/printputMap'){
		response.writeHeader(200, {"Content-type": "text/html"});
		response.write("<ul>");
		for(i in putMap) {
			response.write("<li>" + putMap[i] + "</li>");
		}
		response.write("</ul>");
		response.end();
		return;
	}
	get(request, function() {
		console.log("api hit");
	});
	
	response.writeHeader(200, {"Content-type": "text/html"});
	response.write("Simple NodeJS HTTP Server");
	response.write("<p>HEADERS<ul>");
	parse(request.headers, function(k, v) {
		if(k !== '') {
			response.write("<li>" + k + " : " + v + "</li>");
		}
	});
	response.write("</ul>");
	response.write("<p>Method: " + request.method + " " + request.url + "<p>");
	response.write("<p>URL<ul>");
	parse(url.parse(request.url), function(k, v) {
		if(k !== '' && v !== null) { 	
			response.write("<li>" + k + " : " + v + "</li>");
		}
	});
	response.write("</ul>");
	response.end();
	console.log("Connection closed");
	
}).listen(80);
console.log("Server running on port 80");
