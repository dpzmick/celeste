var pilotFactory           = require('./pilot.js')
var engineerFactory        = require('./engineer.js');
var shipFactory            = require('./ship.js')
var modelFactory           = require('./gameModel.js')
var alertControllerFactory = require('./alertController.js')

var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http)

var alerter = require('./alertController.js')(io);
var model = modelFactory(alerter);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('user connected');

    var actor = null;

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('register', function (role, ackFun) {
        console.log(role);
        if (role == 'pilot') {
            actor = pilotFactory(model);
            alerter.registerPilot(socket);
            ackFun(true);
        } else if (role == 'engineer') {
            actor = engineerFactory(model);
            alerter.registerEngineer(socket);
            ackFun(true);
        }
    });

    socket.on('action', function (event, ackFun) {
        actor.handleAction(event);
        ackFun(true);
    });
});

http.listen(process.env.PORT || 3000 , function () {
    console.log('listening on 3000');
})
