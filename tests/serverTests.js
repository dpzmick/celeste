var io = require('socket.io-client');
var socketURL = 'ws://localhost:3000';

var options = {
    'force new connection': true
};

exports.testAlwaysPass = function(test) {
    test.ok(true);
    test.done();
}

exports.testOnePilot = function (test) {
    var client1 = io.connect(socketURL, options);

    client1.on('connect', function (data) {
        var client2 = io.connect(socketURL, options);
        client2.on('connect', function (data) {

            // attempt to register two pilots
            client1.emit('register', 'pilot', function (res) {
                client2.emit('register', 'pilot', function (res) {

                    test.ok(res.type === 'error'); // we should have gotten an error back

                    client1.disconnect();
                    client2.disconnect();
                    test.done();
                })
            })
        })
    })
}

exports.testActionWithoutRegister = function (test) {
    var navigationAction = {
        type: 'navigation',
        x: 100,
        y: 100,
    };

    var client1 = io.connect(socketURL, options);

    client1.on('connect', function (data) {
        client1.emit('action', navigationAction, function (res) {
            test.ok(res.type === 'error');
            client1.disconnect();
            test.done();
        })
    })
}

exports.testWithoutEngineer = function (test) {

    var navigationAction = {
        type: 'navigation',
        x: 100,
        y: 100,
    };

    var sentAction = false;

    var client1 = io.connect(socketURL, options);
    client1.on('connect', function (data) {
        client1.emit('register', 'pilot', function (res) {
            test.ok(res.type !== 'error'); // shouldn't have failed
            client1.emit('action', navigationAction);
            sentAction = true;
        })
    });

    client1.on('message', function (message) {
        if (sentAction) {
            test.ok(message.type === 'error');
            client1.disconnect();
            test.done();
        }
    });
}
