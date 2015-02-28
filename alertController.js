var pilotSocket    = null;
var engineerSocket = null;

module.exports = function (everyoneIO) {
    return {
        registerPilot: function(socket) {
            pilotSocket = socket;
        },

        registerEngineer: function(socket) {
            engineerSocket = socket;
        },

        shipLocationChange: function(x,y) {
            var payload = {
                'type': 'ship location change',
                'x': x,
                'y': y
            };

            everyoneIO.emit('message', payload);
        },

        jumpFailed: function (msg) {
            var payload = {
                'type': 'jump failure',
                'msg': msg
            };

            engineerSocket.emit('message', payload);
            pilotSocket.emit('message', payload);
        },

        powerChange: function (system) {
            var payload = {
                'type': 'allocation',
                'system': system
            };

            engineerSocket.emit('message', payload);
        }
    }
}
