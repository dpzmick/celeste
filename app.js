// use express to serve static files
var path = require('path');
var app  = require('express')();
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// get the http server for this app
var http = require('http').Server(app);

// add the socket.io bindings to this server
var mkSocketServer = require('./lib/server.js');
mkSocketServer(http);

http.listen(3000);
