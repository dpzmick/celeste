var _    = require('lodash');

var socketio = require('socket.io');

var Pilot     = require('./roles/pilot.js');
var Engineer  = require('./roles/engineer.js');

var Alerter   = require('./alerter.js');
var Model     = require('./game-model.js');
var Ship      = require('./model-entities/ship.js');
var Space     = require('./model-entities/space.js');

var GameError = require('./errors/game-error.js');

/**
 * Takes an http server an adds socket.io bindings for celeste to the server
 */
module.exports = function (http) {
    var io = socketio(http);

    var alerter = new Alerter(io);
    var ship    = new Ship(alerter);
    var space   = new Space(100, 100, 0, 0, alerter);
    var model   = new Model(alerter, ship, space);

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


    io.on('connection', function (socket) {

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
            if (checkSocketHasRole(socket)) {
                return ackFun(new GameError(GameError.codes.ALREADY_HAS_ROLE, 'this client already has a role'));
            }

            if (!checkValidRole(role)) {
                return ackFun(new GameError(GameError.codes.INVALID_ROLE, 'invalid role ' + role));
            }

            if (checkRoleTaken(role)) {
                return ackFun(new GameError(GameError.codes.ROLE_TAKEN, 'role taken ' + role));
            }

            roles[role] = new roleConstructors[role](model);
            socketData[socket.id] = role;

            alerter.registerSocketFor(role, socket);
            alerter.someoneRegistered(role);

            ackFun(null, model.getInitialStateData());
        });

        /**
         * on the action event, handle the given action, then call the callback with
         * the result (if there is one);
         */
        socket.on('action', function (action, ackFun) {
            if (!checkSocketHasRole(socket)) {
                ackFun(new GameError(GameError.codes.NOT_REGISTERED, 'client not registered'));
            } else {
                var role = socketData[socket.id];
                console.log(action)

                // attempt to handle the action with the given role,
                // if an error occurs, return that error through the ackFun
                roles[role].handleAction(action).then(function (result) {
                    ackFun(null, result);
                }).catch(function (error) {
                    ackFun(error);
                });
            }
        });
    });
};
