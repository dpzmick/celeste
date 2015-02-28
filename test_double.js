
var io1 = require('socket.io-client')('ws://localhost:3000',
                                      {resource: 'A/socket.io', 'force new connection': true});
var io2 = require('socket.io-client')('ws://localhost:3000',
                                      {resource: 'A/socket.io', 'force new connection': true});

var locationMsg = {
    type: 'navigation',
    x: 100,
    y: 100,
}

io1.on('message', function (msg) { console.log(msg)} );
io2.on('message', function (msg) { console.log(msg)} );

io1.emit('register', 'pilot', function (success) {
    console.log(success);
    io2.emit('register', 'pilot', function (success) {
        if (success != false) {
            console.log('test failed');
        } else {
            console.log('test passed');
        }

        io1.disconnect();
        io2.disconnect();
    });
});

