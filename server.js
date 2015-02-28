var _ = require('underscore');

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

var checkValidRole = function (role) {
    return _.has(roleFactories, role);
}

var checkRoleTaken = function (role) {
    return _.has(roles, role);
}

var attemptRegisterRole = function (role, socket) {
    if (!checkValidRole(role)) {
        console.log('invalid role ' + role)
        return {
            error: true,
            msg: 'invalid role',
            role: role
        }
    }

    if (checkRoleTaken(role)) {
        console.log('role ' + role + ' already taken');
        return {
            error: true,
            msg: 'role taken',
            role: role,
        }
    }

    roles[role] = roleFactories[role](model);
    alerter.registerSocketFor(role, socket)
    socketData[socket.id] = role;
    alerter.someoneRegistered(role);

    console.log('role ' + role + ' has been claimed');

    return roles[role].getInitialStateData();
}

var makeRegisterFunction = function(socket) {
    return function(role, ackFun) {
        var role = role;
        ackFun(attemptRegisterRole(role, socket));
    }
}

var makeDisconnectFunction = function (socket) {
    return function () {
        if (_.has(socketData, socket.id)) {
            var role = socketData[socket.id];
            delete socketData[socket.id];
            delete roles[role];

            console.log(role + ' disconnected');
        } else {
            console.log('someone with no role disconnected');
        }
    }
}

var socketData = {};
var roles = {};
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
