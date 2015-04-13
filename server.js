var sys = require("sys");
var url = require("url");
var httpd = require("http");

var putMap = [];

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
