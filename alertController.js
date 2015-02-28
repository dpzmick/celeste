var pilotSocket    = null;
var engineerSocket = null;
var everyoneSocket = null

module.exports = function (everyoneIO) {
    everyoneSocket = everyoneIO.sockets;

    return {
        registerSocketFor: function (role, socket) {
            if (role === 'pilot') {
                pilotSocket = socket;
            } else if (role === 'engineer') {
                engineerSocket = socket;
            }

            // TODO refactor
        },

        someoneRegistered: function (role) {
            var payload = {
                type: 'new registration',
                role: role,
            };

            everyoneSocket.emit('message', payload);
        },

        shipLocationChange: function(x,y) {
            var payload = {
                type: 'ship location change',
                x: x,
                y: y
            };

            everyoneSocket.emit('message', payload);
        },

        jumpSucceeded: function (msg) {
            var payload = {
                type: 'jump success',
                msg: msg
            };

            pilotSocket.emit('message', payload);
        },

        jumpFailed: function (msg) {
            var payload = {
                type: 'jump failure',
                msg: msg
            };

            engineerSocket.emit('message', payload);
            pilotSocket.emit('message', payload);
        },

        powerChange: function (system) {
            var payload = {
                type: 'allocation',
                system: system
            };

            engineerSocket.emit('message', payload);
        }
    }
}
