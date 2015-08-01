// use express to serve static files
var path    = require('path');
var express = require('express');
var app     = express();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.static(path.join(__dirname, '/public')));

// get the http server for this app
var http = require('http').Server(app);

// add the socket.io bindings to this server
var mkSocketServer = require('./lib/server.js');
mkSocketServer(http);

http.listen(3000);
