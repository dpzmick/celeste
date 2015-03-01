var _ = require('underscore');

var pilotSocket    = null;
var engineerSocket = null;
var everyoneSocket = null
var roles = {};

var sendMessageTo = function (role, payload) {
    if (role === 'everyone') {
        everyoneSocket.emit('message', payload);
    } else {
        if (_.has(roles, role)) {
            roles[role].emit('message', payload);
        } else {
            console.log('server trying to send message to role for which it does not know how (' + role + ')');
        }
    }
}

var sendMessageToAll = function (roles, payload) {
    roles.map(_.partial(sendMessageTo,_,payload));
}

module.exports = function (everyoneIO) {
    everyoneSocket = everyoneIO.sockets;

    return {
        registerSocketFor: function (role, socket) {
            roles[role] = socket;
        },

        someoneRegistered: function (role) {
            var payload = {
                type: 'new registration',
                role: role,
            };

            sendMessageTo('everyone', payload);
        },

        shipLocationChange: function(x,y) {
            var payload = {
                type: 'ship location change',
                x: x,
                y: y
            };

            sendMessageTo('everyone', payload);
        },

        jumpSucceeded: function (msg) {
            var payload = {
                type: 'jump success',
                msg: msg
            };

            sendMessageTo('pilot', payload);
        },

        jumpFailed: function (msg) {
            var payload = {
                type: 'error',
                subType: 'jump error',
                msg: msg
            };

            sendMessageToAll(['engineer', 'pilot'], payload);
        },

        powerChange: function (system) {
            var payload = {
                type: 'allocation',
                system: system
            };

            sendMessageTo('engineer', payload);
        }
    }
}
