var _ = require('lodash');
var Q = require('q');

var GameError = require('./errors/game-error.js');

var Alerter = function (everyoneIO) {
    this.socket  = everyoneIO.sockets;
    this.roles   = {};
};

Alerter.prototype.sendMessageTo = function (role, payload) {
    if (role === 'everyone') {
        this.socket.emit('message', payload);
        return Q();
    }

    if (_.has(this.roles, role)) {
        this.roles[role].emit('message', payload);
        return Q();
    } else {
        var errStr = 'server trying to send message to role for which it does not know how (' + role + ')';
        return Q.reject(new GameError(GameError.codes.GENERIC, errStr));
    }
};

Alerter.prototype.registerSocketFor = function (role, socket) {
    this.roles[role] = socket;
};

Alerter.prototype.someoneRegistered = function (role) {
    var payload = {
        type: 'new registration',
        role: role
    };

    return this.sendMessageTo('everyone', payload);
};

Alerter.prototype.shipLocationChange = function(x, y) {
    var payload = {
        type: 'ship location change',
        x: x,
        y: y
    };

    return this.sendMessageTo('everyone', payload);
};

Alerter.prototype.jumpSucceeded = function (msg) {
    var payload = {
        type: 'jump success',
        msg: msg
    };

    return this.sendMessageTo('pilot', payload);
};

Alerter.prototype.jumpFailed = function (msg) {
    var payload = {
        type: 'error',
        subType: 'jump error',
        msg: msg
    };

    return this.sendMessageToAll(['engineer', 'pilot'], payload);
};

Alerter.prototype.powerChange = function (system) {
    var payload = {
        type: 'allocation',
        system: system
    };

    return this.sendMessageTo('engineer', payload);
};

module.exports = Alerter;
