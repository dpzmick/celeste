module.exports = function () {
    var pilotSocket = null;
    var engineerSocket = null;

    return {
        registerPilot: function(socket) {
            pilotSocket = socket;
        },

        registerEngineer: function(socket) {
            engineerSocket = socket;
        },

        failNavigation: function () {
            pilotSocket.emit('message', {type: 'navigation error', content: 'fuck you'});
        },

        jumpFailed: function () {
            console.log('Jump failed: insufficient power');
        },

        powerChange: function (system) {
            console.log('Power is now allocated to the ' + system);
        }
    }
}
