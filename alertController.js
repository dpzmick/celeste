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
            engineerSocket.emit('message','Jump failed: insufficient power');
        },

        powerChange: function (system) {
            engineerSocket.emit('message', 'Power is now allocated to the ' + system);
        }
    }
}
