var pilotFactory           = require('./pilot.js')
var shipFactory            = require('./ship.js')
var alertControllerFactory = require('./alertController.js')

var http = require('http').Server();
var io   = require('socket.io')(http)

var alerter = alertControllerFactory(io);
var ship = shipFactory(alerter);

io.on('connection', function (socket) {
    console.log('user connected');

    var actor = null;

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('register', function (role) {
        console.log(role);
        if (role == 'pilot') {
            actor = pilotFactory(ship);
            // alerter.registerPilot(socket);
        }
    });

    socket.on('action', function (event) {
        console.log('got an action');
        actor.handleAction(event);
    });
});

http.listen(process.env.PORT || 3000 , function () {
    console.log('listening on 3000');
})
