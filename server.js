var pilotFactory           = require('./pilot.js');
var engineerFactory        = require('./engineer.js');
var modelFactory           = require('./gameModel.js');
var alertControllerFactory = require('./alertController.js');

var http = require('http').Server();
var io   = require('socket.io')(http);

var alerter = require('./alertController.js')(io);
var model = modelFactory(alerter);

var roleFactories = {
    pilot:    pilotFactory,
    engineer: engineerFactory,
};

var roles = {
    pilot:    null,
    engineer: null,
};

var attemptRegisterRole = function (role, socket) {
    var factory = roleFactories[role];
    if (roles[role] === null) {
        roles[role] = factory(model);
        alerter.registerSocketFor(role, socket)
        socketData[socket.id] = role;

        console.log('registered new ' + role);
        return true;
    } else {
        // this is already registered
        console.log(role + ' is already registered');
        return false;
    }
}

var makeRegisterFunction = function(socket) {
    return function(role, ackFun) {
        var role = role;
        ackFun(attemptRegisterRole(role, socket));
    }
}

var makeDisconnectFunction = function (socket) {
    return function () {
        var role = socketData[socket.id];
        if (role !== undefined) {
            socketData[socket.id] = null;
            roles[role] = null;
            console.log(role + ' disconnected');
        } else {
            console.log('someone with no role disconnected');
        }
    }
}

var socketData = {};
io.on('connection', function (socket) {
    console.log('user connected');

    var myRegister = makeRegisterFunction(socket);
    var myDisconnect = makeDisconnectFunction(socket);

    socket.on('disconnect', myDisconnect);
    socket.on('register', myRegister);

    socket.on('action', function (action, ackFun) {
        var role = socketData[socket.id];
        roles[role].handleAction(action);
        ackFun(true);
    });
});

http.listen(process.env.PORT || 3000 , function () {
    console.log('listening on 3000');
})
