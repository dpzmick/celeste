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

        shipMoved: function () {
            everyoneIO.emit('message', 'ship moved');
        },

        jumpFailed: function () {
            var msg = 'jump failed, not enough resources';
            engineerSocket.emit('message', msg);
            engineerSocket.emit('message', msg);
        },

        powerChange: function (system) {
            engineerSocket.emit('message', 'Power is now allocated to the ' + system);
        }
    }
}
