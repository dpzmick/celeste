var pilotFactory           = require('./pilot.js')
var shipFactory            = require('./ship.js')
var modelFactory           = require('./gameModel.js')
var alertControllerFactory = require('./alertController.js')

var http = require('http').Server();
var io   = require('socket.io')(http)

var alerter = alertControllerFactory(io);
var model = modelFactory(alerter);

io.on('connection', function (socket) {
    console.log('user connected');

    var actor = null;

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('register', function (role) {
        console.log(role);
        if (role == 'pilot') {
            actor = pilotFactory(model);
            alerter.registerPilot(socket);
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
