var _    = require('lodash');
var path = require('path');

var Pilot     = require('./lib/pilot.js');
var Engineer  = require('./lib/engineer.js');
var Model     = require('./lib/gameModel.js');
var GameError = require('./lib/errors/game-error.js');

var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var alerter = require('./lib/alertController.js')(io);
var model = new Model(alerter);

var roleConstructors = {
    pilot:    Pilot,
    engineer: Engineer
};

var socketData = {};

var roles = {};

var checkValidRole = function (role) {
    return _.has(roleConstructors, role);
};

var checkRoleTaken = function (role) {
    return _.has(roles, role);
};

var checkSocketHasRole = function (socket) {
    return _.has(socketData, socket.id);
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
    console.log('user connected');

    /**
     * handle a disconnect.
     *
     * remove the socket from anything it might be registered to
     */
    socket.on('disconnect', function () {
        if (_.has(socketData, socket.id)) {
            var role = socketData[socket.id];
            delete socketData[socket.id];
            delete roles[role];

            console.log(role + ' disconnected');
        } else {
            console.log('someone with no role disconnected');
        }
    });

    /**
     * on the register even, attempt to register the connected socket using the
     * given role.
     *
     * Call the acknowledge function with an error if there is one, otherwise
     * call it with no error
     */
    socket.on('register', function (role, ackFun) {
        if (!checkValidRole(role)) {
            console.log('invalid role ' + role);
            return ackFun(new GameError(GameError.codes.INVALID_ROLE, 'invalid role ' + role));
        }

        if (checkRoleTaken(role)) {
            console.log('role ' + role + ' already taken');
            return ackFun(new GameError(GameError.codes.ROLE_TAKEN, 'role taken ' + role));
        }

        roles[role] = new roleConstructors[role](model);
        socketData[socket.id] = role;

        alerter.registerSocketFor(role, socket);
        alerter.someoneRegistered(role);

        console.log('role ' + role + ' has been claimed');
        ackFun(null, roles[role].getInitialStateData());
    });

    /**
     * on the action event, handle the given action, then call the callback with
     * the result (if there is one);
     */
    socket.on('action', function (action, ackFun) {
        console.log('called');

        if (!checkSocketHasRole(socket)) {
            ackFun(new GameError(GameError.codes.NOT_REGISTER, 'client not registered'));
        } else {
            var role = socketData[socket.id];

            // attempt to handle the action with the given role,
            // if an error occurs, return that error through the ackFun
            roles[role].handleAction(action).then(function (result) {
                ackFun(null, result);
            }).catch(function (error) {
                console.log(error);
                ackFun(error);
            });
        }
    });
});

http.listen(process.env.PORT || 3000, function () {
    console.log('listening on 3000');
});
