var pilotSocket    = null;
var engineerSocket = null;
var everyoneSocket = null

module.exports = function (everyoneIO) {
    everyoneSocket = everyoneIO.sockets;

    return {
        registerPilot: function(socket) {
            pilotSocket = socket;
        },

        registerEngineer: function(socket) {
            engineerSocket = socket;
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
